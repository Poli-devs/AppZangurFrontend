import React, { useState } from 'react';
import { useUsuarios } from '../../../shared/hooks/useUsuarios';
import { Loader } from '../../../shared/components/Loader';

export const RegistrarAfiliadoForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correo: '',
    direccion: '',
    contrasenia: 'password123', // Contraseña por defecto
    rolId: 4, // Siempre afiliado
  });
  
  const [error, setError] = useState('');
  const { crearUsuario } = useUsuarios();
  const { mutate, isLoading } = crearUsuario;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.cedula || !formData.nombres || !formData.correo) {
      setError('Cédula, nombres y correo son obligatorios');
      return;
    }

    mutate(formData, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
          cedula: '',
          nombres: '',
          primerApellido: '',
          segundoApellido: '',
          telefono: '',
          correo: '',
          direccion: '',
          contrasenia: 'password123',
          rolId: 4,
        });
      },
      onError: (error) => {
        setError(error.response?.data?.message || 'Error al crear usuario');
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-corporate-DEFAULT mb-6">
        👤 Registrar Nuevo Afiliado
      </h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cédula *
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="1234567890"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombres *
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="Juan Carlos"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primer Apellido
              </label>
              <input
                type="text"
                name="primerApellido"
                value={formData.primerApellido}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="Pérez"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Segundo Apellido
              </label>
              <input
                type="text"
                name="segundoApellido"
                value={formData.segundoApellido}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="García"
              />
            </div>
          </div>
          
          {/* Columna 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="0987654321"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="afiliado@ejemplo.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-action-green"
                placeholder="Av. Principal 123"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña (por defecto)
              </label>
              <input
                type="text"
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                El afiliado podrá cambiar su contraseña después
              </p>
            </div>
          </div>
        </div>
        
        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-blue-600 mr-3">💡</div>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> El nuevo afiliado recibirá un correo con sus credenciales. 
                Deberá realizar una compra de producto ($25) antes de poder ser asignado a la red.
              </p>
            </div>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-action-green text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Registrando...
              </div>
            ) : 'Registrar Afiliado'}
          </button>
        </div>
      </form>
    </div>
  );
};