import { useState } from "react";

export default function PagoModal({ pedidoId, onClose, onPagoExitoso }) {
  const [metodo, setMetodo] = useState("efectivo");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch("/api/pedidos/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pedidoId,
          metodoPago: metodo,
        }),
      });

      if (response.ok) {
        onPagoExitoso(); // Actualiza la tabla del frontend
        onClose();
      } else {
        alert("Error al procesar el pago");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Registrar Pago (RN-06)</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de Pago
            </label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
            >
              <option value="efectivo">Efectivo (Ticket)</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {cargando ? "Procesando..." : "Confirmar Cobro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
