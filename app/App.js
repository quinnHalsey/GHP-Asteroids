import React, { Suspense } from "react";
import { Canvas, useRef } from "@react-three/fiber";
import Controls from "./components/Controls";
import Earth from "./components/Earth";
import { connect } from "react-redux";
import { fetchAsteroids } from "./store/asteroids";
import { toggleAnimation } from "./store/controls";
import AsteroidClass from "./components/Asteroid";
import { setSingleAsteroid } from "./store/singleAsteroid";
import SingleAsteroid from "./components/SingleAsteroid";
import DateContainer from "./components/Date";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      paused: false,
      cameraPosition: [0, 0, 50],
    };
    this.ghostRef = React.createRef();
    this.pauseOrPlay = this.pauseOrPlay.bind(this);
    this.updateCameraPosition = this.updateCameraPosition.bind(this);
    this.getSelectStatus = this.getSelectStatus.bind(this);
  }
  componentDidMount() {
    this.props.fetchAsteroids(this.props.date);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.fetchAsteroids(this.props.date);
    }
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
        <DateContainer />
        {this.props.singleAsteroid.id ? (
          <SingleAsteroid asteroid={this.props.singleAsteroid} />
        ) : (
          <></>
        )}
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
                ghostRef={this.ghostRef}
                singleAsteroid={this.props.singleAsteroid}
                setSingleAsteroid={this.props.setSingleAsteroid}
                paused={this.props.paused}
                cameraPosition={this.state.cameraPosition}
                getSelectStatus={this.getSelectStatus}
                pauseOrPlay={this.pauseOrPlay}
                updateCameraPosition={this.updateCameraPosition}
              />
            ))}
            <mesh ref={this.ghostRef}>
              <sphereGeometry args={[0, 1, 1]} />
              <meshBasicMaterial color="blue" transparent opacity={0} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date,
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
