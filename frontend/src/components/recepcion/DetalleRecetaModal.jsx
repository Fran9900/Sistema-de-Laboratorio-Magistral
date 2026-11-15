import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  UserCheck, 
  Barcode, 
  AlertTriangle,
  User,
  Phone,
  CreditCard,
  Clock,
  FlaskConical,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

export default function ModalDetalleReceta({ receta, onClose }) {
  if (!receta) return null;

  const urlImagen = receta.imagenUrl
    ? (receta.imagenUrl.startsWith('http') 
        ? receta.imagenUrl 
        : (receta.imagenUrl.startsWith('/') ? receta.imagenUrl : `/${receta.imagenUrl}`))
    : null;

  const pedido = receta.pedido;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Auditoría Integral de Ingreso — Receta #{receta.id}
              </h3>
              <p className="text-xs text-slate-500">
                Trazabilidad completa: prescripción médica, paciente y orden de laboratorio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-xs text-slate-700">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col items-center justify-center min-h-[360px] max-h-[500px] overflow-hidden">
            {urlImagen ? (
              <img
                src={urlImagen}
                alt={`Receta médica #${receta.id}`}
                className="max-h-[460px] w-auto object-contain rounded-lg shadow-2xs"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement.querySelector('.img-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`img-fallback text-center py-12 px-4 text-slate-400 ${urlImagen ? 'hidden' : 'flex'} flex-col items-center justify-center`}>
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">Sin previsualización de imagen</p>
              <p className="text-[11px] mt-1 text-slate-400">Documento cargado sin archivo adjunto directo</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-xl border flex items-center justify-between" style={{
              backgroundColor: receta.esValida ? '#f0fdf4' : '#fef2f2',
              borderColor: receta.esValida ? '#bbf7d0' : '#fecaca'
            }}>
              <span className="font-semibold text-slate-800">Dictamen Legal Sanitario:</span>
              {receta.esValida ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Válida (RN-01 Conforme)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-rose-100 text-rose-800">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Rechazada
                </span>
              )}
            </div>

            {!receta.esValida && receta.motivoRechazo && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1 text-rose-900">
                <div className="font-semibold flex items-center gap-1.5 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Motivo Reglamentario de Desestimación:
                </div>
                <p className="text-rose-700 pl-5 leading-relaxed">
                  {receta.motivoRechazo}
                </p>
              </div>
            )}

            {pedido && (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block pb-1 border-b border-slate-200/60">
                  Datos del Paciente
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Paciente:</span>
                    <span className="font-semibold text-slate-900">{pedido.nombreCliente || 'S/D'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">DNI:</span>
                    <span>{pedido.dniCliente || 'No informado'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Teléfono de contacto:</span>
                    <span>{pedido.telefonoCliente || 'No registrado'}</span>
                  </div>
                </div>
              </div>
            )}

            {pedido && (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block pb-1 border-b border-slate-200/60">
                  Fórmula Magistral y Elaboración
                </span>
                <div className="space-y-1.5 text-slate-700">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Principio Activo:</span>
                    <span className="font-semibold text-slate-900">
                      {pedido.principioActivo?.nombre || pedido.principioActivoTexto || 'Fórmula magistral'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Dosis: <strong className="text-slate-800">{pedido.dosis}</strong></span>
                    <span>CSP: <strong className="text-slate-800">{pedido.csp}</strong></span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200/40">
                    <span>Precio: <strong className="text-slate-900">${pedido.precio ? Number(pedido.precio).toFixed(2) : '0.00'}</strong></span>
                    <span className="uppercase font-semibold text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {pedido.estadoPedido}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {pedido && (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block pb-1 border-b border-slate-200/60">
                  Plazos y Control de Retiro
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">PIN de Retiro:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-200 text-slate-900 tracking-wider">
                      {pedido.pinControl || '----'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Prioridad:</span>
                    <span className={`font-semibold ${pedido.urgente ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                      {pedido.urgente ? 'URGENTE' : 'Normal'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Fecha Prometida de Retiro:</span>
                    <span className="font-medium text-slate-800">
                      {pedido.diaHoraRetiro ? new Date(pedido.diaHoraRetiro).toLocaleString('es-AR') : 'No asignada'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 text-slate-700">
              <span className="font-bold text-slate-900 block pb-1 border-b border-slate-200/60">
                Datos de la Prescripción Médica
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Fecha de Emisión:</span>
                <span className="font-semibold font-mono text-slate-900">
                  {receta.fechaEmision || 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Matrícula Médico:</span>
                <span className="font-medium text-slate-800">
                  {receta.matriculaMedico || 'Sin datos (S/D)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Código de Barras:</span>
                <span className="font-mono text-slate-600">
                  {receta.codigoBarras || 'N/A'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
              <span>Registrado el: {new Date(receta.createdAt).toLocaleString('es-AR')}</span>
              <span>Receta #{receta.id} {pedido ? `• Pedido #${pedido.id}` : ''}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
}
