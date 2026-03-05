// background.js - Orchestrator for ShopSwitch
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    shopStatus: 'OPEN',
    autoRevertEnabled: false,
    revertDuration: 60 // Default 1hr (minutes)
  }, () => {
    console.log('ShopSwitch: Initialized State');
  });
});

// Watch for storage changes to set/clear auto-revert alarms
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.shopStatus) {
    const newStatus = changes.shopStatus.newValue;

    if (newStatus === 'CLOSED') {
      chrome.storage.local.get(['autoRevertEnabled', 'revertDuration'], (res) => {
        if (res.autoRevertEnabled) {
          const delayMinutes = parseFloat(res.revertDuration);
          console.log(`ShopSwitch: Setting auto-revert alarm for ${delayMinutes} minutes`);
          chrome.alarms.create('revertStatus', { delayInMinutes: delayMinutes });
        }
      });
    } else {
      // If manually opened, clear any pending alarms
      chrome.alarms.clear('revertStatus');
      console.log('ShopSwitch: Store opened manually, clearing alarms.');
    }
  }
});

// Handle Alarm Trigger
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'revertStatus') {
    chrome.storage.local.set({ shopStatus: 'OPEN' }, () => {
      chrome.storage.local.get(['shopStatus'], (result) => {
        console.log('ShopSwitch: Auto-revert triggered. Store is now:', result.shopStatus);
      });
    });
  }
});