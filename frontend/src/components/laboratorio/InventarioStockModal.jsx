import React, { useState, useEffect } from 'react';
import { 
  X, 
  Boxes, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2,
  RefreshCw
} from 'lucide-react';
import api from '../../services/api.js';

export default function InventarioStockModal({ isOpen, onClose, onStockModificado }) {
  const [principiosActivos, setPrincipiosActivos] = useState([]);
  const [inputsStock, setInputsStock] = useState({});
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoStock, setNuevoStock] = useState('100');
  const [guardandoNuevo, setGuardandoNuevo] = useState(false);
  const [actualizandoId, setActualizandoId] = useState(null);
  const [errorLocal, setErrorLocal] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  const cargarCatalogo = async () => {
    setCargando(true);
    setErrorLocal(null);
    try {
      const res = await api.get('/principiosActivos');
      const lista = Array.isArray(res.data) ? res.data : [];
      setPrincipiosActivos(lista);
      const mapa = {};
      lista.forEach(d => {
        mapa[d.id] = String(Number(d.stockDisponible || 0));
      });
      setInputsStock(mapa);
    } catch (err) {
      setErrorLocal('Error al consultar inventario: ' + (err.response?.data?.message || err.message));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      cargarCatalogo();
      setBusqueda('');
      setNuevoNombre('');
      setNotificacion(null);
      setErrorLocal(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActualizarStock = async (droga) => {
    const valorStr = inputsStock[droga.id];
    const cantidadNum = parseFloat(valorStr);
    if (isNaN(cantidadNum) || cantidadNum < 0) {
      setErrorLocal('Ingrese un número de stock válido mayor o igual a 0.');
      return;
    }

    setActualizandoId(droga.id);
    setErrorLocal(null);
    try {
      await api.put(`/principiosActivos/${droga.id}`, {
        cantidad: cantidadNum,
        incrementar: false
      });
      setNotificacion(`Stock de ${droga.nombre} actualizado a ${cantidadNum.toFixed(2)} g.`);
      await cargarCatalogo();
      if (onStockModificado) onStockModificado();
    } catch (err) {
      setErrorLocal('No se pudo actualizar el stock: ' + (err.response?.data?.error || err.message));
    } finally {
      setActualizandoId(null);
    }
  };

  const handleCrearPrincipioActivo = async (e) => {
    e.preventDefault();
    const nombreLimpio = String(nuevoNombre).trim();
    if (!nombreLimpio) {
      setErrorLocal('El nombre de la materia prima es obligatorio.');
      return;
    }

    const regexDosisOUnidades = /(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/i;
    if (regexDosisOUnidades.test(nombreLimpio)) {
      setErrorLocal('No se permiten unidades (g/mg) ni dosis en el nombre. Ingrese únicamente el nombre del principio activo.');
      return;
    }

    setGuardandoNuevo(true);
    setErrorLocal(null);
    try {
      await api.post('/principiosActivos', {
        nombre: nombreLimpio,
        stockDisponible: parseFloat(nuevoStock) || 0
      });
      setNuevoNombre('');
      setNuevoStock('100');
      setNotificacion(`Materia prima '${nombreLimpio}' dada de alta con éxito.`);
      await cargarCatalogo();
      if (onStockModificado) onStockModificado();
    } catch (err) {
      setErrorLocal('Error al registrar principio activo: ' + (err.response?.data?.message || err.message));
    } finally {
      setGuardandoNuevo(false);
    }
  };

  const filtrados = principiosActivos.filter(p => 
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Inventario de Materias Primas y Principios Activos
              </h3>
              <p className="text-xs text-slate-500">
                Control de existencias físicas para formulación magistral
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

        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {errorLocal && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-medium">
              {errorLocal}
            </div>
          )}

          {notificacion && (
            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{notificacion}</span>
            </div>
          )}

          <form onSubmit={handleCrearPrincipioActivo} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Plus className="w-4 h-4 text-slate-800" />
              <span>Registrar Nueva Materia Prima en Catálogo</span>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Nombre de droga sin dosis (ej: Morfina, Clonazepam, Omeprazol)"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900"
              />

              <div className="w-32 relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                  placeholder="Stock (g)"
                  className="w-full pl-3 pr-7 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium text-center focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
                <span className="absolute right-2.5 top-2.5 text-slate-400 text-xs pointer-events-none font-medium">g</span>
              </div>

              <button
                type="submit"
                disabled={guardandoNuevo}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap cursor-pointer"
              >
                {guardandoNuevo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                <span>Guardar</span>
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar droga por nombre..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
              />
            </div>

            <button
              type="button"
              onClick={cargarCatalogo}
              disabled={cargando}
              className="p-1.5 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              title="Refrescar catálogo"
            >
              <RefreshCw className={`w-4 h-4 ${cargando ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Materia Prima</th>
                  <th className="py-2.5 px-3 text-center">Stock Físico</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Ajustar Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cargando ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-1 text-slate-600" />
                      Cargando inventario...
                    </td>
                  </tr>
                ) : filtrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-slate-400">
                      No se encontraron principios activos registrados.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((droga) => {
                    const cant = Number(droga.stockDisponible || 0);
                    const sinStock = cant <= 0;
                    const bajoStock = cant > 0 && cant <= 10;
                    const estaActualizando = actualizandoId === droga.id;

                    return (
                      <tr key={droga.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          {droga.nombre}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                          {cant} g
                        </td>
                        <td className="py-2.5 px-3">
                          {sinStock ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
                              Agotado (0 g)
                            </span>
                          ) : bajoStock ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
                              Stock Bajo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200">
                              Disponible
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleActualizarStock(droga);
                            }}
                            className="flex items-center justify-end gap-1.5"
                          >
                            <div className="relative w-28">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={inputsStock[droga.id] !== undefined ? inputsStock[droga.id] : cant}
                                onChange={(e) => setInputsStock(prev => ({ ...prev, [droga.id]: e.target.value }))}
                                placeholder="0.00"
                                className="w-full pl-2.5 pr-6 py-1 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold text-center text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                              />
                              <span className="absolute right-2 top-1.5 text-slate-400 text-[10px] pointer-events-none font-medium">g</span>
                            </div>

                            <button
                              type="submit"
                              disabled={estaActualizando}
                              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium text-[11px] shadow-2xs transition-colors disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
                              title="Guardar nuevo stock"
                            >
                              {estaActualizando ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Guardar'}
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium transition-colors text-xs"
          >
            Aceptar y Volver
          </button>
        </div>
      </div>
    </div>
  );
}
