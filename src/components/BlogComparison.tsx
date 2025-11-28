'use client';

import { CheckCircle, XCircle, ArrowRight, Phone, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

interface ComparisonItem {
  title: string;
  advantages: string[];
  idealFor: string[];
  limitations: string[];
  color: string;
  icon: string;
}

interface Factor {
  title: string;
  vinyl: string;
  canvas: string;
}

interface ProjectType {
  type: string;
  vinyl: string;
  canvas: string;
}

export default function BlogComparison() {
  const materials: ComparisonItem[] = [
    {
      title: "Vinil Adhesivo",
      advantages: [
        "Superficie lisa: Ideal para aplicaciones en vidrio, metal y superficies planas",
        "Fácil instalación: Se puede reposicionar durante la instalación",
        "Removible: Se puede quitar sin dañar la superficie",
        "Costo efectivo: Generalmente más económico para proyectos pequeños"
      ],
      idealFor: [
        "Rotulación de vehículos",
        "Señalización en vidrios",
        "Decoración de interiores",
        "Etiquetas y calcomanías"
      ],
      limitations: [
        "No recomendado para superficies irregulares",
        "Durabilidad limitada en exteriores (6-12 meses)"
      ],
      color: "from-blue-500 to-cyan-500",
      icon: "🎨"
    },
    {
      title: "Lona Frontal",
      advantages: [
        "Alta durabilidad: Resiste condiciones climáticas extremas",
        "Versatilidad: Se adapta a diferentes formas y tamaños",
        "Resistente al agua: Perfecta para exteriores",
        "Fácil transporte: Ligera y flexible"
      ],
      idealFor: [
        "Vallas publicitarias",
        "Banners para eventos",
        "Cobertura de andamios",
        "Displays para ferias"
      ],
      limitations: [
        "Requiere instalación profesional",
        "Costo más elevado",
        "No apto para superficies curvas"
      ],
      color: "from-violet-500 to-purple-500",
      icon: "🏢"
    }
  ];

  const factors: Factor[] = [
    { title: "Ubicación del proyecto", vinyl: "Interior", canvas: "Exterior" },
    { title: "Duración del proyecto", vinyl: "Temporal (meses)", canvas: "Permanente (años)" },
    { title: "Superficie de aplicación", vinyl: "Plana y lisa", canvas: "Irregular o texturizada" },
    { title: "Presupuesto disponible", vinyl: "Presupuesto limitado", canvas: "Inversión a largo plazo" }
  ];

  const projectTypes: ProjectType[] = [
    { type: "Fachadas de tiendas", vinyl: "", canvas: "Lona frontal para máxima visibilidad" },
    { type: "Rotulación de vehículos", vinyl: "Vinil adhesivo para flexibilidad", canvas: "" },
    { type: "Decoración de interiores", vinyl: "Vinil adhesivo para facilidad de instalación", canvas: "" },
    { type: "Banners temporales", vinyl: "Vinil adhesivo para proyectos cortos", canvas: "" },
    { type: "Backdrops", vinyl: "", canvas: "Lona frontal para mayor impacto visual" },
    { type: "Vallas de obra", vinyl: "", canvas: "Lona frontal resistente a la intemperie" },
    { type: "Señalización temporal", vinyl: "Vinil adhesivo removible", canvas: "" }
  ];

  return (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="text-center bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-2xl p-8 border border-violet-500/20">
        <h2 className="text-3xl font-bold text-white mb-4">
          Vinil Adhesivo vs Lona: ¿Cuál es Mejor para tu Proyecto?
        </h2>
        <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
          En Printología, recibimos diariamente esta pregunta: <strong className="text-white">"¿Debo usar vinil adhesivo o lona para mi proyecto?"</strong>.
          La respuesta depende de varios factores que analizaremos en detalle para ayudarte a tomar la mejor decisión.
        </p>
      </div>

      {/* Materials Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {materials.map((material, index) => (
          <div key={material.title} className="relative group">
            {/* Background gradient */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${material.color} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000`}></div>

            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{material.icon}</div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${material.color} bg-clip-text text-transparent`}>
                  {material.title}
                </h3>
              </div>

              {/* Advantages */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Ventajas
                </h4>
                <ul className="space-y-2">
                  {material.advantages.map((advantage, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Aplicaciones Ideales
                </h4>
                <ul className="space-y-2">
                  {material.idealFor.map((use, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Limitaciones
                </h4>
                <ul className="space-y-2">
                  {material.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decision Factors */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          ¿Cómo elegir el material correcto?
        </h3>
        <p className="text-zinc-300 text-center mb-8">
          Considera estos factores para tomar la mejor decisión:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factors.map((factor, index) => (
            <div key={index} className="bg-zinc-800/50 rounded-xl p-6 border border-white/5">
              <h4 className="text-lg font-semibold text-white mb-4">{factor.title}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <span className="text-blue-300 font-medium">Vinil Adhesivo:</span>
                  <span className="text-white">{factor.vinyl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <span className="text-violet-300 font-medium">Lona Frontal:</span>
                  <span className="text-white">{factor.canvas}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Recommendations */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Nuestras Recomendaciones por Tipo de Proyecto
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Projects */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Para Negocios Locales
            </h4>
            {projectTypes.slice(0, 3).map((project, index) => (
              <div key={index} className="bg-zinc-800/30 rounded-lg p-4 border border-white/5">
                <div className="font-medium text-white mb-2">{project.type}</div>
                {project.vinyl && (
                  <div className="text-sm text-blue-300 mb-1">
                    <span className="font-medium">Vinil:</span> {project.vinyl}
                  </div>
                )}
                {project.canvas && (
                  <div className="text-sm text-violet-300">
                    <span className="font-medium">Lona:</span> {project.canvas}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Event Projects */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-violet-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-400 rounded-full"></span>
              Para Eventos
            </h4>
            {projectTypes.slice(3, 5).map((project, index) => (
              <div key={index + 3} className="bg-zinc-800/30 rounded-lg p-4 border border-white/5">
                <div className="font-medium text-white mb-2">{project.type}</div>
                {project.vinyl && (
                  <div className="text-sm text-blue-300 mb-1">
                    <span className="font-medium">Vinil:</span> {project.vinyl}
                  </div>
                )}
                {project.canvas && (
                  <div className="text-sm text-violet-300">
                    <span className="font-medium">Lona:</span> {project.canvas}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Construction Projects */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Para Construcción
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.slice(5).map((project, index) => (
                <div key={index + 5} className="bg-zinc-800/30 rounded-lg p-4 border border-white/5">
                  <div className="font-medium text-white mb-2">{project.type}</div>
                  {project.vinyl && (
                    <div className="text-sm text-blue-300 mb-1">
                      <span className="font-medium">Vinil:</span> {project.vinyl}
                    </div>
                  )}
                  {project.canvas && (
                    <div className="text-sm text-violet-300">
                      <span className="font-medium">Lona:</span> {project.canvas}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-3xl p-8 border border-violet-500/30">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas Asesoría Personalizada?
          </h3>
          <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
            En Printología, nuestros expertos te ayudarán a elegir el material perfecto para tu proyecto específico.
            Consideramos no solo el tipo de material, sino también las condiciones ambientales del lugar,
            el mensaje que quieres comunicar, tu presupuesto disponible y los requisitos de instalación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="tel:+528143603610"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25"
            >
              <Phone className="w-5 h-5" />
              Llámanos: 81-4360-3610
            </Link>

            <Link
              href="/#contacto"
              className="flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/25"
            >
              <MapPin className="w-5 h-5" />
              Visita Nuestra Oficina
            </Link>
          </div>

          <p className="text-zinc-400 text-sm mt-6">
            Te ofrecemos consulta gratuita y presupuesto sin compromiso.
            <br />
            <strong className="text-white">En Printología, tu satisfacción es nuestra prioridad.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}