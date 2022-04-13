import React, { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls, Stars, Sky, GizmoHelper } from "@react-three/drei";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";
import AsteroidTexture from "../../assets/textures/asteroid.png";

import { useFrame, useLoader } from "@react-three/fiber";
import AsteroidClass from "../Asteroid";

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );
  const earthRef = useRef();
  const cloudsRef = useRef();
  useFrame(() => {
    if (!props.paused) {
      earthRef.current.rotation.y += 0.001;
      cloudsRef.current.rotation.y += 0.001;
    }
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight color="#f6f3ea" position={[2, 0, 100]} intensity={1.5} />
      <Stars radius={300} depth={10} count={10000} factor={7} fade />
      <AsteroidClass
        paused={props.paused}
        pauseOrPlay={props.pauseOrPlay}
        focusCamera={props.focusCamera}
      />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[20.005, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshPhongMaterial specularMap={specularMap} normalMap={normalMap} />
        <meshStandardMaterial map={colorMap} metalness={0.4} roughness={1} />
        <OrbitControls
          enableZoom={true}
          minDistance={50}
          maxDistance={500}
          zoomSpeed={0.5}
        />
      </mesh>
    </>
  );
}
