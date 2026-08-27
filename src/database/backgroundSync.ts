// ─── src/database/backgroundSync.ts ──────────────────────────────────────
/*import { offlineAgent } from './offlineAgent';

class BackgroundSync {
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private isSyncing = false;

  startPeriodicSync(intervalMs: number = 300000) { // 5 minutes
    if (this.syncInterval) return;
    console.log('Background sync started');
    this.syncInterval = setInterval(() => {
      this.attemptSync();
    }, intervalMs);
    // Attempt an initial sync after a short delay
    setTimeout(() => this.attemptSync(), 5000);
  }

  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('Background sync stopped');
    }
  }

  async checkConnectivity(): Promise<boolean> {
    try {
      // Try to fetch a lightweight resource to check internet connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://www.google.com', {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Connectivity check failed:', error);
      return false;
    }
  }

  async attemptSync(): Promise<boolean> {
    if (this.isSyncing) {
      console.log('Sync already in progress, skipping...');
      return false;
    }

    try {
      // Check network connectivity
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        console.log('Sync skipped: No internet connection');
        return false;
      }

      // If we have a connection, attempt to sync
      console.log('Starting background sync...');
      this.isSyncing = true;

      // Get pending events from offline agent
      const pendingEvents = await offlineAgent.getPendingEvents();
      if (pendingEvents.length === 0) {
        console.log('Sync completed: No pending events');
        this.isSyncing = false;
        return true;
      }

      console.log(`Sync: ${pendingEvents.length} events to sync`);
      
      // Placeholder: In a real app, this would send data to a server.
      // For now, we'll just mark them as synced (demo mode)
      for (const event of pendingEvents) {
        await offlineAgent.markEventSynced(event.id);
      }

      console.log('Sync completed successfully');
      this.isSyncing = false;
      return true;
    } catch (error) {
      console.error('Background sync failed:', error);
      this.isSyncing = false;
      return false;
    }
  }
}

export const backgroundSync = new BackgroundSync();*/