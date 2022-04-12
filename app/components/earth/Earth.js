import React, { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";
import { useLoader } from "@react-three/fiber";

export function Earth() {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );
  const earthRef = useRef();
  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 2, 2]} intensity={1.2} />
      <Stars radius={300} depth={60} count={10000} factor={7} fade={true} />
      <mesh>
        <sphereGeometry args={[2.005, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.0}
          roughness={0}
        />
        <OrbitControls enableZoom={true} />
      </mesh>
    </>
  );
}
