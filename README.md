# React Native Stuff 22 - One Action Swipe Pad

## Description

Create a touch screen that on tap displays a pad that will read swipes as well. All in one action: press (and hold) then swipe.

### Test01.js

First prototype with touch /hold one action.

- in this method, we're not using Modal at all
- all gestures are handled from one `<GestureDetector gesture={combinedGestures}>` in the Test01.js jsx.
  - this will give the impression that a pad is different than the screen, but in fact we're just capturing all on the same "pad".

### Test02.js

- moves the "swipe pad" to a different file (i.e. found in SwipePad01.js)
- uses `Gesture.Simultaneous()` instead of `.Race()` because we're going to try to capture the end of a swipe
- one action press to display pad, hold to swipe is tracked as swipe `Pan.onChange()`
- if user does not swipe out of inner circle SwipePad disappears.
- Top and bottom section that illuminate when user swipes into it.

### Test03.js

- register an action if user releases swipe on non inner circle
- add clear actions button
- if user does not move out of inner circle pad disappears.
- tap center make swipe pad disappear was deactivated

### Test04.js

- SwipePadFourOptions
  - picks up from Test03.js and SwipePad01.js
  - adds two more sectors in SwipePad
    - no more squres in this case all "triangles" (aka rotated rectangles)
- tap center make swipe pad disappear was deactivated

### Test05.js

- SwipePadFourAndOneOptions
  - picks up from Test04.js and SwipePadeFourOptions.js to create an outer circle with a single Top "triangle" option
  - this is basic framework and logic for outer circle
  - stopped at 1 outer "triangle" because
- up to this point tap center make swipe pad disappear was deactivated

### Test06.js

- SwipePadFourAndFourOptions
  - picks up from Test05.js and SwipePadFourAndOneOptions.js to create an outer circle with all 4 triangles
- `circleRadiusMiddle` and `circleRadiusOuter` properties can be assigned independently from one another.

### Test07.js

- SwipePadFourAndFiveOptions
  - picks up from Test06.js and SwipePadFourAndFiveOptions.js to create an outer circle with 5 "triangles" / options

### PolygonPoints.js

- I created to help understand where the "triangle" points really are in reference to the `<Svg>` box.

### PoloygonPoints03.js

ChatGPT help to create a circle with 12 triangles rotating around the circle.

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
