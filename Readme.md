# Animated Motion Counter

## Description
This project is an animated motion counter that visually represents numerical data in an engaging way.

## Live Demo
You can view the live version of the project at [animatedcounter.vercel.app](https://animatedcounter.vercel.app).

## Features
- Smooth animations
- Responsive design
- Easy to integrate

## Installation
To run this project locally:
 Copy and paste the command below into your terminal:

```bash
# using npm
npm install animated-motion-counter
``` 
## Usage

- Component - App.tsx
```bash
import { Counter } from "animated-motion-counter";
import React, { useState } from "react";

export default function App() {
  const [value, setValue] = useState(19);

  const handleIncrease = (newValue: number) => {
    console.log("Increased to:", newValue);
    setValue(newValue);
  };

  const handleDecrease = (newValue: number) => {
    console.log("Decreased to:", newValue);
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Counter
        min={19}
        max={22}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        size="large"
        buttonColor="red"
        iconColor="white"
        textColor="white"
      />
    </div>
  );
}
