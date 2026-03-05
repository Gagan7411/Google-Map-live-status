# TTD: Technical Theory & Design (Research Paper)

**Project Code Name:** ShopSwitch  
**Research Area:** Low-Latency Digital Twin Synchronization  
**Status:** Private Research Prototype  

---

## 1. The Core Problem: The "Hours Gap"
My research centers on the discrepancy between physical store operations and their digital representation (SEO/Google Maps). Traditional updates rely on manual API calls which carry latency and high "forgetfulness" risk. ShopSwitch explores a client-side solution that gives owners direct, instantaneous control over their digital storefront's "Live" status.

## 2. Technical Theory: The Cross-Origin Bridge
Web security models (Same-Origin Policy) prevent a standard web application from interacting with a browser extension's data directly. This project implements a **Triple-Pass Bridge**:

1.  **Stage 1 (Emitter):** The React application uses `window.postMessage`. This is a controlled "shout" that occurs within the browser tab.
2.  **Stage 2 (Incept/Relay):** The Chrome Extension's **Content Script** is injected into the same tab. It "hears" the message, validates the origin (strictly `localhost` for this phase), and uses the `chrome.storage` API to write the data.
3.  **Stage 3 (Global Persistence):** Once in `chrome.storage.local`, the status becomes accessible to all Google Maps tabs and the **Background Service Worker**.

## 3. Spatial Verification Logic (Geofencing)
To ensure operational integrity, the project uses a custom implementation of the **Haversine Formula**. This calculates the "Great Circle Distance" between the store's static coordinates and the owner's current GPS position.

**Formula Applied:**
`a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)`
`c = 2 ⋅ atan2( √a, √(1−a) )`
`d = R ⋅ c`

Status transitions are programmatically gated; the "Switch" is disabled at the logic layer unless `d < 0.1` (100 meters).

## 4. Intelligent Automation: The Revert Protocol
My project introduces the concept of **"Ephemeral Closures"**. Instead of a binary state change, the owner can attach a **TTL (Time To Live)** attribute to a "CLOSED" event. 

- The **Extension Alarm API** handles the countdown in a background thread.
- This ensures that even if the owner's dashboard is closed, the store status WILL revert to "OPEN" automatically, protecting the business's visibility and search rankings.

---
**© 2025 Research Project. All rights reserved. No unauthorized distribution.**
