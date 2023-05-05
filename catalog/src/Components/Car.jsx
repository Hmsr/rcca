import { useState } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import car from '../Components/car.stl'

function CarCar() {
  const [rotation, setRotation] = useState(0)
  const geometry = useLoader(STLLoader, car)

  useFrame((state, delta) => {
    setRotation(rotation => rotation + delta * 0.5)
  })

  return (
    <mesh scale={[0.06, 0.06, 0.06]}  rotation={[rotation, rotation, 0]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CarCar />
    </Canvas>
  )
}
