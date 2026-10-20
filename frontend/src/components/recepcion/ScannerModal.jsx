import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, X, RefreshCw } from 'lucide-react';
import api from '../../services/api.js';

export default function ScannerModal({ isOpen, onClose, onRecetaProcesada }) {
  const [archivo, setArchivo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [esPdf, setEsPdf] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  if (!isOpen) return null;

  const resetearEstado = () => {
    setArchivo(null);
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setEsPdf(false);
    setErrorLocal(null);
    setCargando(false);
  };

  const handleCerrar = () => {
    if (cargando) return;
    resetearEstado();
    onClose();
  };

  const procesarArchivoSeleccionado = (file) => {
    setErrorLocal(null);
    if (!file) return;

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!tiposPermitidos.includes(file.type)) {
      setErrorLocal('Formato no permitido. Suba una imagen JPG, PNG, WEBP o un documento PDF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorLocal('El archivo supera el limite de 10 MB permitido.');
      return;
    }

    setArchivo(file);
    if (file.type === 'application/pdf') {
      setEsPdf(true);
      setPreviewUrl(null);
    } else {
      setEsPdf(false);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    procesarArchivoSeleccionado(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    procesarArchivoSeleccionado(file);
  };

  const handleEscanear = async () => {
    if (!archivo) {
      setErrorLocal('Seleccione o arrastre un archivo de receta antes de procesar.');
      return;
    }

    setCargando(true);
    setErrorLocal(null);

    const formData = new FormData();
    formData.append('receta', archivo);

    try {
      const response = await api.post('/recetas/escanear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (onRecetaProcesada) {
        onRecetaProcesada({
          resultado: response.data,
          archivoLocal: archivo,
          previewUrl: previewUrl || response.data?.archivo?.url
        });
      }
      handleCerrar();
    } catch (err) {
      const msj = err.response?.data?.error || err.message || 'Error de conexion con el servidor';
      setErrorLocal('No se pudo procesar la receta: ' + msj);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div>
            <h3 id="scanner-modal-title" className="text-base font-semibold text-slate-900 tracking-tight">
              Captura y Escaner de Receta Medica
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Digitalizacion automatica para extraccion de formula magistral y verificacion legal
            </p>
          </div>
          <button
            type="button"
            onClick={handleCerrar}
            disabled={cargando}
            aria-label="Cerrar ventana de captura"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {errorLocal && (
            <div
              role="alert"
              className="p-3.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-start gap-3 text-rose-800 text-xs leading-relaxed"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorLocal}</span>
            </div>
          )}

          {!archivo ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`p-1 rounded-2xl transition-all cursor-pointer ${
                isDragging
                  ? 'bg-slate-900/5 ring-2 ring-slate-900'
                  : 'bg-slate-50/60 hover:bg-slate-100/60 ring-1 ring-slate-200/80'
              }`}
            >
              <div className="border border-dashed border-slate-300 rounded-xl py-12 px-6 flex flex-col items-center justify-center text-center">
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 mb-3">
                  <UploadCloud className="w-6 h-6 stroke-[1.75]" />
                </div>
                <p className="text-sm font-medium text-slate-800">
                  Haga clic para seleccionar o arrastre la receta aqui
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Formatos aceptados: JPG, PNG, WEBP o PDF digital escaneado (hasta 10 MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="bg-white rounded-xl p-4 border border-slate-100 flex flex-col items-center justify-center">
                {previewUrl && !esPdf ? (
                  <div className="relative w-full max-h-72 overflow-hidden rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt="Vista previa de receta"
                      className="max-h-72 object-contain w-auto mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full py-12 flex flex-col items-center justify-center text-center bg-slate-50 rounded-lg border border-slate-200/60">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 mb-2">
                      <FileText className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      Documento PDF cargado
                    </p>
                  </div>
                )}

                <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="truncate max-w-xs font-mono">
                    {archivo.name} ({(archivo.size / 1024).toFixed(1)} KB)
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetearEstado();
                      inputRef.current?.click();
                    }}
                    disabled={cargando}
                    className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Cambiar archivo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/80 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCerrar}
            disabled={cargando}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleEscanear}
            disabled={!archivo || cargando}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {cargando ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Procesando con IA...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Procesar y Validar Receta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
