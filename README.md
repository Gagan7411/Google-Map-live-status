# 📍 Project ShopSwitch: Real-Time Business Sync

> **Research Prototype**  
> *Notice: This is a private research project. All rights reserved. The code and documentation provided here are for demonstration and research purposes only.*

---

## 👋 Intro: Why I Built This
Have you ever checked a store's hours on Google Maps, driven all the way there, and found a "Closed" sign on the door? It’s frustrating. As an engineer, I wanted to fix this "Hours Gap."

**ShopSwitch** is my research project into how we can bridge the gap between a shop owner's physical reality and their digital presence. It's a system that lets a store manager flip a switch on a private dashboard and have that change reflect **instantly** on Google Maps for everyone to see.

---

## 📸 The System in Action

### 🟢 State: Store Open
When the store is operating normally, the dashboard confirms the status, and the Google Maps extension shows a live, pulsing "Confirmed Open" badge.

| Dashboard (Open) | Google Maps Live View |
| :---: | :---: |
| ![Dashboard Open State Placeholder](https://via.placeholder.com/600x400?text=Dashboard+Open+State+Screenshot) | ![Maps Open Badge Placeholder](https://via.placeholder.com/600x400?text=Google+Maps+Live+Open+Badge) |

### 🔴 State: Store Closed
If the owner needs to close early or take a break, they use the dashboard. After a biometric check, the status flips, and the Google Maps badge turns red immediately.

| Dashboard (Closed) | Google Maps Live View |
| :---: | :---: |
| ![Dashboard Closed State Placeholder](https://via.placeholder.com/600x400?text=Dashboard+Closed+State+Screenshot) | ![Maps Closed Badge Placeholder](https://via.placeholder.com/600x400?text=Google+Maps+Live+Closed+Badge) |

---

## 🧠 How it Actually Works (The Tech Stuff)
Behind the scenes, this project is a handshake between two very different environments:

1.  **The Command Center (React + Vite):** A high-fidelity dashboard I designed to feel like a premium "Google Admin" tool. It handles the heavy lifting like **Geofencing** (making sure the owner is actually at the store) and **Biometric MFA** (confirming identity).
2.  **The Live Bridge (Chrome Extension):** A custom-built Manifest V3 extension. It's the "eyes" on Google Maps. It listens for messages from the dashboard and uses a **MutationObserver** to find the right spot on the Maps page to inject the status badge.
3.  **The Messenger:** Since web pages and extensions don't usually talk to each other, I built a **Cross-Origin Message Bridge**. It securely passes "Status Update" signals from the React app to the Chrome storage in real-time.

---

## 🛠 Project Components
- **Framework:** React 18 with Vite for speed.
- **Styling:** Vanilla CSS & Tailwind (curated for that clean, professional look).
- **Animations:** Framer Motion for smooth transitions and the fingerprint scanner effect.
- **Extension Logic:** Manifest V3, using Background Workers and Content Scripts to manipulate the Maps DOM.

---

## ⚠️ Research Notes
- **Geofence Security:** I implemented a Haversine formula check to ensure the toggle only works within a 100m radius of the shop.
- **Auto-Revert Logic:** I explored an "Intelligent Revert" system where the store can automatically re-open after a set time, so owners don't forget to turn the digital sign back on.

---
*This project is part of my ongoing research into localized IoT and digital twin synchronization.*
