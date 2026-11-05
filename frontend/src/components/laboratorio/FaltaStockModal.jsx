import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Truck, 
  PackagePlus, 
  CheckCircle2, 
  Loader2, 
  ExternalLink
} from 'lucide-react';
import api from '../../services/api.js';
import { calcularGramosRequeridos } from '../../utils/calculoFarmaceutico.js';

export default function FaltaStockModal({ isOpen, onClose, pedido, onStockActualizado }) {
  const [cantidadIngreso, setCantidadIngreso] = useState('100');
  const [procesandoStock, setProcesandoStock] = useState(false);
  const [procesandoDrogueria, setProcesandoDrogueria] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);

  if (!isOpen || !pedido) return null;

  const drogaNombre = pedido.principioActivo?.nombre || pedido.principioActivoTexto || 'Droga no identificada';
  const principioActivoId = pedido.principioActivoId || pedido.principioActivo?.id;
  const stockActual = Number(pedido.principioActivo?.stockDisponible || 0);
  const gramosRequeridos = calcularGramosRequeridos(pedido.dosis, pedido.csp);

  const solicitudes = pedido.solicitudesDrogueria || [];
  const solicitudActiva = solicitudes.length > 0 ? solicitudes[solicitudes.length - 1] : null;

  const handleSolicitarDrogueria = async () => {
    setErrorLocal(null);
    setProcesandoDrogueria(true);
    try {
      await api.post(`/pedidos/${pedido.id}/drogueria`);
      setMensajeExito('Solicitud a Droguería enviada exitosamente.');
      if (onStockActualizado) {
        await onStockActualizado();
      }
    } catch (err) {
      setErrorLocal('No se pudo emitir la orden a droguería: ' + (err.response?.data?.error || err.message));
    } finally {
      setProcesandoDrogueria(false);
    }
  };

  const handleReabastecerStock = async (e) => {
    e.preventDefault();
    setErrorLocal(null);
    setMensajeExito(null);

    const cantidadNum = parseFloat(cantidadIngreso);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setErrorLocal('Ingrese una cantidad válida mayor a 0.');
      return;
    }

    setProcesandoStock(true);
    try {
      let targetId = principioActivoId;
      if (!targetId) {
        const resCat = await api.get('/principiosActivos');
        const lista = Array.isArray(resCat.data) ? resCat.data : [];
        const nombrePuro = drogaNombre.replace(/(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/gi, '').trim();
        const match = lista.find(p => p.nombre?.toLowerCase().includes(nombrePuro.toLowerCase()) || nombrePuro.toLowerCase().includes(p.nombre?.toLowerCase()));
        if (match) {
          targetId = match.id;
        } else {
          const resCrear = await api.post('/principiosActivos', {
            nombre: nombrePuro,
            stockDisponible: 0
          });
          targetId = resCrear.data?.principioActivo?.id;
        }
      }

      if (!targetId) {
        setErrorLocal('Este pedido no tiene un principio activo registrado en catálogo.');
        return;
      }

      await api.put(`/principiosActivos/${targetId}`, {
        cantidad: cantidadNum,
        incrementar: true
      });

      setMensajeExito(`Stock de ${drogaNombre} reabastecido (+${cantidadNum} g). Preparación habilitada.`);
      setTimeout(async () => {
        if (onStockActualizado) {
          await onStockActualizado(pedido.id);
        }
        onClose();
      }, 900);
    } catch (err) {
      setErrorLocal('Error al actualizar inventario: ' + (err.response?.data?.error || err.message));
    } finally {
      setProcesandoStock(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Falta de Stock de Materia Prima
              </h3>
              <p className="text-xs text-slate-500">
                Orden #{pedido.id} - {drogaNombre}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700">
          {errorLocal && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-medium">
              {errorLocal}
            </div>
          )}

          {mensajeExito && (
            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{mensajeExito}</span>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span>Paciente:</span>
              <span className="font-semibold text-slate-900">{pedido.nombreCliente}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span>Principio Activo Requerido:</span>
              <span className="font-bold text-slate-900">{drogaNombre}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span>Dosis / C.S.P.:</span>
              <span className="text-slate-800">{pedido.dosis} (C.S.P. {pedido.csp})</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 font-medium">
              <span>Materia Prima Requerida:</span>
              <span className="font-bold text-slate-900">{gramosRequeridos} g</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 font-medium pt-1.5 border-t border-slate-100">
              <span>Stock Físico en Farmacia:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                {stockActual} g disponibles (Mínimo: {gramosRequeridos} g)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Truck className="w-4 h-4 text-slate-800" />
              <span>1. Pedido a Droguería Central (RN-08)</span>
            </div>

            {solicitudActiva ? (
              <div className="space-y-1.5 text-slate-700">
                <p className="text-slate-600">
                  Existe una orden automática registrada para este pedido.
                </p>
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Solicitud #{solicitudActiva.id}</span>
                    <p className="font-semibold text-slate-900">{solicitudActiva.cantidadSolicitada || pedido.csp}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                    {solicitudActiva.estadoSolicitud === 'confirmado_drogueria' ? 'Recibido' : 'Pendiente de entrega'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-1">
                <p className="text-slate-600">
                  No se ha registrado solicitud automática a droguería.
                </p>
                <button
                  type="button"
                  onClick={handleSolicitarDrogueria}
                  disabled={procesandoDrogueria}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {procesandoDrogueria ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>Pedir a Droguería</span>
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleReabastecerStock} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <PackagePlus className="w-4 h-4 text-slate-800" />
              <span>2. Registrar Arribo de Droguería / Reabastecer Stock</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Si la droguería ya entregó la materia prima en mostrador, ingresá la cantidad recibida para cargar el inventario y habilitar inmediatamente la mesa de laboratorio:
            </p>

            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={cantidadIngreso}
                  onChange={(e) => setCantidadIngreso(e.target.value)}
                  placeholder="Ej: 100"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 font-medium text-[11px]">gramos (g)</span>
              </div>

              <button
                type="submit"
                disabled={procesandoStock}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors inline-flex items-center gap-2 disabled:opacity-50 whitespace-nowrap cursor-pointer"
              >
                {procesandoStock ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>Confirmar</span>
              </button>
            </div>
          </form>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors text-xs shadow-2xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
