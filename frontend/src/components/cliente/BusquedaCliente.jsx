import React, { useState } from "react";
import {
  Search,
  Phone,
  User,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  Save,
  Edit3,
  X,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  PackageCheck,
} from "lucide-react";
import api from "../../services/api.js";
import RetiroPedidoModal from "./RetiroPedidoModal.jsx";
import PagoModal from "./PagoModal.jsx";

export default function BusquedaCliente() {
  const [termino, setTermino] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [errorLocal, setErrorLocal] = useState(null);

  const [pedidoEditando, setPedidoEditando] = useState(null);
  const [telefonoNuevo, setTelefonoNuevo] = useState("");
  const [guardandoContacto, setGuardandoContacto] = useState(false);

  const [pedidoReclamo, setPedidoReclamo] = useState(null);
  const [motivoReclamo, setMotivoReclamo] = useState("");
  const [descripcionReclamo, setDescripcionReclamo] = useState("");
  const [guardandoReclamo, setGuardandoReclamo] = useState(false);

  const [pedidoRetiro, setPedidoRetiro] = useState(null);

  const [pedidoAPagar, setPedidoAPagar] = useState(null);

  const handlePagoExitoso = () => {
    setPedidoAPagar(null);
    handleBuscar();
  };

  const handleBuscar = async (e) => {
    if (e) e.preventDefault();
    if (!termino.trim()) return;

    setCargando(true);
    setErrorLocal(null);
    setMensajeExito(null);

    try {
      const response = await api.get(
        `/clientes/buscar?termino=${encodeURIComponent(termino.trim())}`,
      );
      setPedidos(Array.isArray(response.data) ? response.data : []);
      setBuscado(true);
    } catch (err) {
      setErrorLocal(
        err.response?.data?.error || "Error al realizar la busqueda.",
      );
      setPedidos([]);
    } finally {
      setCargando(false);
    }
  };

  const handleIniciarEdicionContacto = (pedido) => {
    setPedidoEditando(pedido);
    setTelefonoNuevo(pedido.telefonoCliente || "");
    setErrorLocal(null);
  };

  const handleGuardarContacto = async (e) => {
    e.preventDefault();
    if (!telefonoNuevo.trim()) {
      setErrorLocal("El telefono no puede quedar vacio.");
      return;
    }

    setGuardandoContacto(true);
    setErrorLocal(null);

    try {
      await api.patch(`/clientes/pedidos/${pedidoEditando.id}/contacto`, {
        telefonoCliente: telefonoNuevo.trim(),
      });

      setPedidos((prev) =>
        prev.map((p) => {
          if (p.id === pedidoEditando.id) {
            return { ...p, telefonoCliente: telefonoNuevo.trim() };
          }
          return p;
        }),
      );

      setMensajeExito("Telefono de contacto actualizado correctamente.");
      setPedidoEditando(null);
    } catch (err) {
      setErrorLocal(
        err.response?.data?.error || "Error al actualizar contacto.",
      );
    } finally {
      setGuardandoContacto(false);
    }
  };

  const handleAbrirReclamo = (pedido) => {
    setPedidoReclamo(pedido);
    setMotivoReclamo("");
    setDescripcionReclamo("");
    setErrorLocal(null);
  };

  const handleGuardarReclamo = async (e) => {
    e.preventDefault();
    if (!motivoReclamo.trim()) {
      setErrorLocal("El motivo del reclamo es obligatorio.");
      return;
    }

    setGuardandoReclamo(true);
    setErrorLocal(null);

    try {
      const response = await api.post(
        `/clientes/pedidos/${pedidoReclamo.id}/reclamos`,
        {
          motivo: motivoReclamo.trim(),
          descripcion: descripcionReclamo.trim(),
        },
      );

      const nuevo = response.data?.reclamo;

      setPedidos((prev) =>
        prev.map((p) => {
          if (p.id === pedidoReclamo.id) {
            const reclamosActuales = Array.isArray(p.reclamos)
              ? p.reclamos
              : [];
            return { ...p, reclamos: [nuevo, ...reclamosActuales] };
          }
          return p;
        }),
      );

      setMensajeExito("Reclamo registrado correctamente bajo estado abierto.");
      setPedidoReclamo(null);
    } catch (err) {
      setErrorLocal(
        err.response?.data?.error || "Error al registrar el reclamo.",
      );
    } finally {
      setGuardandoReclamo(false);
    }
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    return new Date(fechaStr).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBadgeEstado = (estado) => {
    switch (estado) {
      case "ingresado":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Ingresado
          </span>
        );
      case "pendiente_pago":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            Pendiente de Pago
          </span>
        );
      case "en_preparacion":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            En Preparacion
          </span>
        );
      case "listo_retiro":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Listo para Retiro
          </span>
        );
      case "entregado":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
            Entregado
          </span>
        );
      case "cancelado":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            Cancelado
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            {estado}
          </span>
        );
    }
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-medium text-slate-900">
              Panel de Atencion al Cliente
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Busqueda por DNI o PIN de control de 4 digitos
            </p>
          </div>
        </div>

        <form onSubmit={handleBuscar} className="flex items-center gap-3">
          <div className="relative w-72">
            <input
              type="text"
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
              placeholder="Ingrese DNI o PIN de control..."
              className="w-full px-3.5 py-2 pl-9 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={cargando || !termino.trim()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            {cargando ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>Buscar</span>
          </button>
        </form>
      </div>

      {mensajeExito && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{mensajeExito}</span>
          </div>
          <button
            type="button"
            onClick={() => setMensajeExito(null)}
            className="text-emerald-700 hover:text-emerald-900 font-medium"
          >
            Cerrar
          </button>
        </div>
      )}

      {errorLocal && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorLocal}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorLocal(null)}
            className="text-rose-700 hover:text-rose-900 font-medium"
          >
            Cerrar
          </button>
        </div>
      )}

      {buscado && pedidos.length === 0 && !cargando && (
        <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-800">
            No se encontraron pedidos asociados al termino ingresado.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Verifique que el DNI del cliente o el PIN de control de 4 digitos
            sean correctos.
          </p>
        </div>
      )}

      {pedidos.length > 0 && (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-mono text-base font-bold tracking-widest shadow-xs">
                    PIN: {pedido.pinControl}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-slate-900">
                        {pedido.nombreCliente}
                      </h3>
                      {getBadgeEstado(pedido.estadoPedido)}
                      {pedido.urgente && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                          Urgencia Medica
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span>DNI: {pedido.dniCliente || "No registrado"}</span>
                      <span>
                        Telefono: {pedido.telefonoCliente || "No registrado"}
                      </span>
                      {pedido.numeroPreparado && (
                        <span className="font-mono text-slate-700 font-medium">
                          N° Prep: {pedido.numeroPreparado}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {pedido.estadoPedido === "listo_retiro" && (
                    <button
                      type="button"
                      onClick={() => setPedidoRetiro(pedido)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <PackageCheck className="w-3.5 h-3.5" />
                      <span>Retirar Producto</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleIniciarEdicionContacto(pedido)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Actualizar Telefono</span>
                  </button>

                  {(!pedido.pago || pedido.pago.estadoPago !== "validado") ? (
                    <button
                      onClick={() => setPedidoAPagar(pedido.id)}
                      className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700"
                    >
                      Registrar Cobro
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Pago Acreditado
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleAbrirReclamo(pedido)}
                    className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
                    <span>Asentar Reclamo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">
                    Formula Magistral
                  </span>
                  <p className="text-slate-900 font-semibold">
                    {pedido.principioActivo?.nombre ||
                      pedido.principioActivoTexto ||
                      "Formula personalizada"}
                  </p>
                  <p className="text-slate-600">
                    Dosis: {pedido.dosis} | CSP: {pedido.csp}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">
                    Plazos y Horarios
                  </span>
                  <p className="text-slate-900">
                    <span className="font-medium text-slate-600">
                      Retiro prometido:
                    </span>{" "}
                    {formatearFecha(pedido.diaHoraRetiro)}
                  </p>
                  <p className="text-slate-600">
                    Ingresado: {formatearFecha(pedido.createdAt)}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <span className="text-slate-500 font-medium">
                    Estado de Cobro
                  </span>
                  <p className="text-slate-900 font-semibold">
                    ${pedido.precio ? Number(pedido.precio).toFixed(2) : "0.00"}
                  </p>
                  <p className="text-slate-600">
                    Medio: {pedido.pago?.metodoPago ? `${pedido.pago.metodoPago.toUpperCase()} (${pedido.pago.estadoPago})` : "Pendiente de pago"}
                  </p>
                </div>
              </div>

              {Array.isArray(pedido.reclamos) && pedido.reclamos.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Historial de Reclamos ({pedido.reclamos.length}):
                  </span>
                  <div className="space-y-2">
                    {pedido.reclamos.map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-amber-900">
                            {rec.motivo}
                          </span>
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium capitalize">
                            {rec.estado}
                          </span>
                        </div>
                        {rec.descripcion && (
                          <p className="text-amber-800">{rec.descripcion}</p>
                        )}
                        <span className="text-[10px] text-amber-600 block">
                          Registrado el: {formatearFecha(rec.createdAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {pedidoEditando && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">
                Actualizar Telefono de Contacto
              </h3>
              <button
                type="button"
                onClick={() => setPedidoEditando(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarContacto} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cliente:{" "}
                  <span className="font-semibold">
                    {pedidoEditando.nombreCliente}
                  </span>
                </label>
                <input
                  type="text"
                  value={telefonoNuevo}
                  onChange={(e) => setTelefonoNuevo(e.target.value)}
                  placeholder="Ej: 11-4567-8901"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPedidoEditando(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardandoContacto || !telefonoNuevo.trim()}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {guardandoContacto ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pedidoReclamo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-semibold text-slate-900">
                  Asentar Reclamo de Cliente
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPedidoReclamo(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarReclamo} className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                <p className="text-slate-700">
                  <span className="font-semibold">Cliente:</span>{" "}
                  {pedidoReclamo.nombreCliente}
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold">Codigo PIN:</span>{" "}
                  {pedidoReclamo.pinControl} |{" "}
                  <span className="font-semibold">Estado:</span>{" "}
                  {pedidoReclamo.estadoPedido}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Motivo Principal del Reclamo
                </label>
                <input
                  type="text"
                  value={motivoReclamo}
                  onChange={(e) => setMotivoReclamo(e.target.value)}
                  placeholder="Ej: Demora en la preparacion / Discrepancia en formula"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Descripcion Detallada del Reclamo
                </label>
                <textarea
                  rows="3"
                  value={descripcionReclamo}
                  onChange={(e) => setDescripcionReclamo(e.target.value)}
                  placeholder="Detalle los comentarios del cliente, horario de atencion y acciones solicitadas..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPedidoReclamo(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardandoReclamo || !motivoReclamo.trim()}
                  className="px-4 py-2 bg-rose-700 text-white rounded-lg text-xs font-semibold hover:bg-rose-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {guardandoReclamo ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Asentar Reclamo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pedidoAPagar && (
        <PagoModal
          pedidoId={pedidoAPagar}
          onClose={() => setPedidoAPagar(null)}
          onPagoExitoso={handlePagoExitoso}
        />
      )}

      <RetiroPedidoModal
        isOpen={Boolean(pedidoRetiro)}
        onClose={() => setPedidoRetiro(null)}
        pedido={pedidoRetiro}
        onPedidoEntregado={(pedidoActualizado) => {
          setPedidos((prev) =>
            prev.map((p) =>
              p.id === pedidoActualizado.id ? pedidoActualizado : p,
            ),
          );
          setMensajeExito(
            "Producto entregado con exito. Ciclo del preparado cerrado.",
          );
        }}
      />
    </section>
  );
}
