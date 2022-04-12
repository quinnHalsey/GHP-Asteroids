import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./components/earth/Earth";

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas dpr={window.devicePixelRatio}>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
