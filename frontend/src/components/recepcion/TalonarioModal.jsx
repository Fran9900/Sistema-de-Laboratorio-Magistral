import React from 'react';
import { 
  Printer, 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Phone, 
  User, 
  ShieldCheck 
} from 'lucide-react';

export default function TalonarioModal({ isOpen, onClose, pedidoData }) {
  if (!isOpen || !pedidoData) return null;

  const pedido = pedidoData.pedido || pedidoData;
  const droga = pedidoData.droga || pedido.principioActivo || {};
  const fechaRetiro = pedido.diaHoraRetiro ? new Date(pedido.diaHoraRetiro) : new Date();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="talonario-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="talonario-modal-title" className="text-base font-semibold text-slate-900 tracking-tight">
                Talonario de Control y Retiro
              </h3>
              <p className="text-xs text-slate-500">
                Comprobante para el cliente
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar talonario"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="bg-white rounded-xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                PIN de Control y Retiro
              </span>
              <div className="text-5xl font-mono font-extrabold tracking-widest text-slate-950 my-2 select-all">
                {pedido.pinControl || '0000'}
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Presente este codigo de 4 digitos al momento de retirar su formulacion magistral en mostrador.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Fecha y Hora de Retiro</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {fechaRetiro.toLocaleDateString()}
              </div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">
                {fechaRetiro.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hs
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Prioridad / Estado</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {pedido.urgente ? 'Urgencia Medica' : 'Plazo Estandar'}
              </div>
              <div className="text-xs font-medium text-emerald-700 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{pedido.estadoPedido || 'ingresado'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
            <div className="font-semibold text-slate-900 pb-1.5 border-b border-slate-100 flex items-center justify-between">
              <span>Detalles del Preparado</span>
              <span className="font-mono text-slate-500">Orden #{pedido.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Titular:</span>
              <span className="font-medium text-slate-900">{pedido.nombreCliente}</span>
            </div>

            {pedido.dniCliente && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">DNI:</span>
                <span className="font-medium text-slate-900">{pedido.dniCliente}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Telefono:</span>
              <span className="font-medium text-slate-900">{pedido.telefonoCliente}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Principio Activo:</span>
              <span className="font-medium text-slate-900">{droga.nombre || pedido.principioActivoTexto || 'Formula Magistral'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Dosis / Presentacion:</span>
              <span className="font-medium text-slate-900">{pedido.dosis} - C.S.P. {pedido.csp}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-semibold text-slate-900">
              <span>Importe Estimado:</span>
              <span>${Number(pedido.precio || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-[11px] text-amber-800 leading-relaxed">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
            <span>
              Conservar este talonario. El farmaceutico solicitara el PIN de control obligatorio al momento de la entrega en cumplimiento de las normas de seguridad del laboratorio.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Comprobante</span>
          </button>
        </div>
      </div>
    </div>
  );
}
