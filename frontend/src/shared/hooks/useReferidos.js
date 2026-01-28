import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../core/api/axiosConfig';
import { toast } from 'react-hot-toast';

export const useReferidos = () => {
  const queryClient = useQueryClient();

  // Obtener árbol completo
  const getArbolCompleto = (usuarioId, maxGeneracion = 4) => {
    return useQuery({
      queryKey: ['referidos', 'arbol', usuarioId, maxGeneracion],
      queryFn: async () => {
        try {
          const response = await api.get(`/referidos/arbol/${usuarioId}`, {
            params: { maxGeneracion }
          });
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener árbol:', error);
          throw error;
        }
      },
      enabled: !!usuarioId,
      staleTime: 2 * 60 * 1000, // 2 minutos
    });
  };

  // Obtener hijos directos
  const getHijosDirectos = (padreId) => {
    return useQuery({
      queryKey: ['referidos', 'hijos', padreId],
      queryFn: async () => {
        try {
          const response = await api.get(`/referidos/padre/${padreId}`);
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener hijos directos:', error);
          throw error;
        }
      },
      enabled: !!padreId,
    });
  };

  // Verificar posiciones disponibles
  const getPosicionesDisponibles = (padreId) => {
    return useQuery({
      queryKey: ['referidos', 'posiciones', padreId],
      queryFn: async () => {
        try {
          const response = await api.get(`/referidos/posiciones/${padreId}`);
          return response.data.data;
        } catch (error) {
          console.error('Error al verificar posiciones:', error);
          throw error;
        }
      },
      enabled: !!padreId,
    });
  };

  // Crear referido
  const crearReferido = useMutation({
    mutationFn: async (data) => {
      try {
        const response = await api.post('/referidos', data);
        return response.data.data;
      } catch (error) {
        console.error('Error al crear referido:', error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ 
        queryKey: ['referidos', 'arbol', variables.usuarioPadreId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['referidos', 'hijos', variables.usuarioPadreId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['referidos', 'posiciones', variables.usuarioPadreId] 
      });
      
      toast.success('Referido asignado exitosamente');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Error al asignar referido';
      toast.error(message);
    },
  });

  return {
    // Queries
    getArbolCompleto,
    getHijosDirectos,
    getPosicionesDisponibles,
    
    // Mutations
    crearReferido,
  };
};