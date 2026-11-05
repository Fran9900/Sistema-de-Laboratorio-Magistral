import React from 'react';
import { ShieldCheck, Clock, X, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ModalesInformativosRecepcion({ modalActivo, onClose }) {
  if (!modalActivo) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {modalActivo === 'reglas' && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900">Normativa y Reglas Legales</h3>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-600">
                Todo pedido de preparado magistral ingresado en mostrador debe cumplir estrictamente con los siguientes requisitos reglamentarios:
              </p>
              
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Vigencia Máxima:</strong> La receta debe tener una fecha de emisión no mayor a 30 días corridos.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Identificación Profesional:</strong> Debe incluir la firma, sello y número de matrícula (MN / MP) legible del médico prescriptor.
                  </div>
                </li>
                <li className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Trazabilidad Legal:</strong> Debe contar con código de barras legible o identificador único digital.
                  </div>
                </li>
              </ul>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2 text-slate-700">
                <AlertCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>Si alguno de estos requisitos incumple, se debe presionar el botón <strong>Rechazar Receta</strong> en la vista de cotejo.</span>
              </div>
            </div>
          </>
        )}

        {modalActivo === 'plazos' && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900">Guía de Plazos de Entrega al Cliente</h3>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-600">
                El tiempo estimado de entrega se calcula automáticamente según la disponibilidad de materia prima e indicador de urgencia:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-2xs">
                  <span className="px-2 py-0.5 bg-slate-900 text-white font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">
                    24 HS
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <strong className="text-emerald-600 font-bold text-xs">Stock Disponible Local</strong>
                    </div>
                    <span className="text-slate-600 text-[11px] block leading-relaxed">
                      Si el laboratorio cuenta con la droga en inventario, el preparado estará listo en 24 horas hábiles.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-2xs">
                  <span className="px-2 py-0.5 bg-slate-900 text-white font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">
                    48 HS
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <strong className="text-amber-600 font-bold text-xs">Sin Stock / Pedido a Droguería</strong>
                    </div>
                    <span className="text-slate-600 text-[11px] block leading-relaxed">
                      Se genera un pedido automático de materia prima. El plazo se extiende a 48 horas.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-2xs">
                  <span className="px-2 py-0.5 bg-slate-900 text-white font-mono font-bold rounded text-[10px] shrink-0 mt-0.5">
                    0 HS
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <strong className="text-rose-600 font-bold text-xs">Urgencia Médica</strong>
                    </div>
                    <span className="text-slate-600 text-[11px] block leading-relaxed">
                      Al marcar el tilde de urgencia, pasa a prioridad alta en la cola de laboratorio para entrega el mismo día.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium text-xs shadow-2xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
