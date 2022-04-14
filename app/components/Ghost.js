import React, { useRef } from "react";

const Ghost = () => {
  const ghostRef = useRef();

  return (
    <>
      <mesh ref={ghostRef}>
        <sphereGeometry args={[5, 1, 1]} />
        <meshBasicMaterial color="blue" transparent opacity={0.5} />
      </mesh>
    </>
  );
};

export default Ghost;
