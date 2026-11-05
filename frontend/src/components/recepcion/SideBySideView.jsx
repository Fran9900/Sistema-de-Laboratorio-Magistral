import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  Search,
  Check
} from 'lucide-react';
import api from '../../services/api.js';

function parsearFechaAObjeto(fechaStr) {
  if (!fechaStr) return null;
  const str = String(fechaStr).trim();
  const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyy) {
    const dia = parseInt(ddmmyyyy[1], 10);
    const mes = parseInt(ddmmyyyy[2], 10) - 1;
    const anio = parseInt(ddmmyyyy[3], 10);
    const d = new Date(anio, mes, dia);
    return isNaN(d.getTime()) ? null : d;
  }
  const yyyymmdd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (yyyymmdd) {
    const anio = parseInt(yyyymmdd[1], 10);
    const mes = parseInt(yyyymmdd[2], 10) - 1;
    const dia = parseInt(yyyymmdd[3], 10);
    const d = new Date(anio, mes, dia);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function formatearADiaMesAnio(fechaStr) {
  if (!fechaStr) return '';
  const str = String(fechaStr).trim();
  const yyyymmdd = str.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (yyyymmdd) {
    const dia = yyyymmdd[3].padStart(2, '0');
    const mes = yyyymmdd[2].padStart(2, '0');
    const anio = yyyymmdd[1];
    return `${dia}/${mes}/${anio}`;
  }
  const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyy) {
    const dia = ddmmyyyy[1].padStart(2, '0');
    const mes = ddmmyyyy[2].padStart(2, '0');
    const anio = ddmmyyyy[3];
    return `${dia}/${mes}/${anio}`;
  }
  return str;
}

