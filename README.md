# Fitness Tracker Frontend 

Cross-platform fitness tracking application built with React Native, Expo, and TypeScript. Designed for fast workout logging, workout session tracking, and relevant performance reminders.

## [Backend Repo](https://github.com/dtmesa/gravappbe)

## Features

- Android support
- Create and manage workouts & exercises
- Start and track workout sessions
- Historical performance reminders
- Persistent workout and exercise timers
- Log exercise sets, weights, reps, durations and/or distances
- Intuitive gesture-based interactions
- Fully animated true black user interface for comfortable and vivid viewing
- Stored token-based authentication

# Tech Stack

- React Native
- Expo
- Axios
- Zustand
- SWR
- TypeScript
- Biome

## Notes

`npx expo prebuild --clean` regenerates `android/`, which wipes any manual
edits to `MainActivity.kt`. When building for Android, reapply this after
every prebuild — otherwise the native nav bar's default vignette overrides
the transparent nav bar:

- Add `import android.graphics.Color` to the imports.
- At the end of `override fun onCreate(savedInstanceState: Bundle?)`, add:

  ```kotlin
  if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      window.isNavigationBarContrastEnforced = false
  }

  window.navigationBarColor = Color.TRANSPARENT
  ```

## Demo Video
https://github.com/user-attachments/assets/e7e51932-2f57-41d0-beb9-382045126062