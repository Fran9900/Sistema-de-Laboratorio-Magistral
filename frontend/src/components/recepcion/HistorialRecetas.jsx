import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  RefreshCw,
  Calendar,
  X
} from 'lucide-react';
import api from '../../services/api.js';

function formatearFechaTabla(fechaStr) {
  if (!fechaStr) return 'N/A';
  const str = String(fechaStr).trim();
  const yyyymmdd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (yyyymmdd) {
    return `${yyyymmdd[3].padStart(2, '0')}/${yyyymmdd[2].padStart(2, '0')}/${yyyymmdd[1]}`;
  }
  return str;
}

export default function HistorialRecetas({ onVerReceta }) {
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
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
    const q = busqueda.trim().toLowerCase();
    const idStr = String(item.id || '');
    const pinStr = String(item.pedido?.pinControl || '').toLowerCase();
    const clienteStr = String(item.pedido?.nombreCliente || '').toLowerCase();
    const drogaStr = String(item.pedido?.principioActivo?.nombre || item.pedido?.principioActivoTexto || '').toLowerCase();
    const matriculaStr = String(item.matriculaMedico || '').toLowerCase();

    const coincideTexto = !q || (
      idStr.includes(q) ||
      (`#{idStr}`).includes(q) ||
      pinStr.includes(q) ||
      clienteStr.includes(q) ||
      drogaStr.includes(q) ||
      matriculaStr.includes(q)
    );

    const coincideFecha = !filtroFecha || (
      item.fechaEmision === filtroFecha ||
      (item.createdAt && item.createdAt.startsWith(filtroFecha))
    );

    if (filtroEstado === 'validas') return coincideTexto && coincideFecha && item.esValida;
    if (filtroEstado === 'rechazadas') return coincideTexto && coincideFecha && !item.esValida;

    return coincideTexto && coincideFecha;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Historial de Recetas Recientes
          </h3>
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por ID, N° Talonario (PIN), Cliente o Fórmula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:bg-white"
          />
        </div>

        <div className="relative md:col-span-3 flex items-center">
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            title="Filtrar por fecha de emisión o ingreso"
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-slate-700"
          />
          {filtroFecha && (
            <button
              type="button"
              onClick={() => setFiltroFecha('')}
              className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600"
              title="Limpiar filtro de fecha"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="md:col-span-3">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-slate-700 font-medium"
          >
            <option value="todos">Todos los Estados</option>
            <option value="validas">Solo Válidas</option>
            <option value="rechazadas">Solo Rechazadas</option>
          </select>
        </div>
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
                <th className="py-3 px-3">N° Talonario</th>
                <th className="py-3 px-3">Cliente</th>
                <th className="py-3 px-3">Preparado en Sí</th>
                <th className="py-3 px-3">Estado Legal</th>
                <th className="py-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recetasFiltradas.map((r) => {
                const droga = r.pedido?.principioActivo?.nombre || r.pedido?.principioActivoTexto || (r.esValida ? 'Fórmula personalizada' : 'Prescripción rechazada');
                const motivoTooltip = r.esValida
                  ? 'Conforme auditoría y reglamentación sanitaria'
                  : (r.motivoRechazo || 'Rechazo reglamentario en mostrador');

                return (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-medium text-slate-900">
                      #{r.id}
                    </td>
                    <td className="py-3 px-3">
                      {formatearFechaTabla(r.fechaEmision)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-200 tracking-wider">
                        {r.pedido?.pinControl || '----'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">
                        {r.pedido?.nombreCliente || 'Sin pedido asociado'}
                      </div>
                      {r.pedido?.telefonoCliente && (
                        <div className="text-[11px] text-slate-400">
                          {r.pedido.telefonoCliente}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">
                        {droga}
                      </div>
                      {r.pedido?.dosis && (
                        <div className="text-[11px] text-slate-500">
                          Dosis: {r.pedido.dosis} | CSP: {r.pedido.csp}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {r.esValida ? (
                        <span 
                          title={motivoTooltip}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-help"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Válida
                        </span>
                      ) : (
                        <span 
                          title={motivoTooltip}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200 cursor-help"
                        >
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Rechazada
                        </span>
                      )}
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