function formatearAISO(fechaStr) {
  const d = parsearFechaAObjeto(fechaStr);
  if (!d) return fechaStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dia}`;
}

export default function SideBySideView({ recetaData, onVolver, onPedidoCreado }) {
  const datosExtraidos = recetaData?.resultado?.datosExtraidos || {};
  const archivoInfo = recetaData?.resultado?.archivo || {};
  const urlCalculada = archivoInfo.url ? (archivoInfo.url.startsWith('http') ? archivoInfo.url : ('http:' + String.fromCharCode(47, 47) + 'localhost:4000' + archivoInfo.url)) : null;
  const previewOriginal = recetaData?.previewUrl || urlCalculada;
  const esPdf = recetaData?.archivoLocal?.type === 'application/pdf' || archivoInfo.filename?.endsWith('.pdf');

  const [principiosActivos, setPrincipiosActivos] = useState([]);
  const [cargandoDrogas, setCargandoDrogas] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const [principioActivoInput, setPrincipioActivoInput] = useState(datosExtraidos.principioActivo || '');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const wrapperRef = useRef(null);

  const [formData, setFormData] = useState({
    nombreCliente: datosExtraidos.nombreCliente || '',
    dniCliente: datosExtraidos.dniCliente || '',
    telefonoCliente: datosExtraidos.telefonoCliente || '',
    origenPedido: 'mostrador',
    precio: '0.00',
    principioActivoId: '',
    principioActivoTexto: datosExtraidos.principioActivo || '',
    dosis: datosExtraidos.dosis || '',
    csp: datosExtraidos.csp || '',
    urgente: Boolean(datosExtraidos.urgente),
    codigoBarras: datosExtraidos.codigoBarra || '',
    matriculaMedico: datosExtraidos.medicoMatricula || '',
    fechaEmision: formatearADiaMesAnio(datosExtraidos.fechaEmision || ''),
    esDigital: true
  });

  const [mostrarModalRechazo, setMostrarModalRechazo] = useState(false);
  const [motivoRechazoSeleccionado, setMotivoRechazoSeleccionado] = useState(
    'Receta vencida (> 30 días)'
  );
  const [motivoDetalle, setMotivoDetalle] = useState('');
  const [enviandoRechazo, setEnviandoRechazo] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const cargarPrincipiosActivos = async () => {
      setCargandoDrogas(true);
      try {
        const response = await api.get('/principiosActivos');
        const lista = Array.isArray(response.data) ? response.data : [];
        setPrincipiosActivos(lista);

        if (datosExtraidos.principioActivo) {
          const nombrePuro = String(datosExtraidos.principioActivo)
            .replace(/(?:\d+\s*(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b)|\b(?:mg|g|gr|gramos|mcg|ug|µg|ml)\b|\d+/gi, '')
            .trim();
          const buscado = nombrePuro.toLowerCase();
          const coincidencia = lista.find(p => p.nombre?.toLowerCase().includes(buscado) || buscado.includes(p.nombre?.toLowerCase()));
          if (coincidencia) {
            setFormData(prev => ({ 
              ...prev, 
              principioActivoId: coincidencia.id,
              principioActivoTexto: coincidencia.nombre
            }));
            setPrincipioActivoInput(coincidencia.nombre);
          } else {
            setFormData(prev => ({ 
              ...prev, 
              principioActivoId: '',
              principioActivoTexto: nombrePuro
            }));
            setPrincipioActivoInput(nombrePuro);
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

  const sugerenciasFiltradas = principioActivoInput.trim() === ''
    ? principiosActivos
    : principiosActivos.filter(p => 
        p.nombre?.toLowerCase().includes(principioActivoInput.toLowerCase().trim())
      );

  const handlePrincipioActivoChange = (e) => {
    const valor = e.target.value;
    setPrincipioActivoInput(valor);
    setMostrarSugerencias(true);

    const coincidenciaExacta = principiosActivos.find(
      p => p.nombre?.toLowerCase().trim() === valor.toLowerCase().trim()
    );

    if (coincidenciaExacta) {
      setFormData(prev => ({
        ...prev,
        principioActivoId: coincidenciaExacta.id,
        principioActivoTexto: coincidenciaExacta.nombre
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        principioActivoId: '',
        principioActivoTexto: valor
      }));
    }
  };

  const seleccionarSugerencia = (droga) => {
    setPrincipioActivoInput(droga.nombre);
    setFormData(prev => ({
      ...prev,
      principioActivoId: droga.id,
      principioActivoTexto: droga.nombre
    }));
    setMostrarSugerencias(false);
  };

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
      const fecha = parsearFechaAObjeto(formData.fechaEmision);
      if (!fecha) {
        errores.push('Fecha de emision no valida (use formato dia/mes/año).');
      } else {
        const hoy = new Date();
        hoy.setHours(23, 59, 59, 999);
        const diffMs = hoy.getTime() - fecha.getTime();
        const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDias < 0) {
          errores.push('La fecha de emision no puede ser posterior a la fecha actual.');
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

  const handleConfirmarRechazo = async () => {
    setEnviandoRechazo(true);
    const motivoFinal = motivoDetalle
      ? `${motivoRechazoSeleccionado}: ${motivoDetalle}`
      : motivoRechazoSeleccionado;

    try {
      const payloadReceta = {
        codigoBarras: formData.codigoBarras || null,
        matriculaMedico: formData.matriculaMedico || null,
        fechaEmision: formatearAISO(formData.fechaEmision) || new Date().toISOString().split('T')[0],
        esDigital: Boolean(formData.esDigital),
        esValida: false,
        motivoRechazo: motivoFinal,
        imagenUrl: archivoInfo.url || null
      };

      await api.post('/recetas', payloadReceta);
      alert('Receta rechazada y archivada correctamente en el sistema.');
      setMostrarModalRechazo(false);
      if (onVolver) onVolver();
    } catch (err) {
      alert(
        'Error al registrar el rechazo de la receta: ' +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setEnviandoRechazo(false);
    }
  };

  const calcularTiempoEntregaEstimado = () => {
    if (formData.urgente) return 'Inmediato (Mismo dia - Urgencia Medica)';
    if (tieneStock === true) return '24 horas habiles (Stock disponible en laboratorio)';
    if (tieneStock === false) return '48 horas habiles (Requiere reposicion por drogueria)';
    return '24 a 48 horas habiles';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validacionActual.esValida) {
      setErrorEnvio('Corrija las infracciones legales de la receta antes de continuar.');
      return;
    }

    setGuardando(true);
    setErrorEnvio(null);

    try {
      let recetaId = recetaData?.resultado?.recetaGuardada?.id;

      if (!recetaId) {
        const payloadReceta = {
          codigoBarras: formData.codigoBarras,
          matriculaMedico: formData.matriculaMedico,
          fechaEmision: formatearAISO(formData.fechaEmision),
          esDigital: formData.esDigital,
          esValida: true,
          motivoRechazo: null,
          imagenUrl: archivoInfo.url || null
        };
        const resReceta = await api.post('/recetas', payloadReceta);
        recetaId = resReceta.data?.receta?.id;
      }

      if (!recetaId) {
        throw new Error('No se pudo determinar el ID de la receta para asociar al pedido.');
      }

      const payloadPedido = {
        recetaId,
        nombreCliente: formData.nombreCliente,
        dniCliente: formData.dniCliente || null,
        telefonoCliente: formData.telefonoCliente || null,
        origenPedido: formData.origenPedido || 'mostrador',
        precio: parseFloat(formData.precio) || 0.0,
        principioActivoId: formData.principioActivoId ? Number(formData.principioActivoId) : null,
        principioActivoTexto: formData.principioActivoTexto ? String(formData.principioActivoTexto).trim() : null,
        dosis: formData.dosis,
        csp: formData.csp,
        urgente: formData.urgente
      };

      const resPedido = await api.post('/pedidos', payloadPedido);

      if (onPedidoCreado) {
        onPedidoCreado(resPedido.data);
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Error al persistir receta y pedido.';
      setErrorEnvio(msg);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVolver}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
            title="Volver al mostrador"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Verificación
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {validacionActual.esValida ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valida segun normativa legal</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Infraccion legal detectada</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-slate-200 min-h-[640px]">
        <div className="p-6 bg-slate-50 flex flex-col justify-between overflow-y-auto max-h-[780px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Documento Original de la Prescripcion</span>
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {archivoInfo.filename || 'receta-captura'}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center min-h-[420px] max-h-[500px]">
              {previewOriginal ? (
                esPdf ? (
                  <iframe
                    src={previewOriginal}
                    title="Visor PDF Receta"
                    className="w-full h-[480px] border-none"
                  />
                ) : (
                  <img
                    src={previewOriginal}
                    alt="Prescripcion medica escaneada"
                    className="max-h-[480px] w-auto object-contain"
                  />
                )
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs">No se dispone de vista previa del documento</p>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                <span>Auditoria de Cumplimiento Legal</span>
              </div>

              {validacionActual.errores.length === 0 ? (
                <p className="text-xs text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Cumple con vigencia (&lt;=30 dias), firma o matricula y formato digital.</span>
                </p>
              ) : (
                <ul className="text-xs text-amber-800 space-y-1">
                  {validacionActual.errores.map((err, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
            <span>Extraccion asistida por Vision Multimodal</span>
            <span className="font-mono">Modo de validacion en mostrador</span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[780px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorEnvio && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorEnvio}</span>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Datos del Paciente / Cliente</span>
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombreCliente"
                    value={formData.nombreCliente}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Juan Perez"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-xs font-medium text-slate-700 mb-1">DNI del Cliente</label>
                  <input
                    type="text"
                    name="dniCliente"
                    value={formData.dniCliente}
                    onChange={handleChange}
                    placeholder="Ej: 35123456"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Telefono / Celular</label>
                  <input
                    type="text"
                    name="telefonoCliente"
                    value={formData.telefonoCliente}
                    onChange={handleChange}
                    placeholder="Ej: 11 4455 6677"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Formula Magistral</h4>
              
              <div ref={wrapperRef} className="relative">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Principio Activo (Droga) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={principioActivoInput}
                    onChange={handlePrincipioActivoChange}
                    onFocus={() => setMostrarSugerencias(true)}
                    required
                    placeholder="Escriba el principio activo (ej. Atorvastatina)..."
                    className="w-full text-xs pl-8 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                    autoComplete="off"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  {cargandoDrogas && (
                    <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin absolute right-2.5 top-2.5" />
                  )}
                </div>

                {mostrarSugerencias && sugerenciasFiltradas.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100">
                    {sugerenciasFiltradas.map((droga) => (
                      <button
                        key={droga.id}
                        type="button"
                        onClick={() => seleccionarSugerencia(droga)}
                        className="w-full px-3 py-2 text-left text-xs hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-slate-800">{droga.nombre}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            Number(droga.stockDisponible) > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            Stock: {droga.stockDisponible}
                          </span>
                          {String(formData.principioActivoId) === String(droga.id) && (
                            <Check className="w-3 h-3 text-emerald-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {formData.principioActivoId ? (
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Principio activo registrado (Stock disponible: {drogaSeleccionada?.stockDisponible || 0})
                  </p>
                ) : principioActivoInput.trim() ? (
                  <p className="text-[11px] text-slate-500 mt-1">
                    No registrado en catalogo (quedara registrado como texto para este pedido)
                  </p>
                ) : null}
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
                    placeholder="Ej: 50 mg"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Cantidad C.S.P. *</label>
                  <input
                    type="text"
                    name="csp"
                    value={formData.csp}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 30 capsulas"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Datos Legales de la Prescripcion</span>
              </h4>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Fecha Emisión (día/mes/año) *</label>
                  <input
                    type="text"
                    name="fechaEmision"
                    value={formData.fechaEmision}
                    onChange={handleChange}
                    required
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                    className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Matricula / Firma *</label>
                  <input
                    type="text"
                    name="matriculaMedico"
                    value={formData.matriculaMedico}
                    onChange={handleChange}
                    required
                    placeholder="Ej: MP 45892"
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
                    placeholder="Ej: 7791234567890"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="esDigital"
                    checked={formData.esDigital}
                    onChange={handleChange}
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                  />
                  <span className="text-xs text-slate-700">Formato Digital / Escaneado Autorizado</span>
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Condiciones de Entrega y Prioridad</span>
              </h4>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="urgente"
                      checked={formData.urgente}
                      onChange={handleChange}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-800">
                      Marcar como Urgencia Medica
                    </span>
                  </label>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Estimacion de Retiro</span>
                  <span className={`text-xs font-semibold ${formData.urgente ? 'text-amber-700' : 'text-slate-800'}`}>
                    {calcularTiempoEntregaEstimado()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMostrarModalRechazo(true)}
                className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 rounded font-bold text-xs flex items-center gap-1 transition cursor-pointer"
              >
                Rechazar Receta
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onVolver}
                  disabled={guardando}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
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
            </div>
          </form>
        </div>

        {mostrarModalRechazo && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl border p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                Rechazar Receta Médica
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Indique la razón reglamentaria para rechazar esta prescripción.
                El evento quedará registrado en el historial.
              </p>

              <div className="space-y-3 text-xs mb-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Motivo de Rechazo
                  </label>
                  <select
                    value={motivoRechazoSeleccionado}
                    onChange={(e) =>
                      setMotivoRechazoSeleccionado(e.target.value)
                    }
                    className="w-full border rounded p-2 bg-white font-medium"
                  >
                    <option value="Receta vencida (> 30 días)">
                      Receta vencida (&gt; 30 días)
                    </option>
                    <option value="Falta de Firma / Sello / Matrícula Médica">
                      Falta de Firma / Sello / Matrícula Médica
                    </option>
                    <option value="Prescripción Borrosa / Ilegible">
                      Prescripción Borrosa / Ilegible
                    </option>
                    <option value="Enmienda o Tachadura sin Salvar">
                      Enmienda o Tachadura sin Salvar
                    </option>
                    <option value="Otro motivo">Otro motivo</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Observaciones adicionales (Opcional)
                  </label>
                  <textarea
                    rows="3"
                    value={motivoDetalle}
                    onChange={(e) => setMotivoDetalle(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Detalle los hallazgos en la prescripción..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMostrarModalRechazo(false)}
                  className="px-3 py-1.5 border rounded text-slate-600 hover:bg-slate-50 font-medium text-xs"
                  disabled={enviandoRechazo}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmarRechazo}
                  className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-500 font-bold text-xs"
                  disabled={enviandoRechazo}
                >
                  {enviandoRechazo ? 'Guardando...' : 'Confirmar Rechazo'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
