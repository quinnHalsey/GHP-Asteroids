import React, { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useFrame, extend } from "@react-three/fiber";
import AsteroidTexture from "../assets/textures/asteroid.png";
import { Effects, TransformControls } from "@react-three/drei";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { Camera } from "three";
import * as THREE from "three";
let timer = 0;
extend({ EffectPass, RenderPass, EffectComposer, BloomEffect });

const Asteroid = (props) => {
  const asteroidMap = useLoader(TextureLoader, AsteroidTexture);
  const asteroidRef = useRef();
  const hoverRingRef = useRef();
  const vec = new THREE.Vector3();
  useFrame((state) => {
    if (!props.paused) {
      timer++;
      asteroidRef.current.rotation.z += 0.005;
      asteroidRef.current.rotation.x += 0.005;
      asteroidRef.current.rotation.y += 0.005;
      asteroidRef.current.position.x = 120 * Math.cos(timer / 300) + 0;
      asteroidRef.current.position.z = 120 * Math.sin(timer / 300) + 0;
      // if (props.hover || props.selected) {
      //   hoverRingRef.current.position.x = 120 * Math.cos(timer / 300) + 0;
      //   hoverRingRef.current.position.z = 120 * Math.sin(timer / 300) + 0;
      // }
    }
    if (props.hover || props.selected) {
      hoverRingRef.current.position.x = 120 * Math.cos(timer / 300) + 0;
      hoverRingRef.current.position.z = 120 * Math.sin(timer / 300) + 0;
      hoverRingRef.current.rotation.z += 0.01;
      hoverRingRef.current.rotation.x += 0.01;
      hoverRingRef.current.rotation.y += 0.01;
    }
    if (props.moveCamera) {
      state.camera.lookAt(asteroidRef.current.position);
      state.camera.position.lerp(
        vec.set(
          asteroidRef.current.position.x + 10,
          asteroidRef.current.position.y - 2,
          asteroidRef.current.position.z + 10
        ),
        0.01
      );
      state.camera.updateProjectionMatrix();
      console.log(state.camera.position);

      if (state.camera.position.z === asteroidRef.current.position.x + 10) {
        console.log(state.camera.position);
      }
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
        <dodecahedronGeometry radius={5.65} detail={2} />
        <meshBasicMaterial map={asteroidMap} />
      </mesh>
      {props.hover || props.selected ? (
        <mesh ref={hoverRingRef}>
          <torusGeometry args={[3, 0.5, 23, 79]} />
          <meshPhysicalMaterial
            color="red"
            transparent
            opacity={props.selected ? 1 : 0.5}
            reflectivity={1}
            metalness={1}
            roughness={0.3}
          />
        </mesh>
      ) : (
        <></>
      )}
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
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMoveCamera = this.handleMoveCamera.bind(this);
  }
  handleHover() {
    if (this.state.hover) {
      const timeout = this.props.paused ? 0 : 700;
      console.log(timeout, "timeout");
      setTimeout(() => this.setState({ hover: false }), timeout);
    } else if (!this.state.hover) {
      this.setState({ hover: true });
    }
  }
  handleMoveCamera() {
    if (this.state.moveCamera === false) {
      this.setState({ moveCamera: true });
    } else if (this.state.moveCamera === true) {
      this.setState({ moveCamera: false });
    }
  }
  handleSelect(event) {
    console.log(this.state, "this state in handle select");
    if (this.state.selected) {
      this.setState({ selected: false, moveCamera: false });
    } else if (!this.state.selected) {
      if (!this.props.paused) {
        this.props.pauseOrPlay();
      }
      this.setState({ selected: true, hover: false, moveCamera: true });
    }
  }
  render() {
    return (
      <>
        <Asteroid
          handleHover={this.handleHover}
          hover={this.state.hover}
          selected={this.state.selected}
          handleSelect={this.handleSelect}
          paused={this.props.paused}
          moveCamera={this.state.moveCamera}
          handleMoveCamera={this.handleMoveCamera}
        />
      </>
    );
  }
}

export default AsteroidClass;
