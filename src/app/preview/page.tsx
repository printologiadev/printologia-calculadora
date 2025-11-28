'use client'

import { useState } from 'react'
import Preview3D from '@/components/Preview3D'

export default function PreviewPage() {
  const [frontTexture, setFrontTexture] = useState<string>('')
  const [backTexture, setBackTexture] = useState<string>('')
  const [sleeveTexture, setSleeveTexture] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setter(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Vista Previa 3D de Camiseta</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de controles */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Subir Diseños</h2>

              {/* Frente / Pecho */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frente / Pecho
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setFrontTexture)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Espalda */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Espalda
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setBackTexture)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>

              {/* Mangas */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mangas
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setSleeveTexture)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>
          </div>

          {/* Vista 3D */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Vista Previa 3D</h2>
              <Preview3D
                frontTexture={frontTexture}
                backTexture={backTexture}
                sleeveTexture={sleeveTexture}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}