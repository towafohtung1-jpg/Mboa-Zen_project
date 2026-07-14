const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const indexPath = path.join(distDir, 'index.html');

function requireFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} was not found: ${filePath}`);
  }
}

function copyToDist(sourceRelativePath, destinationName) {
  const source = path.join(projectRoot, sourceRelativePath);
  const destination = path.join(distDir, destinationName);

  requireFile(source, sourceRelativePath);
  fs.copyFileSync(source, destination);

  console.log(`Copied ${sourceRelativePath} to dist/${destinationName}`);
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

function toPublicPath(filePath) {
  const relativePath = path.relative(distDir, filePath);
  return `/${relativePath.split(path.sep).join('/')}`;
}

requireFile(indexPath, 'dist/index.html');

// Each build gets a new version so browsers update the service worker.
const buildVersion = Date.now().toString();

// Copy stable PWA icon files into the dist root.
copyToDist('assets/icon.png', 'icon.png');
copyToDist('assets/pwa-icon-192.png', 'pwa-icon-192.png');
copyToDist('assets/pwa-icon-512.png', 'pwa-icon-512.png');

// Create the web app manifest.
const manifest = {
  id: '/',
  name: 'Mboa-Zen',
  short_name: 'Mboa-Zen',
  description:
    'Local Wellness. Modern Discipline. Nutrition and fitness built for West Africa.',
  lang: 'en',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#1A1A1A',
  theme_color: '#007A33',
  categories: ['health', 'fitness', 'lifestyle'],
  icons: [
    {
      src: `/pwa-icon-192.png?v=${buildVersion}`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/pwa-icon-512.png?v=${buildVersion}`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};

fs.writeFileSync(
  path.join(distDir, 'manifest.webmanifest'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log('Created dist/manifest.webmanifest');

// Pre-cache the core app shell, not every large food/workout image.
const preCacheDirectories = [
  path.join(distDir, '_expo', 'static', 'js'),
  path.join(distDir, 'assets', 'fonts'),
  path.join(distDir, 'assets', 'Graphics', 'UI_vectors_icon_set'),
  path.join(distDir, 'assets', 'Illustrations'),
  path.join(distDir, 'assets', 'Logo'),
];

const preCacheAssets = preCacheDirectories
  .flatMap(walkFiles)
  .map(toPublicPath);

const preCacheUrls = Array.from(
  new Set([
    '/',
    '/index.html',
    '/favicon.ico',
    '/icon.png',
    '/pwa-icon-192.png',
    '/pwa-icon-512.png',
    '/manifest.webmanifest',
    ...preCacheAssets,
  ])
);

// Create the service worker.
const serviceWorker = `
const SHELL_CACHE = 'mboa-shell-${buildVersion}';
const RUNTIME_CACHE = 'mboa-runtime-v1';
const MAX_RUNTIME_ENTRIES = 100;

const PRECACHE_URLS = ${JSON.stringify(preCacheUrls, null, 2)};

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);

  await Promise.all(
    PRECACHE_URLS.map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'reload' });

        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }

        await cache.put(url, response);
      } catch (error) {
        console.warn(
          'Mboa-Zen could not precache:',
          url,
          error.message
        );
      }
    })
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    precacheShell().then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter(
              (name) =>
                name.startsWith('mboa-shell-') &&
                name !== SHELL_CACHE
            )
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  while (keys.length > maxEntries) {
    const oldestRequest = keys.shift();

    if (oldestRequest) {
      await cache.delete(oldestRequest);
    }
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response && response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
    await trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
  }

  return response;
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);

    if (response && response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put('/index.html', response.clone());
    }

    return response;
  } catch (error) {
    return (
      (await caches.match('/index.html')) ||
      (await caches.match('/'))
    );
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Do not cache third-party requests or future external APIs.
  if (url.origin !== self.location.origin) {
    return;
  }

  // App navigation: try current online version, then offline shell.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  const isStaticAsset =
    url.pathname.startsWith('/_expo/static/') ||
    url.pathname.startsWith('/assets/') ||
    /\\.(png|jpg|jpeg|webp|svg|ttf|woff|woff2|ico)$/i.test(
      url.pathname
    );

  // Images and static assets are cached when viewed.
  if (isStaticAsset) {
    event.respondWith(cacheFirst(request));
  }
});
`;

fs.writeFileSync(
  path.join(distDir, 'sw.js'),
  serviceWorker,
  'utf8'
);

console.log('Created dist/sw.js');

// Inject manifest, Apple PWA settings and service-worker registration.
let html = fs.readFileSync(indexPath, 'utf8');

const headTags = `
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Mboa-Zen">
<link rel="apple-touch-icon" href="/icon.png?v=${buildVersion}">
<link rel="manifest" href="/manifest.webmanifest?v=${buildVersion}">
</head>`;

if (!html.includes('apple-mobile-web-app-capable')) {
  html = html.replace('</head>', headTags);
}

const registrationScript = `
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
          registration.update();
          console.log('Mboa-Zen offline service worker registered.');
        })
        .catch(function (error) {
          console.error('Service worker registration failed:', error);
        });
    });
  }
</script>
</body>`;

if (!html.includes("serviceWorker.register('/sw.js')")) {
  html = html.replace('</body>', registrationScript);
}

fs.writeFileSync(indexPath, html, 'utf8');

console.log('PWA tags and service-worker registration injected.');