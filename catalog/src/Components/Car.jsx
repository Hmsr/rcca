import { useState } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import car from '../Components/car.stl'

function CarCar() {
  const [position, setPosition] = useState([0, 0, 0])
  const [rotation, setRotation] = useState([0, 0, 0])
  const [color, setColor] = useState([1, 0, 1])
  const geometry = useLoader(STLLoader, car)

  useFrame((state, delta) => {
    setPosition(position => [
      Math.sin(state.clock.getElapsedTime()) * 2,
      Math.cos(state.clock.getElapsedTime() * 2) * 2,
      Math.sin(state.clock.getElapsedTime() * 2) * 2
    ])
    setRotation(rotation => [
      rotation[0] + delta * 2,
      rotation[1] + delta * 3,
      rotation[2] + delta * 4
    ])
    setColor(color => [
      (Math.sin(state.clock.getElapsedTime() / 2) + 1) / 2,
      (Math.cos(state.clock.getElapsedTime() / 2) + 1) / 2,
      (Math.sin(state.clock.getElapsedTime() / 2 + Math.PI / 2) + 1) / 2
    ])
  })

  return (
    <mesh scale={[0.02, 0.02, 0.02]} position={position} rotation={rotation}>
      <bufferGeometry attach="geometry" {...geometry} />
      <meshStandardMaterial color={color} />
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
