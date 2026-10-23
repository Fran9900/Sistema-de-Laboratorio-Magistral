import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  RefreshCw,
  Zap
} from 'lucide-react';
import api from '../../services/api.js';

export default function HistorialRecetas({ onVerReceta }) {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos'); 

  const cargarHistorial = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await api.get('/recetas');
      const lista = Array.isArray(response.data) ? response.data : response.data?.recetas || [];
      setRecetas(lista);
    } catch (err) {
      console.error('Error al cargar historial de recetas:', err);
      setError('No se pudo cargar el historial de recetas.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  const recetasFiltradas = recetas.filter((item) => {

    const coincideTexto = 
      (item.matriculaMedico || '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (item.codigoBarras || '').toLowerCase().includes(busqueda.toLowerCase()) ||
      (item.motivoRechazo || '').toLowerCase().includes(busqueda.toLowerCase());

    if (filtroEstado === 'validas') return coincideTexto && item.esValida;
    if (filtroEstado === 'rechazadas') return coincideTexto && !item.esValida;

    return coincideTexto;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Historial de Recetas Recientes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro y auditoría de recetas procesadas y rechazadas en mostrador
          </p>
        </div>

        <button
          onClick={cargarHistorial}
          disabled={cargando}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${cargando ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por matrícula, código de barras o motivo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:bg-white"
          />
        </div>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-slate-700 font-medium"
        >
          <option value="todos">Todos los Estados</option>
          <option value="validas">Solo Válidas (RN-01)</option>
          <option value="rechazadas">Solo Rechazadas</option>
        </select>
      </div>

      {cargando ? (
        <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-slate-400" />
          Cargando registros de recetas...
        </div>
      ) : error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      ) : recetasFiltradas.length === 0 ? (
        <div className="py-10 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-dashed border-slate-200">
          No se encontraron recetas con los criterios especificados.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px] bg-slate-50/50">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Fecha Emisión</th>
                <th className="py-3 px-3">Matrícula Médico</th>
                <th className="py-3 px-3">Código Barras</th>
                <th className="py-3 px-3">Estado Legal</th>
                <th className="py-3 px-3">Observaciones / Motivo</th>
                <th className="py-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recetasFiltradas.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-slate-900">
                    #{r.id}
                  </td>
                  <td className="py-3 px-3">
                    {r.fechaEmision ? r.fechaEmision : 'N/A'}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">
                    {r.matriculaMedico || 'S/D'}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {r.codigoBarras || 'Sin código'}
                  </td>
                  <td className="py-3 px-3">
                    {r.esValida ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Válida
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        Rechazada
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate text-slate-500" title={r.motivoRechazo || ''}>
                    {r.esValida 
                      ? 'Conforme auditoría (RN-01)' 
                      : (r.motivoRechazo || 'Rechazo directo en mostrador')}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {onVerReceta && (
                      <button
                        onClick={() => onVerReceta(r)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        Ver Detalle
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}