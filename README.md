# Vega Video App

A multi-screen video application built with Amazon Vega SDK, building off of the [official Vega tutorial](https://developer.amazon.com/docs/vega-tutorial/0.22/part-two-code.html). This app displays video content in categories and plays back MP4 video using the W3C Media Player API.

## Project Structure

```
project/
├── package.json            # Project dependencies and Vega configuration
├── tsconfig.json           # TypeScript configuration
├── manifest.toml           # App identity, component config, and media service declarations
├── metro.config.js         # Metro bundler configuration
├── src/
│   ├── App.tsx             # Root component with navigation setup
│   ├── assets/             # Image assets (icons and video tile art)
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx              # Focusable button component
│   │   ├── Header.tsx              # App header component
│   │   ├── VideoCard.tsx           # Video card with focus handling
│   │   ├── VideoPlayerUI.tsx       # Player controls overlay with auto-hide
│   │   ├── PlaybackControls.tsx    # Play/pause and skip buttons
│   │   ├── PlayPauseButton.tsx     # Play/pause toggle
│   │   ├── Seekbar.tsx             # Seek bar with scrubbing support
│   │   ├── VideoPlayerHeader.tsx   # Title and back button overlay
│   │   ├── BufferingWindow.tsx     # Loading overlay
│   │   ├── ErrorView.tsx           # Playback error display
│   │   ├── BackButton.tsx          # Back navigation button
│   │   ├── PlayerButton.tsx        # Generic player button with focus state
│   │   ├── FocusableElement.tsx    # Focus/blur wrapper for TV navigation
│   │   └── index.ts                # Component barrel exports
│   ├── data/
│   │   └── NewVideoTestData.json   # Local video catalog
│   ├── hooks/
│   │   └── useMediaControls.ts     # Control visibility and auto-hide timing
│   ├── screens/
│   │   ├── LandingScreen.tsx       # Main screen with video categories
│   │   ├── VideoDetailScreen.tsx   # Video detail view
│   │   ├── VideoPlaybackScreen.tsx # Video playback screen
│   │   └── index.ts                # Screen barrel exports
│   ├── styles/
│   │   └── Colors.ts               # Shared color constants
│   └── utils/
│       ├── VideoHandler.ts         # W3C Media Player lifecycle management
│       ├── assetResolver.ts        # Resolves image paths for the video catalog
│       ├── commonFunctions.ts      # Shared helpers (time formatting, etc.)
│       ├── pixelUtils.ts           # DPI scaling utilities
│       └── videoPlayerValues.ts    # Player configuration constants
```

## Components

### Header
- Displays "Welcome to Vega!" title
- Orange text (#FF9900) on dark background (#232F3E)

### VideoCard
- Displays video thumbnail, title, and description
- Uses `resolveImageSource` to support both local asset paths and remote URLs for thumbnails
- Images displayed with `resizeMode: 'cover'`
- Focus state management with yellow border when focused
- Used in horizontal FlatLists on LandingScreen

### Button
- Focusable button with visual feedback
- Orange background (#FF9900) with yellow border on focus
- Used for navigation actions

### Player components
- **VideoPlayerUI** — controls overlay with auto-hide behavior (5-second timer) over a gradient backdrop
- **PlaybackControls** — rewind (10s), play/pause, and forward (10s) buttons
- **Seekbar** — seek bar with scrubbing, fast-forward/rewind acceleration
- **BufferingWindow** — semi-transparent overlay shown during buffering and seek
- **ErrorView** — error state with back navigation

## Screens

### LandingScreen
- Loads video data from local `NewVideoTestData.json`
- Dynamically groups videos by category and renders a horizontal row per category
- Currently displays two categories: "Hits" and "Costa Rica Islands"
- Uses `TVFocusGuideView` for TV focus management; auto-focuses the first category row on load
- Navigates to VideoDetailScreen on video selection

### VideoDetailScreen
- Displays video details with background image
- Uses `resolveImageSource` to support local asset paths for the background image
- Shows video title, description, and action buttons
- "Watch Now" button navigates to VideoPlaybackScreen
- "Back" button returns to previous screen

### VideoPlaybackScreen
- Full video playback using `@amazon-devices/react-native-w3cmedia`
- `VideoHandler` manages the player lifecycle: initialize, load, play, and cleanup
- `KeplerVideoSurfaceView` renders video frames on the TV hardware
- Playback controls overlay with play/pause, seek, and auto-hide
- Handles Fire TV remote events via `useTVEventHandler`
- Auto-navigates back when video ends

## Navigation

Navigation is configured directly in `App.tsx` using Amazon's Vega navigation packages:
- `@amazon-devices/react-navigation__native` (NavigationContainer)
- `@amazon-devices/react-navigation__stack` (createStackNavigator)
