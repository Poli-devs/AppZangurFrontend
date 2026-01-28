import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../core/api/axiosConfig';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  isActive: boolean;
  createdAt: string;
}

interface CreateProductDto {
  nombre: string;
  descripcion: string;
  precio: number;
}

// Hook para listar productos
export const useProducts = (options?: { 
  page?: number; 
  limit?: number; 
  soloActivos?: boolean 
}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.page) params.append('page', options.page.toString());
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.soloActivos) params.append('soloActivos', 'true');
      
      const response = await api.get(`/productos?${params.toString()}`);
      return response.data;
    },
  });
};

// Hook para productos activos (para ventas)
export const useActiveProducts = () => {
  return useQuery({
    queryKey: ['products', 'active'],
    queryFn: async () => {
      const response = await api.get('/productos/activos');
      return response.data;
    },
  });
};

// Hook para crear producto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, CreateProductDto>({
    mutationFn: async (productData) => {
      const response = await api.post<Product>('/productos', productData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar queries de productos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};