const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const iconSource = path.join(__dirname, '..', 'assets', 'icon.png');
const iconDest = path.join(distDir, 'icon.png');

// Copy the app icon into dist root so it's servable at /icon.png
fs.copyFileSync(iconSource, iconDest);
console.log('Copied icon.png into dist/');

// Inject Apple PWA meta tags
let html = fs.readFileSync(indexPath, 'utf8');

const pwaTags = `
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Mboa-Zen">
<link rel="apple-touch-icon" href="/icon.png"></head>`;

if (html.includes('apple-mobile-web-app-capable')) {
  console.log('PWA tags already present, skipping injection.');
} else {
  html = html.replace('</head>', pwaTags);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('PWA tags injected successfully into dist/index.html');
}