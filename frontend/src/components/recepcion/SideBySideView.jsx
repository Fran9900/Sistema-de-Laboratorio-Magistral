import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  User, 
  Clock, 
  ArrowRight, 
  Loader2, 
  ChevronLeft 
} from 'lucide-react';
import api from '../../services/api.js';

export default function SideBySideView({ recetaData, onVolver, onPedidoCreado }) {
  const datosExtraidos = recetaData?.resultado?.datosExtraidos || {};
  const archivoInfo = recetaData?.resultado?.archivo || {};
  const previewOriginal = recetaData?.previewUrl || (archivoInfo.url ? archivoInfo.url : null);
  const esPdf = recetaData?.archivoLocal?.type === 'application/pdf' || archivoInfo.filename?.endsWith('.pdf');

  const [principiosActivos, setPrincipiosActivos] = useState([]);
  const [cargandoDrogas, setCargandoDrogas] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const [formData, setFormData] = useState({
    nombreCliente: '',
    dniCliente: '',
    telefonoCliente: '',
    origenPedido: 'mostrador',
    precio: '0.00',
    principioActivoId: '',
    dosis: datosExtraidos.dosis || '',
    csp: datosExtraidos.csp || '',
    urgente: false,
    codigoBarras: datosExtraidos.codigoBarra || '',
    matriculaMedico: datosExtraidos.medicoMatricula || '',
    fechaEmision: datosExtraidos.fechaEmision || '',
    esDigital: true
  });

  useEffect(() => {
    const cargarPrincipiosActivos = async () => {
      setCargandoDrogas(true);
      try {
        const response = await api.get('/principiosActivos');
        const lista = Array.isArray(response.data) ? response.data : [];
        setPrincipiosActivos(lista);

        if (datosExtraidos.principioActivo) {
          const buscado = datosExtraidos.principioActivo.toLowerCase().trim();
          const coincidencia = lista.find(p => p.nombre?.toLowerCase().includes(buscado) || buscado.includes(p.nombre?.toLowerCase()));
          if (coincidencia) {
            setFormData(prev => ({ ...prev, principioActivoId: coincidencia.id }));
          }
        }
      } catch (err) {
        setPrincipiosActivos([]);
      } finally {
        setCargandoDrogas(false);
      }
    };

    cargarPrincipiosActivos();
  }, [datosExtraidos.principioActivo]);

  const drogaSeleccionada = principiosActivos.find(p => String(p.id) === String(formData.principioActivoId));
  const tieneStock = drogaSeleccionada ? Number(drogaSeleccionada.stockDisponible) > 0 : null;

  const calcularReglasLegales = () => {
    const errores = [];
    if (!formData.esDigital) {
      errores.push('La receta debe ser en formato digital.');
    }
    if (!formData.codigoBarras || String(formData.codigoBarras).trim() === '') {
      errores.push('Debe contener codigo de barras legible.');
    }
    if (!formData.matriculaMedico || String(formData.matriculaMedico).trim() === '') {
      errores.push('Debe contener matricula o firma del medico.');
    }
    if (!formData.fechaEmision) {
      errores.push('Fecha de emision obligatoria.');
    } else {
      const fecha = new Date(formData.fechaEmision);
      if (isNaN(fecha.getTime())) {
        errores.push('Fecha de emision no valida.');
      } else {
        const hoy = new Date();
        hoy.setHours(23, 59, 59, 999);
        const diffMs = hoy.getTime() - fecha.getTime();
        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDias < 0) {
          errores.push('La fecha de emision no puede ser futura.');
        } else if (diffDias > 30) {
          errores.push(`Receta vencida (${diffDias} dias desde emision, maximo 30).`);
        }
      }
    }
    return {
      esValida: errores.length === 0,
      errores
    };
  };

  const validacionActual = calcularReglasLegales();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEnvio(null);

    if (!formData.nombreCliente.trim() || !formData.telefonoCliente.trim()) {
      setErrorEnvio('Ingrese el nombre y telefono de contacto del cliente.');
      return;
    }

    if (!formData.principioActivoId) {
      setErrorEnvio('Seleccione la droga o principio activo de la formulacion.');
      return;
    }

    if (!formData.dosis.trim() || !formData.csp.trim()) {
      setErrorEnvio('Complete la dosis y la cantidad total (C.S.P.) de la preparacion.');
      return;
    }

    if (!validacionActual.esValida) {
      setErrorEnvio('La receta no cumple con las reglas legales obligatorias: ' + validacionActual.errores.join(' '));
      return;
    }

    setGuardando(true);

    try {
      const resReceta = await api.post('/recetas', {
        codigoBarras: formData.codigoBarras,
        matriculaMedico: formData.matriculaMedico,
        imagenUrl: archivoInfo.url || null,
        esDigital: formData.esDigital,
        fechaEmision: formData.fechaEmision,
        esValida: true,
        motivoRechazo: null
      });

      const recetaIdGuardada = resReceta.data?.receta?.id;

      const resPedido = await api.post('/pedidos', {
        recetaId: recetaIdGuardada,
        principioActivoId: Number(formData.principioActivoId),
        nombreCliente: formData.nombreCliente,
        dniCliente: formData.dniCliente || null,
        telefonoCliente: formData.telefonoCliente,
        origenPedido: formData.origenPedido,
        precio: parseFloat(formData.precio) || 0.00,
        dosis: formData.dosis,
        csp: formData.csp,
        urgente: formData.urgente
      });

      if (onPedidoCreado) {
        onPedidoCreado({
          pedido: resPedido.data?.pedido,
          receta: resReceta.data?.receta,
          droga: drogaSeleccionada
        });
      }
    } catch (err) {
      const msj = err.response?.data?.error || err.response?.data?.motivo || err.message || 'Error al persistir el pedido';
      setErrorEnvio('Error al registrar pedido: ' + msj);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVolver}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Verificacion Humana de Receta y Datos de Formula
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspeccione el documento original y corrobore los campos antes de confirmar el ingreso al laboratorio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {validacionActual.esValida ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Receta Valida (RN-01)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              Observaciones Legales
            </span>
          )}
        </div>
      </div>

      {errorEnvio && (
        <div role="alert" className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
          <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
          <span>{errorEnvio}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 items-start">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-600" />
              Documento Medico Original
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {archivoInfo.filename || 'receta_mostrador'}
            </span>
          </div>

          <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden min-h-[460px] max-h-[580px] flex items-center justify-center p-2">
            {previewOriginal && !esPdf ? (
              <img
                src={previewOriginal}
                alt="Documento escaneado"
                className="max-h-[560px] w-auto object-contain rounded-lg shadow-xs"
              />
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                <FileText className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-700">Documento en formato PDF cargado</p>
                <p className="text-xs text-slate-500 mt-1">
                  El archivo se encuentra almacenado y verificado en el servidor
                </p>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="font-medium text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              Auditoria de Legibilidad y Validez
            </div>
            {validacionActual.errores.length === 0 ? (
              <p className="text-emerald-700">Todos los requisitos de vigencia y registro legal estan verificados.</p>
            ) : (
              <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                {validacionActual.errores.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-600" />
                Datos del Cliente y Prescripcion
              </h3>
              <span className="text-[11px] text-slate-500">
                Campos editables
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Juan Perez"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">DNI (Opcional)</label>
                  <input
                    type="text"
                    name="dniCliente"
                    value={formData.dniCliente}
                    onChange={handleChange}
                    placeholder="Documento"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Telefono de Contacto *</label>
                  <input
                    type="text"
                    name="telefonoCliente"
                    value={formData.telefonoCliente}
                    onChange={handleChange}
                    required
                    placeholder="Ej. 11-4567-8901"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Formula Magistral</h4>
              
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Principio Activo (Droga) *</label>
                {cargandoDrogas ? (
                  <div className="text-xs text-slate-500 py-2 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Cargando catalogo de principios activos...
                  </div>
                ) : (
                  <select
                    name="principioActivoId"
                    value={formData.principioActivoId}
                    onChange={handleChange}
                    required
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  >
                    <option value="">Seleccione principio activo</option>
                    {principiosActivos.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} (Stock actual: {p.stockDisponible})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Dosis Prescripta *</label>
                  <input
                    type="text"
                    name="dosis"
                    value={formData.dosis}
                    onChange={handleChange}
                    required
                    placeholder="Ej. 50 mg"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Cantidad Total (C.S.P.) *</label>
                  <input
                    type="text"
                    name="csp"
                    value={formData.csp}
                    onChange={handleChange}
                    required
                    placeholder="Ej. 60 capsulas"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Validacion Legal y Medico</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Matricula Medico *</label>
                  <input
                    type="text"
                    name="matriculaMedico"
                    value={formData.matriculaMedico}
                    onChange={handleChange}
                    required
                    placeholder="MN / MP"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Codigo de Barras *</label>
                  <input
                    type="text"
                    name="codigoBarras"
                    value={formData.codigoBarras}
                    onChange={handleChange}
                    required
                    placeholder="Identificador"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Fecha Emision *</label>
                  <input
                    type="date"
                    name="fechaEmision"
                    value={formData.fechaEmision}
                    onChange={handleChange}
                    required
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Condiciones de Entrega</h4>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Precio Estimado ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
                <div className="pt-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="urgente"
                      checked={formData.urgente}
                      onChange={handleChange}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-800">
                      Marcar como Urgencia Medica (RN-05)
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Plazo estimado de entrega:</span>
                </div>
                <span className="font-semibold text-slate-900">
                  {formData.urgente
                    ? 'Inmediata / Mismo dia (Urgente)'
                    : tieneStock === false
                    ? '48 horas (Requiere drogueria)'
                    : '24 horas (Con stock en laboratorio)'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onVolver}
                disabled={guardando}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Volver al Escaner
              </button>
              <button
                type="submit"
                disabled={guardando || !validacionActual.esValida}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {guardando ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Registrando Pedido...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar y Crear Pedido</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
