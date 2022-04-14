import React, { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import AsteroidTexture from "../assets/textures/asteroid.png";
import * as THREE from "three";

let timer = 0;

const getRandomDetail = () => {
  const detailArr = [1, 2, 3, 4, 5];
  return detailArr[Math.floor(Math.random() * 5)];
};

const Asteroid = (props) => {
  const radius = Math.round((props.diameter * 40) / 12750);
  const distanceConstant =
    Math.round(((props.distance / 100) * 40) / 12750) + 20;
  const orbitCircumference = Math.round(2 * (props.distance / 2) * Math.PI);
  const velocityConstant = (props.velocity * 360) / orbitCircumference;
  const asteroidMap = useLoader(TextureLoader, AsteroidTexture);
  const asteroidRef = useRef();
  const hoverRingRef = useRef();
  const ghostRef = useRef();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (!props.paused) {
      timer++;
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
      hoverRingRef.current.position.x =
        distanceConstant * Math.cos(timer * velocityConstant);
      hoverRingRef.current.position.z =
        distanceConstant * Math.sin(timer * velocityConstant);
    }
    if (props.resetCamera) {
      state.camera.lookAt(ghostRef.current.position);
      ghostRef.current.position.lerp(vec.set(0, 0, 0), 0.01);
      state.camera.updateProjectionMatrix();
      props.updateCameraPosition(state.camera.position);
    }
    if (props.moveCamera) {
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
          asteroidRef.current.position.x + 10,
          asteroidRef.current.position.y,
          asteroidRef.current.position.z + 10
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
      <mesh
        ref={asteroidRef}
        onPointerOver={() => props.handleHover()}
        onPointerOut={() => props.handleHover()}
        onClick={(event) => props.handleSelect(event)}
      >
        <dodecahedronGeometry radius={radius} detail={getRandomDetail()} />
        <meshBasicMaterial map={asteroidMap} />
      </mesh>
      {props.hover || props.selected ? (
        <mesh ref={hoverRingRef}>
          <torusGeometry args={[radius + 1, 0.5, 23, 79]} />
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
      <mesh ref={ghostRef}>
        <sphereGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="blue" transparent opacity={0} />
      </mesh>
    </>
  );
};

class AsteroidClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      selected: false,
      moveCamera: false,
      resetCamera: false,
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTimeout = null;
  }
  handleHover() {
    if (this.state.hover) {
      const timeout = this.props.paused ? 0 : 700;
      setTimeout(() => this.setState({ hover: false }), timeout);
    } else if (!this.state.hover) {
      this.setState({ hover: true });
    }
  }
  handleSelect(event) {
    if (this.state.selected) {
      this.setState({
        selected: false,
        hover: true,
        moveCamera: false,
        resetCamera: true,
      });
      this.resetTimeout = setTimeout(() => {
        this.setState({ resetCamera: false });
      }, 5000);
    } else if (!this.state.selected) {
      if (!this.props.paused) {
        this.props.pauseOrPlay();
      }
      if (this.resetTimeout) {
        clearTimeout(this.resetTimeout);
      }
      this.setState({ selected: true, hover: false, moveCamera: true });
    }
  }
  render() {
    return (
      <>
        <Asteroid
          distance={this.props.distance}
          velocity={this.props.velocity}
          diameter={this.props.diameter}
          hazardous={this.props.hazardous}
          handleHover={this.handleHover}
          hover={this.state.hover}
          selected={this.state.selected}
          handleSelect={this.handleSelect}
          paused={this.props.paused}
          moveCamera={this.state.moveCamera}
          updateCameraPosition={this.props.updateCameraPosition}
          resetCamera={this.state.resetCamera}
        />
      </>
    );
  }
}

export default AsteroidClass;
