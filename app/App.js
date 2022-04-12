import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./components/earth/Earth";
import Asteroid from "./components/Asteroid";

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 100] }}>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
