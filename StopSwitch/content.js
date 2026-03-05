/**
 * ShopSwitch Content Engine
 * Injects a reactive 'Live' badge into Google Maps.
 * Also acts as a Bridge for the Localhost Dashboard.
 */

const INJECT_ID = 'shopswitch-live-root';

// 1. Function to create or update the Badge
const updateBadgeUI = (status) => {
  let root = document.getElementById(INJECT_ID);
  const isClosed = status === 'CLOSED';
  const color = isClosed ? '#D93025' : '#188038';
  const text = isClosed ? 'LIVE: OWNER CLOSED' : 'LIVE: CONFIRMED OPEN';

  const badgeHTML = `
    <div style="
      display: inline-flex;
      align-items: center;
      background: ${color};
      color: white;
      padding: 4px 12px;
      border-radius: 16px;
      font-family: 'Product Sans', Roboto, sans-serif;
      font-size: 12px;
      font-weight: 500;
      margin-left: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      vertical-align: middle;
      transition: all 0.3s ease;
    ">
      <span style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        margin-right: 6px;
        display: ${isClosed ? 'none' : 'inline-block'};
        animation: pulse 1.5s infinite;
      "></span>
      ${text}
    </div>
    <style>
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
    </style>
  `;

  if (!root) {
    root = document.createElement('div');
    root.id = INJECT_ID;
  }

  root.innerHTML = badgeHTML;
  return root;
};

// 2. Observer to watch Google Maps DOM
const observer = new MutationObserver(() => {
  const titleElement = document.querySelector('h1.DUwDvf');

  if (titleElement && !document.getElementById(INJECT_ID)) {
    chrome.storage.local.get(['shopStatus'], (result) => {
      const status = result.shopStatus || 'OPEN';
      const badge = updateBadgeUI(status);
      titleElement.parentElement.appendChild(badge);
    });
  }
});

// 3. INTERNAL STORAGE LISTENER: For Extension UI Updates
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && (changes.shopStatus)) {
    const status = changes.shopStatus.newValue;
    const titleElement = document.querySelector('h1.DUwDvf');
    if (titleElement) {
      updateBadgeUI(status);
    }
  }
});

// 4. CROSS-ORIGIN BRIDGE: Listen for updates FROM the Dashboard (Localhost)
window.addEventListener("message", (event) => {
  // Security: Only accept messages from our own dashboard
  if (event.origin !== window.location.origin && !event.origin.includes('localhost')) return;

  if (event.data && event.data.type === 'SHOPSWITCH_STATUS_UPDATE') {
    const { status, autoRevertEnabled, revertDuration } = event.data;
    console.log('[ShopSwitch Extension] Received Update from Dashboard:', status);

    // Write to Chrome Storage (which exists for the extension)
    chrome.storage.local.set({
      shopStatus: status,
      autoRevertEnabled: autoRevertEnabled || false,
      revertDuration: revertDuration || 60
    });
  }
}, false);

// 5. Start sniffing the DOM (only on Google Maps)
if (window.location.host.includes('google')) {
  observer.observe(document.body, { childList: true, subtree: true });
}

console.log('ShopSwitch Extension Bridge Active');