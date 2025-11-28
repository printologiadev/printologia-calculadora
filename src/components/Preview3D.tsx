'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface Preview3DProps {
  frontTexture?: string
  backTexture?: string
  sleeveTexture?: string
}

function ShirtModel({ frontTexture, backTexture, sleeveTexture }: Preview3DProps) {
  const { nodes, materials } = useGLTF('/models/shirt_placeholder.glb')

  // Cargar texturas si se proporcionan
  const frontTex = useTexture(frontTexture || '')
  const backTex = useTexture(backTexture || '')
  const sleeveTex = useTexture(sleeveTexture || '')

  // Clonar materiales para evitar conflictos
  const clonedMaterials = useRef<Record<string, THREE.Material>>({})

  // Asumiendo que el modelo tiene nodos nombrados como 'Front_Part', 'Back_Part', 'Sleeves_Part'
  // Ajustar según el modelo real
  if (nodes.Front_Part && materials.Front_Part) {
    if (!clonedMaterials.current.Front_Part) {
      clonedMaterials.current.Front_Part = (materials.Front_Part as THREE.MeshStandardMaterial).clone()
    }
    if (frontTexture) {
      (clonedMaterials.current.Front_Part as THREE.MeshStandardMaterial).map = frontTex
      clonedMaterials.current.Front_Part.needsUpdate = true
    }
  }

  if (nodes.Back_Part && materials.Back_Part) {
    if (!clonedMaterials.current.Back_Part) {
      clonedMaterials.current.Back_Part = (materials.Back_Part as THREE.MeshStandardMaterial).clone()
    }
    if (backTexture) {
      (clonedMaterials.current.Back_Part as THREE.MeshStandardMaterial).map = backTex
      clonedMaterials.current.Back_Part.needsUpdate = true
    }
  }

  if (nodes.Sleeves_Part && materials.Sleeves_Part) {
    if (!clonedMaterials.current.Sleeves_Part) {
      clonedMaterials.current.Sleeves_Part = (materials.Sleeves_Part as THREE.MeshStandardMaterial).clone()
    }
    if (sleeveTexture) {
      (clonedMaterials.current.Sleeves_Part as THREE.MeshStandardMaterial).map = sleeveTex
      clonedMaterials.current.Sleeves_Part.needsUpdate = true
    }
  }

  return (
    <group>
      {/* Renderizar las mallas con materiales clonados */}
      {Object.entries(nodes).map(([name, node]) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh
          const material = clonedMaterials.current[name] || mesh.material
          return (
            <mesh key={name} geometry={mesh.geometry} material={material} />
          )
        }
        return null
      })}
    </group>
  )
}

export default function Preview3D({ frontTexture, backTexture, sleeveTexture }: Preview3DProps) {
  return (
    <div className="aspect-square w-full bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ShirtModel
          frontTexture={frontTexture}
          backTexture={backTexture}
          sleeveTexture={sleeveTexture}
        />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

// Precargar el modelo GLTF
useGLTF.preload('/models/shirt_placeholder.glb')