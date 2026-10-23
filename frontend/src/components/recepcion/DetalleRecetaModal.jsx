import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  UserCheck, 
  Barcode, 
  AlertTriangle 
} from 'lucide-react';

export default function ModalDetalleReceta({ receta, onClose }) {
  if (!receta) return null;

  // Formatear la URL de la imagen de manera segura
  const urlImagen = receta.imagenUrl
    ? receta.imagenUrl.startsWith('http')
      ? receta.imagenUrl
      : `http://localhost:3000${receta.imagenUrl}`
    : null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Auditoría de Receta #{receta.id}
              </h3>
              <p className="text-xs text-slate-500">
                Detalle del documento registrado en el sistema
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

        {/* Cuerpo del Modal */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Visualizador de la Imagen Original */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex flex-col items-center justify-center min-h-[320px] max-h-[420px]">
            {urlImagen ? (
              <img
                src={urlImagen}
                alt={`Receta médica #${receta.id}`}
                className="max-h-[380px] w-auto object-contain rounded-lg shadow-2xs"
              />
            ) : (
              <div className="text-center py-12 px-4 text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium">Sin previsualización de imagen</p>
                <p className="text-[11px] mt-1 text-slate-400">Documento cargado sin archivo adjunto directo</p>
              </div>
            )}
          </div>

          {/* Ficha de Información y Estado */}
          <div className="space-y-4 text-xs">
            
            {/* Badge de Estado Legal */}
            <div className="p-3.5 rounded-xl border flex items-center justify-between" style={{
              backgroundColor: receta.esValida ? '#f0fdf4' : '#fef2f2',
              borderColor: receta.esValida ? '#bbf7d0' : '#fecaca'
            }}>
              <span className="font-semibold text-slate-700">Dictamen de Auditoría:</span>
              {receta.esValida ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Válida (RN-01)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-rose-100 text-rose-800">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Rechazada
                </span>
              )}
            </div>

            {/* Datos de la Prescripción */}
            <div className="space-y-2.5 bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-slate-700">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Fecha de Emisión:
                </span>
                <span className="font-semibold font-mono text-slate-900">
                  {receta.fechaEmision || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Matrícula Médico:
                </span>
                <span className="font-medium text-slate-800">
                  {receta.matriculaMedico || 'Sin datos (S/D)'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Barcode className="w-3.5 h-3.5 text-slate-400" /> Código de Barras:
                </span>
                <span className="font-mono text-slate-600">
                  {receta.codigoBarras || 'N/A'}
                </span>
              </div>
            </div>

            {/* Motivo de Rechazo u Observaciones */}
            {!receta.esValida && receta.motivoRechazo && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1 text-rose-900">
                <div className="font-semibold flex items-center gap-1.5 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Motivo Reglamentario de Rechazo:
                </div>
                <p className="text-rose-700 pl-5 leading-relaxed">
                  {receta.motivoRechazo}
                </p>
              </div>
            )}

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
              <span>Registrado el: {new Date(receta.createdAt).toLocaleString()}</span>
              <span>ID Interno: #{receta.id}</span>
            </div>

          </div>
        </div>

        {/* Pie del Modal */}
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
