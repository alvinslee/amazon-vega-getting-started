# Vega Video App

A multi-screen video application built with Amazon Vega SDK, following the [official Vega tutorial](https://developer.amazon.com/docs/vega-tutorial/0.22/part-two-code.html). This app displays video content in categories and allows navigation between a landing screen, video detail screen, and video playback screen.

## Project Structure

```
project/
├── package.json            # Project dependencies and Vega configuration
├── tsconfig.json           # TypeScript configuration
├── manifest.toml           # App identity and component configuration
├── metro.config.js         # Metro bundler configuration
├── src/
│   ├── App.tsx             # Root component with navigation setup
│   ├── assets/             # Image assets
│   │   ├── background.png
│   │   ├── build.png
│   │   ├── focusedStar.png
│   │   ├── learn.png
│   │   ├── star.png
│   │   ├── support.png
│   │   └── vega.png
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx      # Focusable button component
│   │   ├── Header.tsx      # App header component
│   │   ├── VideoCard.tsx   # Video card with focus handling
│   │   └── index.ts        # Component barrel exports
│   └── screens/            # Screen components
│       ├── LandingScreen.tsx        # Main screen with video categories
│       ├── VideoDetailScreen.tsx    # Video detail view
│       ├── VideoPlaybackScreen.tsx  # Video playback placeholder
│       └── index.ts                 # Screen barrel exports
```

## Components

### Header
- Displays "Welcome to Vega!" title
- Orange text (#FF9900) on dark background (#232F3E)

### VideoCard
- Displays video thumbnail, title, and description
- Focus state management with yellow border when focused
- Used in horizontal FlatLists on LandingScreen

### Button
- Focusable button with visual feedback
- Orange background (#FF9900) with yellow border on focus
- Used for navigation actions

## Screens

### LandingScreen
- Fetches video data from remote API
- Displays two categories: "Costa Rica Islands" and "Costa Rica Underwater"
- Uses `TVFocusGuideView` for TV focus management
- Navigates to VideoDetailScreen on video selection

### VideoDetailScreen
- Displays video details with background image
- Shows video title, description, and action buttons
- "Watch Now" button navigates to VideoPlaybackScreen
- "Back" button returns to previous screen

### VideoPlaybackScreen
- Placeholder screen for video playback
- Currently displays video URL
- Back button to return to VideoDetailScreen

## Navigation

Navigation is configured directly in `App.tsx` using Amazon's Vega navigation packages:
- `@amazon-devices/react-navigation__native` (NavigationContainer)
- `@amazon-devices/react-navigation__stack` (createStackNavigator)
