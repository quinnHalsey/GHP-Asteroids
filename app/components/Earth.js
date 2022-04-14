import React, { useRef } from "react";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import EarthCloudsMap from "../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../assets/textures/8k_earth_daymap.jpg";
import EarthSpecularMap from "../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../assets/textures/8k_earth_normal_map.jpg";

function Earth(props) {
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
      <Stars
        radius={1000}
        depth={50}
        count={5000}
        factor={7}
        fade={false}
        saturation={50}
      />
      {/* {props.asteroids.map((asteroid, idx) => (
        <AsteroidClass
          key={asteroid.id}
          asteroid={asteroid}
          // distance={asteroid.close_approach_data[0].miss_distance.kilometers}
          // diameter={asteroid.estimated_diameter.meters.estimated_diameter_max}
          // hazardous={asteroid.is_potentially_hazardous_asteroid}
          // velocity={
          //   asteroid.close_approach_data[0].relative_velocity
          //     .kilometers_per_hour
          // }
          paused={props.paused}
          pauseOrPlay={props.pauseOrPlay}
          focusCamera={props.focusCamera}
          updateCameraPosition={props.updateCameraPosition}
          cameraPosition={props.cameraPosition}
        />
      ))} */}
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
          // onChange={} //TO DO: update state on change; do something with the camera panning?
          enableZoom={true}
          minDistance={50}
          maxDistance={500}
          zoomSpeed={0.5}
        />
      </mesh>
    </>
  );
}

export default Earth;
