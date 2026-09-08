# Animated Motion Counter

A customizable animated motion counter component for React powered by GSAP and Framer Motion. Features blur transitions, digit sliding, and tap spring effects out of the box with zero CSS configuration required.

---

## Live Demo

Check out the live interactive demo at: [animatedcounter.vercel.app](https://animatedcounter.vercel.app)

---

## Features

- **Zero CSS Setup** — Styles are auto-injected automatically into `<head>`.
- **Lightweight** — Minimal bundle size (< 5 KB gzipped).
- **Fully Customizable** — Custom colors for buttons, icons, and text.
- **Multiple Sizes** — `small`, `medium`, and `large` presets with matching icon scaling.
- **Spring Tap & Blur Animations** — Fluid micro-interactions on tap and state changes.
- **TypeScript Ready** — Full type definitions and IDE auto-import support.

---

## Installation

```bash
# using npm
npm install animated-motion-counter

# using yarn
yarn add animated-motion-counter

# using pnpm
pnpm add animated-motion-counter

# using bun
bun add animated-motion-counter
```

---

## Quick Start

```tsx
import React, { useState } from "react";
import { Counter } from "animated-motion-counter";

export default function App() {
  const [value, setValue] = useState(19);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Counter
        min={0}
        max={50}
        size="large"
        buttonColor="#ef4444"
        iconColor="#ffffff"
        textColor="#ffffff"
        onIncrease={(newVal) => {
          console.log("Increased:", newVal);
          setValue(newVal);
        }}
        onDecrease={(newVal) => {
          console.log("Decreased:", newVal);
          setValue(newVal);
        }}
      />
    </div>
  );
}
```

> **Note:** You can also import it as default:
> ```tsx
> import AnimatedMotionCounter from "animated-motion-counter";
> ```

---

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `min` | `number` | `0` | Minimum value & initial starting counter value |
| `max` | `number` | `undefined` | Maximum allowed value |
| `size` | `'small' \| 'medium' \| 'large'` | `'large'` | Size preset for buttons and numbers |
| `buttonColor` | `string` | `'#525252'` | Background color for increase/decrease buttons |
| `iconColor` | `string` | `'#ffffff'` | Color of the plus/minus icons |
| `textColor` | `string` | `'#ffffff'` | Color of the numeric counter digits |
| `onIncrease` | `(newValue: number) => void` | `undefined` | Callback fired when counter increases |
| `onDecrease` | `(newValue: number) => void` | `undefined` | Callback fired when counter decreases |

---

## License

ISC © [rajputshashank](https://github.com/rajputshashank003)
