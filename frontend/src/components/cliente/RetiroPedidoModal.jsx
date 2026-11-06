import React, { useState } from 'react';
import { 
  PackageCheck, 
  KeyRound, 
  X, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  FileText, 
  Clock 
} from 'lucide-react';
import api from '../../services/api.js';

export default function RetiroPedidoModal({ isOpen, onClose, pedido, onPedidoEntregado }) {
  const [pinIngresado, setPinIngresado] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const pagoValidado = pedido?.pago?.estadoPago === 'validado';

  if (!isOpen || !pedido) return null;

  const handleConfirmarEntrega = async (e) => {
    e.preventDefault();
    if (!pinIngresado.trim()) {
      setErrorLocal('Debe ingresar el PIN de 4 digitos del cliente.');
      return;
    }

    setCargando(true);
    setErrorLocal(null);

    try {
      const response = await api.post(`/pedidos/${pedido.id}/entregar`, {
        pinIngresado: pinIngresado.trim()
      });

      const pedidoActualizado = response.data?.pedido || { ...pedido, estadoPedido: 'entregado' };
      setPinIngresado('');
      onPedidoEntregado(pedidoActualizado);
      onClose();
    } catch (err) {
      setErrorLocal(err.response?.data?.error || 'Error al validar PIN y entregar preparado.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Entrega de Preparado Magistral
              </h3>
              <p className="text-xs text-slate-500">
                Validacion de talonario de control
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500">Paciente / Cliente:</span>
            <span className="font-semibold text-slate-900">{pedido.nombreCliente}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500">DNI:</span>
            <span>{pedido.dniCliente || 'No registrado'}</span>
          </div>
          <div className="flex justify-between items-center text-slate-700">
            <span className="text-slate-500">Formula:</span>
            <span className="font-medium text-slate-900">{pedido.principioActivo?.nombre || pedido.principioActivoTexto || 'Personalizada'}</span>
          </div>
          {pedido.numeroPreparado && (
            <div className="flex justify-between items-center text-slate-700">
              <span className="text-slate-500">N° de Preparado Interno:</span>
              <span className="font-mono font-semibold text-slate-900">{pedido.numeroPreparado}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-slate-700 pt-1 border-t border-slate-200">
            <span className="text-slate-500">Estado Actual:</span>
            <span className="font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] uppercase">
              {pedido.estadoPedido}
            </span>
          </div>
        </div>

        {!pagoValidado && (
          <div role="alert" className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2.5 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Pago Pendiente: Este preparado no puede ser retirado hasta que se registre y acredite el cobro.</span>
          </div>
        )}

        {errorLocal && (
          <div role="alert" className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorLocal}</span>
          </div>
        )}

        <form onSubmit={handleConfirmarEntrega} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ingrese el PIN de Control del Talonario (4 digitos)
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={4}
                autoFocus
                value={pinIngresado}
                onChange={(e) => setPinIngresado(e.target.value.replace(/\D/g, ''))}
                placeholder="0000"
                className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 text-center">
              Solicite el comprobante o talonario fisico/digital al cliente.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando || pinIngresado.trim().length !== 4 || !pagoValidado}
              className="px-5 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {cargando ? <Loader2 className="w-4 h-4 animate-spin" /> : <PackageCheck className="w-4 h-4" />}
              <span>Validar PIN y Entregar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
