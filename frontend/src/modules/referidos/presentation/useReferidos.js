import { useQueryClient } from '@tanstack/react-query';
import { referidosQueries } from '../../infrastructure/queries/referidosQueries';
import { useEffect } from 'react';

// 👨‍🏫 EXPLICACIÓN: Custom hook que actúa como adaptador entre React Query y la UI
export const useReferidos = () => {
  const queryClient = useQueryClient();

  // 👨‍🏫 EXPLICACIÓN: Inicializar el queryClient en las queries
  useEffect(() => {
    referidosQueries.setQueryClient(queryClient);
  }, [queryClient]);

  // 👨‍🏫 EXPLICACIÓN: Métodos expuestos a la UI
  return {
    // Queries (reactivas, se actualizan automáticamente)
    useGetArbolCompleto: (usuarioId, maxGeneracion) => 
      referidosQueries.useGetArbolCompleto(usuarioId, maxGeneracion),
    
    useGetHijosDirectos: (padreId) => 
      referidosQueries.useGetHijosDirectos(padreId),
    
    useGetPosicionesDisponibles: (padreId) => 
      referidosQueries.useGetPosicionesDisponibles(padreId),
    
    // Mutations (acciones que modifican datos)
    useCrearReferido: () => 
      referidosQueries.useCrearReferido(),
    
    // Utilidades
    clearCache: () => 
      referidosQueries.clearReferidosCache(),
  };
};