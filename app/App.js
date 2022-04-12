import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <Suspense fallback={null}></Suspense>
      </Canvas>
    </div>
  );
};

export default App;
