import React, { useState } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  User, 
  Hash
} from 'lucide-react';

export default function RecetaViewer({ isOpen, onClose, receta, pedido }) {
  const [zoom, setZoom] = useState(1);
  const [rotacion, setRotacion] = useState(0);

  if (!isOpen || !receta) return null;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotacion(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotacion(0);
  };

  const esPdf = receta.imagenUrl?.toLowerCase().endsWith('.pdf');
  const imagenUrl = receta.imagenUrl || '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="receta-viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="receta-viewer-title" className="text-base font-semibold text-slate-900 tracking-tight">
                Visor de Receta Medica Original
              </h3>
              <p className="text-xs text-slate-500">
                Auditoria de formula y prescripcion del facultativo (ENC-04 / RN-12)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-4 gap-4 text-xs">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Orden #</span>
            <span className="font-mono font-bold text-slate-900">{pedido?.id ? `#${pedido.id}` : 'N/A'}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Matricula Medico</span>
            <span className="font-medium text-slate-900">{receta.matriculaMedico || 'No informada'}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Codigo de Barras</span>
            <span className="font-mono text-slate-900">{receta.codigoBarras || 'S/N'}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-slate-200/60">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Fecha Emision</span>
            <span className="font-medium text-slate-900">{receta.fechaEmision || 'Sin fecha'}</span>
          </div>
        </div>

        <div className="relative flex-1 bg-slate-900 overflow-hidden min-h-[460px] flex items-center justify-center p-4 select-none">
          {imagenUrl ? (
            esPdf ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center space-y-4">
                <FileText className="w-16 h-16 text-slate-400 stroke-1" />
                <div>
                  <h4 className="text-base font-semibold">Documento Medico en Formato PDF</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">
                    El documento original escaneado se encuentra almacenado como PDF digital. Puede abrirlo en una nueva pestana para visualizarlo en alta resolucion con el lector de su navegador.
                  </p>
                </div>
                <a
                  href={imagenUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Documento PDF Original</span>
                </a>
              </div>
            ) : (
              <div className="overflow-auto w-full h-full flex items-center justify-center">
                <img
                  src={imagenUrl}
                  alt="Receta medica original"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotacion}deg)`,
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="max-h-[500px] max-w-full object-contain rounded-sm shadow-2xl"
                />
              </div>
            )
          ) : (
            <div className="text-slate-400 text-xs flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 stroke-1 text-slate-500" />
              <span>No hay fotografia de receta asociada a este pedido</span>
            </div>
          )}

          {!esPdf && imagenUrl && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg text-white">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                title="Alejar"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono px-2 text-slate-300">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                title="Acercar"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/20 mx-1" />

              <button
                type="button"
                onClick={handleRotate}
                title="Rotar 90 grados"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                title="Restablecer vista"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors text-[10px] font-medium"
              >
                1:1
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50/80 border-t border-slate-100">
          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>Documento protegido y respaldado para trazabilidad legal y farmacopea</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
}
