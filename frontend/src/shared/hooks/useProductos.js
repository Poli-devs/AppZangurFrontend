import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../core/api/axiosConfig';
import { toast } from 'react-hot-toast';

export const PRODUCTOS_QUERY_KEYS = {
  all: ['productos'],
  list: () => ['productos', 'list'],
  byId: (id) => ['productos', 'detail', id],
  activos: ['productos', 'activos'],
};

export const useProductos = () => {
  const queryClient = useQueryClient();

  const getProductos = (params = {}) => {
    return useQuery({
      queryKey: [...PRODUCTOS_QUERY_KEYS.list(), params],
      queryFn: async () => {
        try {
          const response = await api.get('/productos', { params });
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener productos:', error);
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutos
    });
  };

  const getProductosActivos = () => {
    return useQuery({
      queryKey: PRODUCTOS_QUERY_KEYS.activos,
      queryFn: async () => {
        try {
          const response = await api.get('/productos/activos');
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener productos activos:', error);
          throw error;
        }
      },
      staleTime: 10 * 60 * 1000, // 10 minutos
    });
  };

  const getProductoById = (id) => {
    return useQuery({
      queryKey: PRODUCTOS_QUERY_KEYS.byId(id),
      queryFn: async () => {
        try {
          const response = await api.get(`/productos/${id}`);
          return response.data.data;
        } catch (error) {
          console.error(`Error al obtener producto ${id}:`, error);
          throw error;
        }
      },
      enabled: !!id,
    });
  };

  const crearProducto = useMutation({
    mutationFn: async (productoData) => {
      try {
        const response = await api.post('/productos', productoData);
        return response.data.data;
      } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.all });
      toast.success('Producto creado exitosamente');
    },
  });

  const actualizarProducto = useMutation({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await api.put(`/productos/${id}`, data);
        return response.data.data;
      } catch (error) {
        console.error(`Error al actualizar producto ${id}:`, error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.byId(variables.id) });
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.activos });
      toast.success('Producto actualizado');
    },
  });

  const activarProducto = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.patch(`/productos/${id}/activar`);
        return response.data.data;
      } catch (error) {
        console.error(`Error al activar producto ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.activos });
      toast.success('Producto activado');
    },
  });

  const desactivarProducto = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.patch(`/productos/${id}/desactivar`);
        return response.data.data;
      } catch (error) {
        console.error(`Error al desactivar producto ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRODUCTOS_QUERY_KEYS.activos });
      toast.success('Producto desactivado');
    },
  });

  return {
    // Queries
    getProductos,
    getProductosActivos,
    getProductoById,
    
    // Mutations
    crearProducto,
    actualizarProducto,
    activarProducto,
    desactivarProducto,
  };
};