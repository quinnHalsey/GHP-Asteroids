import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Earth } from "./components/earth/Earth";
import Controls from "./components/Controls";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      paused: false,
      cameraPosition: [0, 0, 50],
    };
    this.pauseOrPlay = this.pauseOrPlay.bind(this);
    this.updateCameraPosition = this.updateCameraPosition.bind(this);
  }
  pauseOrPlay() {
    if (this.state.paused) {
      this.setState({ paused: false });
    } else {
      this.setState({ paused: true });
    }
  }
  updateCameraPosition(cameraPosition) {
    this.setState({ cameraPosition });
  }
  render() {
    return (
      <div id="canvas-container">
        <Controls pauseOrPlay={this.pauseOrPlay} />
        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: this.state.cameraPosition, near: 1, far: 10000 }}
        >
          <Suspense fallback={null}>
            <Earth
              paused={this.state.paused}
              pauseOrPlay={this.pauseOrPlay}
              focusCamera={this.focusCamera}
              updateCameraPosition={this.updateCameraPosition}
              cameraPosition={this.state.cameraPosition}
            />
          </Suspense>
        </Canvas>
      </div>
    );
  }
}

export default App;
