# Foodie - Premium Food Delivery & Dining App 🍔🚗💨

Welcome to **Foodie**! A high-fidelity, production-grade React Native food delivery and dining application built using **Expo**, **React Navigation**, and **TypeScript**. 

Designed to mimic state-of-the-art platforms like Zomato, this app features a visually stunning, responsive layout, fluid micro-animations, and a highly structured component architecture.

---

## ✨ Key Features

*   🔑 **Wizard-Style Authentication**: A seamless onboarding flow that dynamically transitions from Mobile Input (`Continue`) to secure Password Entry (`Login`) in the *exact same container* once a valid 10-digit number is inputted.
*   🧭 **Fluid Tab Navigation**: Native-feel, high-performance tab-based routing featuring high-end custom header configurations.
*   🚪 **Animated Custom Side-Drawer**: Fully animated sliding profile drawer overlay built using React Native's native `Animated` timing API, complete with gradient profile cards (`expo-linear-gradient`), user stats, and a stack-clearing secure **Logout** reset routine.
*   🥗 **Dynamic Category & Restaurant Listings**: Interactive visual filters, custom category carousels, and high-fidelity food cards with real-time shadow elevations.
*   🛒 **Complete Checkout & Cart Flow**: Detailed billing cards with live subtotal math, custom valet tipping selectors, Feeding India charity donation toggles, and fully polished contactless delivery options.
*   🛡️ **100% Strict TypeScript Integration**: Strongly typed data models and cast hooks ensuring **zero compiler warnings or errors** across the entire workspace.

---

## 🛠️ Technology Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
*   **Routing**: File-based [Expo Router](https://docs.expo.dev/router/introduction/) (React Navigation)
*   **Styling**: Premium, responsive Vanilla `StyleSheet.create` with custom shadow mappings
*   **Icons**: `@expo/vector-icons` (Ionicons, MaterialCommunityIcons, FontAwesome)
*   **Gradients**: `expo-linear-gradient` for premium backdrop transitions
*   **Type Safety**: TypeScript with strict lint checking rules

---

## 🚀 Getting Started

### 1. Prerequisite Installations
Ensure you have [Node.js](https://nodejs.org/) and the [Expo Go](https://expo.dev/go) app (for physical devices) or [Android Studio](https://developer.android.com/studio) / [Xcode](https://developer.apple.com/xcode/) (for emulators) set up on your system.

### 2. Install Dependencies
Navigate to the root directory and install npm modules:
```bash
npm install
```

### 3. Run the Development Server
Launch the compiler and boot the dev server:
```bash
# To run on Android Emulator/Device
npm run android

# To run on iOS Simulator
npm run ios

# Or start the expo GUI
npx expo start
```

### 4. Running Quality Checks & Linting
The codebase is validated and configured with Expo's strict linting and TypeScript compiler options. To verify build integrity, run:
```bash
npm run lint
```

---

## 📁 Directory Structure

```text
DeliveryApp/
├── app/                  # Main Expo Router pages & screens
│   ├── (tabs)/           # Navigation Tab group (HomeScreen, CartScreen, etc.)
│   ├── _layout.tsx       # Core React Navigation Stack router configurations
├── assets/               # Local static assets (Images, Food Photos, Vectors)
├── components/           # Modular, reusable presentation components
├── constants/            # Global styling colors and configuration tokens
├── hooks/                # Custom React hooks (navigation, state storage, etc.)
├── package.json          # Node dependencies and scripts
└── tsconfig.json         # Strict TypeScript compiler options
```

---

## 💅 UX & Aesthetic Design Rules
*   **Palette**: Tailored crimson red (`#CB202D`) matching modern food delivery design languages, offset by pure `#ffffff` canvas backdrops and charcoal text (`#2D2D2D`).
*   **Smooth Fades**: Bottom-anchored transparent-to-white linear gradient overlays fading out image headers softly.
*   **Elevation**: Styled depth dimensions (`shadowOffset`, `shadowOpacity`, `elevation`) to construct floating, clickable cards.
