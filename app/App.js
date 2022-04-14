import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Controls from "./components/Controls";
import Earth from "./components/earth/Earth";
import { connect } from "react-redux";
import { fetchAsteroids } from "./store/asteroids";
import { toggleAnimation } from "./store/controls";
import AsteroidClass from "./components/Asteroid";
import { setSingleAsteroid } from "./store/singleAsteroid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      paused: false,
      cameraPosition: [0, 0, 50],
    };
    this.pauseOrPlay = this.pauseOrPlay.bind(this);
    this.updateCameraPosition = this.updateCameraPosition.bind(this);
    this.getSelectStatus = this.getSelectStatus.bind(this);
  }
  componentDidMount() {
    this.props.fetchAsteroids("2022-04-11"); //replace with date chosen
  }
  getSelectStatus(asteroid) {
    if (this.props.singleAsteroid !== undefined) {
      return this.props.singleAsteroid.id === asteroid.id;
    }
    return false;
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
              asteroids={this.props.asteroids}
              paused={this.props.paused}
              pauseOrPlay={this.pauseOrPlay}
              cameraPosition={this.state.cameraPosition}
            />
            {this.props.asteroids.map((asteroid, idx) => (
              <AsteroidClass
                key={asteroid.id}
                asteroid={asteroid}
                setSingleAsteroid={this.props.setSingleAsteroid}
                paused={this.props.paused}
                cameraPosition={this.state.cameraPosition}
                getSelectStatus={this.getSelectStatus}
                pauseOrPlay={this.pauseOrPlay}
                updateCameraPosition={this.updateCameraPosition}
              />
            ))}
          </Suspense>
        </Canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    asteroids: state.asteroids,
    singleAsteroid: state.singleAsteroid,
    paused: state.paused,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAsteroids: (date) => dispatch(fetchAsteroids(date)),
    setSingleAsteroid: (asteroid) => dispatch(setSingleAsteroid(asteroid)),
    toggleAnimation: (paused) => dispatch(toggleAnimation(paused)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default connect(mapStateToProps)(App);
