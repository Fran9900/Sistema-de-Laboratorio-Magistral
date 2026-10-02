import React, { useState } from 'react';
import Navbar from './components/common/Navbar.jsx';
import { PlusCircle, Search, ClipboardList, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('recepcion');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-8">
        {activeTab === 'recepcion' && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Modulo de Recepcion y Mostrador
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ingreso de recetas medicas, extraccion de datos y registro inicial de pedidos.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-medium text-slate-900">
                    Ingresar Nueva Receta
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Escanear o cargar fotografia de la prescripcion para verificacion legal y extraccion de formula.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-medium text-slate-900">
                    Reglas Legales
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Validacion automatica de vigencia menor a 30 dias, formato digital y matricula medica registrada.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-medium text-slate-900">
                    Plazos de Entrega
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Calculo de 24 horas con stock, 48 horas sin stock o entrega inmediata en casos urgentes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'clientes' && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Modulo de Clientes y Pagos
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Consulta de estado de pedidos, validacion de talonario mediante PIN de 4 digitos y cobros.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm text-center max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-slate-900">
                Panel de Atencion al Cliente
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Busqueda rapida por DNI o PIN de control, registro de pagos en efectivo o transferencia y entrega fisica de preparados.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'laboratorio' && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Modulo de Laboratorio y Quimico
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Cola de trabajo para elaboracion de preparados, revision de formulas y gestion de stock.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm text-center max-w-xl mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-slate-900">
                Cola de Preparacion Magistral
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Visualizacion de pedidos en espera de produccion priorizados por urgencia y tiempo limite, con visor de receta original y asignacion de numero de preparado fisico.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
