import React from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import AsteroidTexture from "../assets/textures/asteroid.png";
const Asteroid = () => {
  const asteroidMap = useLoader(TextureLoader, AsteroidTexture);

  return (
    <>
      <mesh position={[0, 0, 50]}>
        <dodecahedronGeometry radius={1} detail={2} />
        <meshBasicMaterial map={asteroidMap} />
      </mesh>
    </>
  );
};

export default Asteroid;
