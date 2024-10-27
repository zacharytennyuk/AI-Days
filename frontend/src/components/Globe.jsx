// SpinningModelWithMaterial.js
import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

function ModelWithMaterial() {
  const mtlUrl = "/globe2.mtl";
  const objUrl = "/globe2.obj";
  // Load materials with MTLLoader
  const materials = useLoader(MTLLoader, mtlUrl);

  // Load object with OBJLoader, applying the materials
  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={ref} object={obj} scale={0.5} />; // Adjust scale as needed
}

export default function SpinningModelWithMaterial() {
  return (
    <Canvas camera={{ position: [0, 0, 110] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ModelWithMaterial
        objUrl="/path/to/your/model.obj" // Replace with the path to your .obj file
        mtlUrl="/path/to/your/materials.mtl" // Replace with the path to your .mtl file
      />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
