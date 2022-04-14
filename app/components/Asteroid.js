import React, { useRef } from "react";
import { connect } from "react-redux";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import AsteroidTexture from "../assets/textures/asteroid.png";
import * as THREE from "three";

const vec = new THREE.Vector3();

let timer = 20834;

const getRandomDetail = () => {
  const detailArr = [1, 3, 5];
  return detailArr[Math.floor(Math.random() * 3)];
};

console.log(getRandomDetail());
console.log(getRandomDetail());
console.log(getRandomDetail());
console.log(getRandomDetail());
console.log(getRandomDetail());

const getRandomAngle = () => {
  const angleArr = [0, 0.1, 0.2, 0.3];
  return angleArr[Math.floor(Math.random() * 4)];
};

const Asteroid = (props) => {
  const ghostRef = props.ghostRef;
  let radius = props.diameter / 2 / 65; // Asteroids at 100x scale compared to Earth
  let scale = [1, 1, 1];
  if (radius < 1) {
    scale = [radius, radius, radius];
    radius = 1;
  }
  const toScaleDist = props.distance / 325;
  const distance = toScaleDist / 1000;
  const distanceConstant = distance + 20;
  const orbitCircumference = Math.round(2 * (props.distance / 2) * Math.PI);
  const velocityConstant = (props.velocity * 360) / orbitCircumference / 1000;
  const asteroidMap = useLoader(TextureLoader, AsteroidTexture);
  const asteroidRef = useRef();
  const hoverRingRef = useRef();
  // const ghostRef = useRef();
  const orbitRef = useRef();
  useFrame((state) => {
    // orbitRef.current.rotation.x = props.angle;
    if (!props.paused) {
      timer++;
      // orbitRef.current.rotation.y += 0.01;
    }
    asteroidRef.current.position.x =
      distanceConstant * Math.cos(timer * velocityConstant);
    asteroidRef.current.position.z =
      distanceConstant * Math.sin(timer * velocityConstant);
    asteroidRef.current.rotation.z += 0.005;
    asteroidRef.current.rotation.x += 0.005;
    asteroidRef.current.rotation.y += 0.005;
    if (props.hover || props.selected) {
      hoverRingRef.current.rotation.z += 0.01;
      hoverRingRef.current.rotation.x += 0.01;
      hoverRingRef.current.rotation.y += 0.01;
    }
    if (props.hover) {
      hoverRingRef.current.opacity = 0.05;
    } else if (props.selected) {
      hoverRingRef.current.opacity = 1;
    }
    if (props.resetCamera) {
      state.camera.lookAt(ghostRef.current.position);
      ghostRef.current.position.lerp(vec.set(0, 0, 0), 0.01);
      state.camera.updateProjectionMatrix();
      props.updateCameraPosition(state.camera.position);
    }
    if (props.selected) {
      state.camera.lookAt(ghostRef.current.position);
      ghostRef.current.position.lerp(
        vec.set(
          asteroidRef.current.position.x,
          asteroidRef.current.position.y,
          asteroidRef.current.position.z
        ),
        0.1
      );
      state.camera.position.lerp(
        vec.set(
          asteroidRef.current.position.x,
          0,
          asteroidRef.current.position.z + 20
        ),
        0.05
      );
      state.camera.updateProjectionMatrix();
      props.updateCameraPosition(state.camera.position);
    }
    return null;
  });
  return (
    <>
      <object3D ref={orbitRef} position={(0, 0, 0)} rotateX={90}>
        <mesh
          name="asteroid"
          ref={asteroidRef}
          position={[0, 0, distance]}
          onPointerOver={() => props.handleHover()}
          onPointerOut={() => props.handleHoverOut()}
          onClick={(event) => props.handleSelect(event)}
        >
          <dodecahedronGeometry args={[radius, props.detail]} scale={scale} />
          <meshBasicMaterial map={asteroidMap} />
          {props.hover || props.selected ? (
            <mesh ref={hoverRingRef}>
              <torusGeometry
                args={[radius * 2, radius / 5, 23, 79]}
                scale={scale}
                position={[0, 0, distance]}
                opacity={0}
              />
              <meshNormalMaterial
                transparent
                opacity={props.selected ? 1 : 0.3}
                reflectivity={1}
                metalness={1}
                roughness={0.3}
                wireframe
              />
            </mesh>
          ) : (
            <></>
          )}
        </mesh>
      </object3D>
      {/* <mesh ref={ghostRef}>
        <sphereGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="blue" transparent opacity={0.5} />
      </mesh> */}
    </>
  );
};

class AsteroidClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      selected: this.props.singleAsteroid.id === this.props.asteroid.id,
      moveCamera: this.props.singleAsteroid.id === this.props.asteroid.id,
      resetCamera: false,
      angle: getRandomAngle(),
      detail: getRandomDetail(),
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);

    this.handleSelect = this.handleSelect.bind(this);
    this.resetTimeout = null;
  }
  handleHover() {
    if (this.props.singleAsteroid.id === this.props.asteroid.id) {
      console.log("in first if, should stop");
      return null;
    } else if (!this.state.hover) {
      this.setState({ hover: true });
    }
    // } else {
    //   if (this.state.hover) {
    //     console.log("in second if");
    //     const timeout = this.props.paused ? 0 : 700;
    //     setTimeout(() => this.setState({ hover: false }), timeout);
    //   } else if (!this.state.hover) {
    //     console.log("in third if");
    //     this.setState({ hover: true });
    //   }
    // }
  }
  handleHoverOut() {
    if (this.state.hover) {
      const timeout = this.props.paused ? 0 : 700;
      setTimeout(() => this.setState({ hover: false }), timeout);
    }
  }
  handleSelect(event) {
    if (this.props.singleAsteroid.id === this.props.asteroid.id) {
      //deselect
      console.log("inside handle select");
      this.props.setSingleAsteroid({});
      this.setState({ resetCamera: true });
    } else if (this.props.singleAsteroid.id !== this.props.asteroid.id) {
      this.props.setSingleAsteroid(this.props.asteroid);
      this.setState({ resetCamera: false, hover: false });
    }
    // if (this.state.selected) {
    //   this.setState({
    //     selected: false,
    //     hover: true,
    //     moveCamera: false,
    //     resetCamera: true,
    //   });
    //   this.resetTimeout = setTimeout(() => {
    //     this.setState({ resetCamera: false });
    //   }, 5000);
    // } else if (!this.state.selected) {
    //   if (!this.props.paused) {
    //     this.props.pauseOrPlay();
    //   }
    //   if (this.resetTimeout) {
    //     clearTimeout(this.resetTimeout);
    //   }
    //   this.setState({ selected: true, hover: false, moveCamera: true });
    // }
  }
  render() {
    // console.log(this.state, "asteroid state");
    // console.log(this.props.singleAsteroid);
    const asteroid = this.props.asteroid;
    // console.log(
    //   this.props.singleAsteroid.id === this.props.asteroid.id,
    //   "selected?"
    // );
    return (
      <>
        <Asteroid
          distance={asteroid.close_approach_data[0].miss_distance.kilometers}
          diameter={asteroid.estimated_diameter.meters.estimated_diameter_max}
          hazardous={asteroid.is_potentially_hazardous_asteroid}
          velocity={
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_hour
          }
          ghostRef={this.props.ghostRef}
          selected={this.props.singleAsteroid.id === this.props.asteroid.id}
          angle={this.state.angle}
          detail={this.state.detail}
          hover={this.state.hover}
          paused={this.props.paused}
          moveCamera={this.state.moveCamera}
          updateCameraPosition={this.props.updateCameraPosition}
          resetCamera={this.state.resetCamera}
          handleHover={this.handleHover}
          handleHoverOut={this.handleHoverOut}
          handleSelect={this.handleSelect}
        />
      </>
    );
  }
}

export default AsteroidClass;
