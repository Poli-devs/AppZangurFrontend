import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../core/api/axiosConfig';
import { toast } from 'react-hot-toast';

// 👨‍🏫 EXPLICACIÓN: Query keys organizan el cache en React Query
export const REFERIDOS_QUERY_KEYS = {
  all: ['referidos'],
  arbol: (usuarioId, maxGeneracion) => 
    ['referidos', 'arbol', usuarioId, maxGeneracion],
  hijosDirectos: (padreId) => 
    ['referidos', 'hijos', padreId],
  posiciones: (padreId) => 
    ['referidos', 'posiciones', padreId],
};

// 👨‍🏫 EXPLICACIÓN: Clase que encapsula todas las operaciones de referidos
export class ReferidosQueries {
  constructor() {
    this.queryClient = null;
  }

  // 👨‍🏫 EXPLICACIÓN: Inicializar con queryClient (se hace en el provider)
  setQueryClient(queryClient) {
    this.queryClient = queryClient;
  }

  // ============ QUERIES (GET) ============

  // Obtener árbol completo
  useGetArbolCompleto(usuarioId, maxGeneracion = 5) {
    return useQuery({
      queryKey: REFERIDOS_QUERY_KEYS.arbol(usuarioId, maxGeneracion),
      queryFn: async () => {
        try {
          const response = await api.get(
            `/referidos/arbol/${usuarioId}`, 
            { params: { maxGeneracion } }
          );
          return response.data.data;
        } catch (error) {
          // 👨‍🏫 EXPLICACIÓN: Manejo centralizado de errores
          throw this.handleError(error, 'Error al cargar el árbol');
        }
      },
      enabled: !!usuarioId, // 👨‍🏫 Solo ejecuta si usuarioId existe
      staleTime: 2 * 60 * 1000, // 👨‍🏫 2 minutos antes de considerar datos "stale"
      retry: 2, // 👨‍🏫 Reintentar 2 veces si falla
    });
  }

  // Obtener hijos directos
  useGetHijosDirectos(padreId) {
    return useQuery({
      queryKey: REFERIDOS_QUERY_KEYS.hijosDirectos(padreId),
      queryFn: async () => {
        try {
          const response = await api.get(`/referidos/padre/${padreId}`);
          return response.data.data;
        } catch (error) {
          throw this.handleError(error, 'Error al cargar hijos directos');
        }
      },
      enabled: !!padreId,
    });
  }

  // Verificar posiciones disponibles
  useGetPosicionesDisponibles(padreId) {
    return useQuery({
      queryKey: REFERIDOS_QUERY_KEYS.posiciones(padreId),
      queryFn: async () => {
        try {
          const response = await api.get(`/referidos/posiciones/${padreId}`);
          return response.data.data;
        } catch (error) {
          throw this.handleError(error, 'Error al verificar posiciones');
        }
      },
      enabled: !!padreId,
    });
  }

  // ============ MUTATIONS (POST/PUT/DELETE) ============

  // Crear referido
  useCrearReferido() {
    return useMutation({
      mutationFn: async (data) => {
        try {
          // 👨‍🏫 EXPLICACIÓN: Validación antes de enviar
          this.validarDataReferido(data);
          
          const response = await api.post('/referidos', data);
          return response.data.data;
        } catch (error) {
          throw this.handleError(error, 'Error al crear referido');
        }
      },
      onSuccess: (data, variables) => {
        // 👨‍🏫 EXPLICACIÓN: Invalidar cache después de mutación exitosa
        this.invalidateQueriesAfterMutation(variables.usuarioPadreId);
        toast.success('Referido asignado exitosamente');
      },
      onError: (error) => {
        // 👨‍🏫 EXPLICACIÓN: Toast ya se maneja en handleError
        console.error('Mutation error:', error);
      },
    });
  }

  // ============ MÉTODOS PRIVADOS/HELPERS ============

  // Validación de datos antes de enviar
  validarDataReferido(data) {
    const { usuarioPadreId, usuarioHijoId, posicion } = data;
    
    if (!usuarioPadreId || !usuarioHijoId || !posicion) {
      throw new Error('Todos los campos son requeridos');
    }
    
    if (posicion !== 'izquierda' && posicion !== 'derecha') {
      throw new Error('Posición debe ser "izquierda" o "derecha"');
    }
    
    if (usuarioPadreId === usuarioHijoId) {
      throw new Error('No puede asignarse a sí mismo');
    }
  }

  // Manejo centralizado de errores
  handleError(error, defaultMessage) {
    let message = defaultMessage;
    
    if (error.response) {
      // Error de API (400, 401, 500, etc.)
      const apiMessage = error.response.data?.message;
      if (apiMessage) {
        message = apiMessage;
      }
      
      // 👨‍🏫 EXPLICACIÓN: Toast específico por tipo de error
      if (error.response.status === 401) {
        message = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
      } else if (error.response.status === 403) {
        message = 'No tiene permisos para realizar esta acción';
      } else if (error.response.status === 404) {
        message = 'Recurso no encontrado';
      } else if (error.response.status === 422) {
        message = 'Datos inválidos. Verifique la información';
      }
    } else if (error.request) {
      // Error de red (sin respuesta del servidor)
      message = 'Error de conexión. Verifique su internet';
    }
    
    // Mostrar toast con el error
    toast.error(message);
    
    // Retornar error para que React Query lo maneje
    return new Error(message);
  }

  // Invalidar queries relacionadas después de mutación
  invalidateQueriesAfterMutation(padreId) {
    if (!this.queryClient) return;
    
    this.queryClient.invalidateQueries({ 
      queryKey: REFERIDOS_QUERY_KEYS.arbol(padreId) 
    });
    this.queryClient.invalidateQueries({ 
      queryKey: REFERIDOS_QUERY_KEYS.hijosDirectos(padreId) 
    });
    this.queryClient.invalidateQueries({ 
      queryKey: REFERIDOS_QUERY_KEYS.posiciones(padreId) 
    });
  }

  // 👨‍🏫 EXPLICACIÓN: Método para limpiar cache específico
  clearReferidosCache() {
    if (!this.queryClient) return;
    this.queryClient.removeQueries({ queryKey: REFERIDOS_QUERY_KEYS.all });
  }
}

// 👨‍🏫 EXPLICACIÓN: Instancia singleton para usar en toda la app
export const referidosQueries = new ReferidosQueries();