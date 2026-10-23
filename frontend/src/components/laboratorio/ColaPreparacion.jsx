import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Eye, 
  FlaskConical, 
  RefreshCw, 
  Filter, 
  Calendar, 
  User, 
  ShieldAlert,
  Loader2,
  ChevronRight
} from 'lucide-react';
import api from '../../services/api.js';

export default function ColaPreparacion({ onVerReceta, onFinalizarPreparado }) {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('activos');
  const [soloUrgentes, setSoloUrgentes] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const [actualizandoId, setActualizandoId] = useState(null);

  const cargarPedidos = async () => {
    setCargando(true);
    setErrorLocal(null);
    try {
      const response = await api.get('/pedidos');
      const lista = Array.isArray(response.data) ? response.data : [];
      setPedidos(lista);
    } catch (err) {
      setErrorLocal('Error al cargar la cola de pedidos: ' + (err.response?.data?.error || err.message));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const handleIniciarPreparacion = async (pedidoId) => {
    setActualizandoId(pedidoId);
    try {
      await api.patch(`/pedidos/${pedidoId}/estado`, {
        estadoPedido: 'en_preparacion'
      });
      await cargarPedidos();
    } catch (err) {
      setErrorLocal('No se pudo iniciar la preparacion: ' + (err.response?.data?.error || err.message));
    } finally {
      setActualizandoId(null);
    }
  };

  const pedidosFiltrados = pedidos.filter(p => {
    if (soloUrgentes && !p.urgente) return false;
    if (filtroEstado === 'activos') {
      return ['ingresado', 'en_preparacion'].includes(p.estadoPedido);
    }
    if (filtroEstado === 'en_preparacion') {
      return p.estadoPedido === 'en_preparacion';
    }
    if (filtroEstado === 'listo_retiro') {
      return p.estadoPedido === 'listo_retiro';
    }
    return true;
  });

  const pedidosOrdenados = [...pedidosFiltrados].sort((a, b) => {
    if (a.urgente && !b.urgente) return -1;
    if (!a.urgente && b.urgente) return 1;
    return new Date(a.diaHoraRetiro) - new Date(b.diaHoraRetiro);
  });

  const totalUrgentes = pedidos.filter(p => p.urgente && ['ingresado', 'en_preparacion'].includes(p.estadoPedido)).length;
  const totalEnProceso = pedidos.filter(p => p.estadoPedido === 'en_preparacion').length;
  const totalListos = pedidos.filter(p => p.estadoPedido === 'listo_retiro').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span className="font-medium text-slate-600">Urgencias:</span>
            <span className="font-bold text-rose-700">{totalUrgentes}</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs text-xs">
            <FlaskConical className="w-4 h-4 text-amber-600" />
            <span className="font-medium text-slate-600">En Preparacion:</span>
            <span className="font-bold text-amber-700">{totalEnProceso}</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-xs text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-slate-600">Listos:</span>
            <span className="font-bold text-emerald-700">{totalListos}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={cargarPedidos}
            disabled={cargando}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cargando ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {errorLocal && (
        <div role="alert" className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-xs text-rose-800">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorLocal}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Filtros</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700">
              <input
                type="checkbox"
                checked={soloUrgentes}
                onChange={(e) => setSoloUrgentes(e.target.checked)}
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
              <span className="font-medium text-rose-800">Solo Urgencias Medicas (RN-05)</span>
            </label>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-slate-800"
            >
              <option value="activos">Cola Activa (Ingresados y En Proceso)</option>
              <option value="en_preparacion">Solo En Preparacion</option>
              <option value="listo_retiro">Listos para Retiro</option>
              <option value="todos">Todos los pedidos</option>
            </select>
          </div>
        </div>

        {cargando ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-slate-600" />
            <span className="text-xs">Cargando cola de preparados...</span>
          </div>
        ) : pedidosOrdenados.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center text-slate-400">
            <FlaskConical className="w-10 h-10 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-medium text-slate-600">No hay preparados en esta cola</p>
            <p className="text-xs text-slate-400 mt-0.5">Los nuevos pedidos ingresados en recepcion figuraran aqui automaticamente</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Prioridad</th>
                  <th className="py-3 px-3">Orden #</th>
                  <th className="py-3 px-3">Paciente</th>
                  <th className="py-3 px-3">Formula Magistral</th>
                  <th className="py-3 px-3">Dosis / CSP</th>
                  <th className="py-3 px-3">Limite de Retiro</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pedidosOrdenados.map((pedido) => {
                  const fechaRetiro = new Date(pedido.diaHoraRetiro);
                  const droga = pedido.principioActivo?.nombre || 'Droga Magistral';
                  const esUrgente = pedido.urgente;

                  return (
                    <tr
                      key={pedido.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        esUrgente ? 'bg-rose-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        {esUrgente ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            URGENTE
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        #{pedido.id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-900">{pedido.nombreCliente}</div>
                        <div className="text-[11px] text-slate-400">{pedido.telefonoCliente}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {droga}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{pedido.dosis}</div>
                        <div className="text-[11px] text-slate-400">C.S.P. {pedido.csp}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">
                          {fechaRetiro.toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {fechaRetiro.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hs
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          pedido.estadoPedido === 'en_preparacion'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : pedido.estadoPedido === 'listo_retiro'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {pedido.estadoPedido}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {onVerReceta && pedido.receta && (
                            <button
                              type="button"
                              onClick={() => onVerReceta(pedido.receta, pedido)}
                              title="Ver receta medica original"
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {pedido.estadoPedido === 'ingresado' && (
                            <button
                              type="button"
                              onClick={() => handleIniciarPreparacion(pedido.id)}
                              disabled={actualizandoId === pedido.id}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-xs transition-colors disabled:opacity-50 text-[11px]"
                            >
                              {actualizandoId === pedido.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <FlaskConical className="w-3 h-3" />
                              )}
                              <span>Iniciar</span>
                            </button>
                          )}

                          {pedido.estadoPedido === 'en_preparacion' && onFinalizarPreparado && (
                            <button
                              type="button"
                              onClick={() => onFinalizarPreparado(pedido)}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-xs transition-colors text-[11px]"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Finalizar</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
