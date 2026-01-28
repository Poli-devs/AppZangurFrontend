import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../core/api/axiosConfig';

interface Pyramid {
  id: string;
  numero: number;
  descripcion: string;
  maxRamas: number; // Siempre 2 (binario)
  isActive: boolean;
}

interface CreatePyramidDto {
  numero: number;
  descripcion: string;
  maxRamas: number;
}

// Hook para listar pirámides
export const usePyramids = (options?: { 
  page?: number; 
  limit?: number; 
  soloActivas?: boolean 
}) => {
  return useQuery({
    queryKey: ['pyramids', options],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (options?.page) params.append('page', options.page.toString());
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.soloActivas) params.append('soloActivas', 'true');
      
      const response = await api.get(`/piramides?${params.toString()}`);
      return response.data;
    },
  });
};

// Hook para árbol binario de referidos
export const useReferralTree = (userId: string, maxGeneracion?: number) => {
  return useQuery({
    queryKey: ['referral-tree', userId, maxGeneracion],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (maxGeneracion) params.append('maxGeneracion', maxGeneracion.toString());
      
      const response = await api.get(`/referidos/arbol/${userId}?${params.toString()}`);
      return response.data;
    },
    enabled: !!userId,
  });
};