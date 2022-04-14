import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Controls from "./components/Controls";
import Earth from "./components/earth/Earth";
import { connect } from "react-redux";
import { fetchAsteroids } from "./store/asteroids";

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
  componentDidMount() {
    this.props.fetchAsteroids("2022-04-10"); //replace with date chosen
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
    console.log(this.props.asteroids);
    return (
      <div id="canvas-container">
        <Controls pauseOrPlay={this.pauseOrPlay} />
        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: this.state.cameraPosition, near: 1, far: 10000 }}
        >
          <Suspense fallback={null}>
            <Earth
              asteroids={this.props.asteroids}
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

const mapStateToProps = (state) => {
  return {
    asteroids: state.asteroids,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAsteroids: (date) => dispatch(fetchAsteroids(date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default connect(mapStateToProps)(App);
