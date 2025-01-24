# React Native Stuff 22 - One Action Swipe Pad

## Description

Create a touch screen that on tap displays a pad that will read swipes as well. All in one action: press (and hold) then swipe.

### Test01.js

First prototype with touch /hold one action.

- in this method, we're not using Modal at all
- all gestures are handled from one `<GestureDetector gesture={combinedGestures}>` in the Test01.js jsx.
  - this will give the impression that a pad is different than the screen, but in fact we're just capturing all on the same "pad".

### Test02,js

- moves the "swipe pad" to a different file (i.e. found in SwipePad01.js)
- uses `Gesture.Simultaneous()` instead of `.Race()` because we're going to try to capture the end of a swipe
- Create a top section that illuminate when user swipes into it.
  - On release in a sector will register the action.
- attempted to create a center circle that if swipe occurs in that the top section does not light up and the swipe pad should disappear.

## Installations

### 1. Navigation

```
yarn add @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### 2. Gesture

`react-native-gesture-handler`

### 3. svg

`react-native-svg`
