import React, { useState } from "react";
import Navbar from "./components/common/Navbar.jsx";
import ScannerModal from "./components/recepcion/ScannerModal.jsx";
import SideBySideView from "./components/recepcion/SideBySideView.jsx";
import TalonarioModal from "./components/recepcion/TalonarioModal.jsx";
import ColaPreparacion from "./components/laboratorio/ColaPreparacion.jsx";
import RecetaViewer from "./components/laboratorio/RecetaViewer.jsx";
import FinalizarPreparadoModal from "./components/laboratorio/FinalizarPreparadoModal.jsx";
import BusquedaCliente from "./components/cliente/BusquedaCliente.jsx";
import { PlusCircle, Search, ClipboardList, ShieldCheck } from "lucide-react";
import HistorialRecetas from "./components/recepcion/HistorialRecetas.jsx";
import ModalDetalleReceta from "./components/recepcion/DetalleRecetaModal.jsx";
import ModalesInformativosRecepcion from "./components/recepcion/ModalesInformativos.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("recepcion");
  const [scannerAbierto, setScannerAbierto] = useState(false);
  const [recetaActiva, setRecetaActiva] = useState(null);
  const [talonarioAbierto, setTalonarioAbierto] = useState(false);
  const [pedidoCreadoExito, setPedidoCreadoExito] = useState(null);
  const [recetaViewerData, setRecetaViewerData] = useState(null);
  const [pedidoAFinalizar, setPedidoAFinalizar] = useState(null);
  const [modalInformativo, setModalInformativo] = useState(null);

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

  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);

  const handleVerRecetaDetalle = (receta) => {
    setRecetaSeleccionada(receta);
  };

  const handleCerrarModal = () => {
    setRecetaSeleccionada(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
        {activeTab === "recepcion" &&
          (recetaActiva ? (
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
                      Pedido registrado con exito: Codigo PIN{" "}
                      {pedidoCreadoExito.pedido?.pinControl}
                    </p>
                    <p>
                      Cliente: {pedidoCreadoExito.pedido?.nombreCliente} - Plazo
                      de retiro:{" "}
                      {new Date(
                        pedidoCreadoExito.pedido?.diaHoraRetiro,
                      ).toLocaleString()}
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
                  onClick={() => setScannerAbierto(true)}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="p-2 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-xl transition-colors">
                    <PlusCircle className="w-5 h-5 text-slate-700 group-hover:text-white" />
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">
                    Ingresar Nueva Receta
                  </span>
                </button>

                <button
                  onClick={() => setModalInformativo("reglas")}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="p-2 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-xl transition-colors">
                    <ShieldCheck className="w-5 h-5 text-slate-700 group-hover:text-white" />
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">
                    Reglas Legales
                  </span>
                </button>

                <button
                  onClick={() => setModalInformativo("plazos")}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="p-2 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white rounded-xl transition-colors">
                    <ClipboardList className="w-5 h-5 text-slate-700 group-hover:text-white" />
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">
                    Plazos de Entrega
                  </span>
                </button>
              </div>

              <HistorialRecetas onVerReceta={handleVerRecetaDetalle} />
              {recetaSeleccionada && (
                <ModalDetalleReceta
                  receta={recetaSeleccionada}
                  onClose={handleCerrarModal}
                />
              )}
            </section>
          ))}
        <ModalesInformativosRecepcion
          modalActivo={modalInformativo}
          onClose={() => setModalInformativo(null)}
        />

        {activeTab === "clientes" && <BusquedaCliente />}

        {activeTab === "laboratorio" && (
          <ColaPreparacion
            onVerReceta={handleVerReceta}
            onFinalizarPreparado={(pedido) => setPedidoAFinalizar(pedido)}
          />
        )}
      </main>
    </div>
  );
}