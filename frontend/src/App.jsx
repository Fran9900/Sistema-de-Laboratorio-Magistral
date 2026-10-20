import React, { useState } from 'react';
import Navbar from './components/common/Navbar.jsx';
import ScannerModal from './components/recepcion/ScannerModal.jsx';
import SideBySideView from './components/recepcion/SideBySideView.jsx';
import TalonarioModal from './components/recepcion/TalonarioModal.jsx';
import { PlusCircle, Search, ClipboardList, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('recepcion');
  const [scannerAbierto, setScannerAbierto] = useState(false);
  const [recetaActiva, setRecetaActiva] = useState(null);
  const [talonarioAbierto, setTalonarioAbierto] = useState(false);
  const [pedidoCreadoExito, setPedidoCreadoExito] = useState(null);

  const handleRecetaProcesada = (datos) => {
    setRecetaActiva(datos);
  };

  const handlePedidoCreado = (data) => {
    setPedidoCreadoExito(data);
    setRecetaActiva(null);
    setTalonarioAbierto(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ScannerModal
        isOpen={scannerAbierto}
        onClose={() => setScannerAbierto(false)}
        onRecetaProcesada={handleRecetaProcesada}
      />

      <TalonarioModal
        isOpen={talonarioAbierto}
        onClose={() => setTalonarioAbierto(false)}
        pedidoData={pedidoCreadoExito}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-8 py-8">
        {activeTab === 'recepcion' && (
          recetaActiva ? (
            <SideBySideView
              recetaData={recetaActiva}
              onVolver={() => setRecetaActiva(null)}
              onPedidoCreado={handlePedidoCreado}
            />
          ) : (
            <section className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  Modulo de Recepcion y Mostrador
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Ingreso de recetas medicas, extraccion de datos y registro inicial de pedidos.
                </p>
              </div>

              {pedidoCreadoExito && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="space-y-1">
                    <p className="font-semibold text-emerald-900">
                      Pedido registrado con exito: Codigo PIN {pedidoCreadoExito.pedido?.pinControl}
                    </p>
                    <p>
                      Cliente: {pedidoCreadoExito.pedido?.nombreCliente} - Plazo de retiro: {new Date(pedidoCreadoExito.pedido?.diaHoraRetiro).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPedidoCreadoExito(null)}
                    className="px-3 py-1 bg-white border border-emerald-200 rounded-lg text-emerald-800 font-medium hover:bg-emerald-100 transition-colors"
                  >
                    Cerrar aviso
                  </button>
                </div>
              )}

            <div className="grid grid-cols-3 gap-6">
              <div
                onClick={() => setScannerAbierto(true)}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors cursor-pointer"
              >
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
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-900">
                  Abrir escaner
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
        )
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
