import type { SavedSiteType } from "../context/savedSites";

// Listen for browser startup event to restore saved sites
chrome.windows.onCreated.addListener(async () => {
  console.log('Browser started, restoring saved sites...');

  try {
    // Get saved sites from storage
    const isAutoOpenEnabled = await chrome.storage.local.get(['isAutoOpenEnabled']);
    console.log("is auto open enabled: ", isAutoOpenEnabled.isAutoOpenEnabled)
    if(!isAutoOpenEnabled.isAutoOpenEnabled) return
    const result = await chrome.storage.local.get(['sites']);
    const savedSites: SavedSiteType[] | [] = result.sites || [];

    if (savedSites.length > 0) {
      for (const site of savedSites) {
        await chrome.tabs.create({
          url: site.url,
          active: false
        });
      }
    }
  } catch (error) {
    console.error('Error restoring sites:', error);
  }
});

// handle extension startup (when extension is installed/enabled)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/enabled');
  chrome.storage.local.set({ isAutoOpenEnabled: true }).then((res) => {
    console.log("AUTO ENALBED STATUS object: ", res)
  });
});
