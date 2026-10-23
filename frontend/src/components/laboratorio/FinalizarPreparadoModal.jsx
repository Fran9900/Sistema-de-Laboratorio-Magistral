import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  FlaskConical, 
  AlertCircle, 
  BookOpen, 
  User, 
  Loader2 
} from 'lucide-react';
import api from '../../services/api.js';

export default function FinalizarPreparadoModal({ isOpen, onClose, pedido, onPreparadoFinalizado }) {
  const [numeroPreparado, setNumeroPreparado] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);

  if (!isOpen || !pedido) return null;

  const handleCerrar = () => {
    if (guardando) return;
    setNumeroPreparado('');
    setErrorLocal(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLocal(null);

    const numLimpio = String(numeroPreparado).trim();
    if (!numLimpio) {
      setErrorLocal('Ingrese el numero de preparado fisico del libro recetario.');
      return;
    }

    setGuardando(true);
    try {
      const response = await api.patch(`/pedidos/${pedido.id}/finalizar`, {
        numeroPreparado: numLimpio
      });

      if (onPreparadoFinalizado) {
        onPreparadoFinalizado(response.data?.pedido || { ...pedido, numeroPreparado: numLimpio, estadoPedido: 'listo_retiro' });
      }
      handleCerrar();
    } catch (err) {
      setErrorLocal('Error al registrar finalizacion: ' + (err.response?.data?.error || err.message));
    } finally {
      setGuardando(false);
    }
  };

  const droga = pedido.principioActivo?.nombre || 'Droga Magistral';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="finalizar-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 id="finalizar-modal-title" className="text-base font-semibold text-slate-900 tracking-tight">
                Cierre y Finalizacion de Preparado
              </h3>
              <p className="text-xs text-slate-500">
                Registro en libro recetario y habilitacion para retiro (RN-09 / ENC-03)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            disabled={guardando}
            aria-label="Cerrar ventana"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorLocal && (
            <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              <span>{errorLocal}</span>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2 text-xs">
            <div className="font-semibold text-slate-900 pb-1.5 border-b border-slate-200/60 flex items-center justify-between">
              <span>Datos de la Formula Elaborada</span>
              <span className="font-mono text-slate-500">Orden #{pedido.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Paciente:</span>
              <span className="font-medium text-slate-900">{pedido.nombreCliente}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Droga / Principio Activo:</span>
              <span className="font-medium text-slate-900">{droga}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Dosis / Presentacion:</span>
              <span className="font-medium text-slate-900">{pedido.dosis} - C.S.P. {pedido.csp}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>N° de Preparado Fisico (Libro Recetario) *</span>
            </label>
            <input
              type="text"
              value={numeroPreparado}
              onChange={(e) => setNumeroPreparado(e.target.value)}
              required
              placeholder="Ej. LP-2026-0842"
              className="w-full text-xs font-mono px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <p className="text-[11px] text-slate-500">
              Identificador unico asentado fisicamente en el libro oficial del laboratorio magistral (RN-09).
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-start gap-2.5 text-[11px] text-emerald-900 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700" />
            <span>
              Al confirmar, el pedido pasara al estado <strong>listo_retiro</strong> y quedara habilitado en mostrador para la entrega al cliente mediante validacion de PIN.
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCerrar}
              disabled={guardando}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando || !numeroPreparado.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {guardando ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Finalizando...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirmar Finalizacion</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
