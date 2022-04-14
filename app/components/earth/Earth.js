import React, { useRef } from "react";
import { connect } from "react-redux";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
// import { fetchAsteroids } from "../../store/asteroids";
import AsteroidClass from "../Asteroid";

const dummyData = [
  {
    id: "3313974",
    name: "(2006 BV39)",
    nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3313974",
    estimated_diameter: {
      meters: {
        estimated_diameter_max: 650,
      },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date_full: "2022-Jan-03 18:46",
        relative_velocity: {
          kilometers_per_second: "22.7391653876",
        },
        miss_distance: {
          kilometers: "11000000",
        },
        orbiting_body: "Earth",
      },
    ],
  },
  {
    id: "3366282",
    name: "(2007 BD)",
    nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3366282",
    estimated_diameter: {
      meters: {
        estimated_diameter_max: 500,
      },
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: [
      {
        close_approach_date_full: "2022-Jan-03 21:43",
        relative_velocity: {
          kilometers_per_second: "19.3262110391",
        },
        miss_distance: {
          kilometers: "2806034",
        },
        orbiting_body: "Earth",
      },
    ],
  },
];

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
      {props.asteroids.map((asteroid) => (
        <AsteroidClass
          key={asteroid.id}
          distance={asteroid.close_approach_data[0].miss_distance.kilometers}
          diameter={asteroid.estimated_diameter.meters.estimated_diameter_max}
          hazardous={asteroid.is_potentially_hazardous_asteroid}
          velocity={
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_second
          }
          paused={props.paused}
          pauseOrPlay={props.pauseOrPlay}
          focusCamera={props.focusCamera}
          updateCameraPosition={props.updateCameraPosition}
          cameraPosition={props.cameraPosition}
        />
      ))}
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

// const mapStateToProps = (state) => {
//   return {
//     asteroids: state.asteroids,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAsteroids: dispatch((date) => fetchAsteroids(date)),
//   };
// };

export default Earth;

// export default connect(mapStateToProps, mapDispatchToProps)(Earth);
