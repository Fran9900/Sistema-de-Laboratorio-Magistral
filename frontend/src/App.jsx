import React, { useState } from 'react';
import Navbar from './components/common/Navbar.jsx';
import ScannerModal from './components/recepcion/ScannerModal.jsx';
import SideBySideView from './components/recepcion/SideBySideView.jsx';
import TalonarioModal from './components/recepcion/TalonarioModal.jsx';
import ColaPreparacion from './components/laboratorio/ColaPreparacion.jsx';
import RecetaViewer from './components/laboratorio/RecetaViewer.jsx';
import FinalizarPreparadoModal from './components/laboratorio/FinalizarPreparadoModal.jsx';
import BusquedaCliente from './components/cliente/BusquedaCliente.jsx';
import { PlusCircle, Search, ClipboardList, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('recepcion');
  const [scannerAbierto, setScannerAbierto] = useState(false);
  const [recetaActiva, setRecetaActiva] = useState(null);
  const [talonarioAbierto, setTalonarioAbierto] = useState(false);
  const [pedidoCreadoExito, setPedidoCreadoExito] = useState(null);
  const [recetaViewerData, setRecetaViewerData] = useState(null);
  const [pedidoAFinalizar, setPedidoAFinalizar] = useState(null);

  const handleRecetaProcesada = (datos) => {
    setRecetaActiva(datos);
  };

  const handlePedidoCreado = (data) => {
    setPedidoCreadoExito(data);
    setRecetaActiva(null);
    setTalonarioAbierto(true);
  };

  const handleVerReceta = (receta, pedido) => {
    setRecetaViewerData({ receta, pedido });
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

      <RecetaViewer
        isOpen={Boolean(recetaViewerData)}
        onClose={() => setRecetaViewerData(null)}
        receta={recetaViewerData?.receta}
        pedido={recetaViewerData?.pedido}
      />

      <FinalizarPreparadoModal
        isOpen={Boolean(pedidoAFinalizar)}
        onClose={() => setPedidoAFinalizar(null)}
        pedido={pedidoAFinalizar}
        onPreparadoFinalizado={() => setPedidoAFinalizar(null)}
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
                <button
                  type="button"
                  onClick={() => setScannerAbierto(true)}
                  className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-colors cursor-pointer text-left w-full"
                >
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 flex-shrink-0">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <span className="text-base font-medium text-slate-900">
                    Ingresar Nueva Receta
                  </span>
                </button>

                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-base font-medium text-slate-900">
                    Reglas Legales
                  </span>
                </div>

                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 flex-shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <span className="text-base font-medium text-slate-900">
                    Plazos de Entrega
                  </span>
                </div>
              </div>
            </section>
          )
        )}

        {activeTab === 'clientes' && (
          <BusquedaCliente />
        )}

        {activeTab === 'laboratorio' && (
          <ColaPreparacion
            onVerReceta={handleVerReceta}
            onFinalizarPreparado={(pedido) => setPedidoAFinalizar(pedido)}
          />
        )}
      </main>
    </div>
  );
}
