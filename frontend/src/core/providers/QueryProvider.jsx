import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

// Configurar React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos antes de considerar datos "stale"
      gcTime: 10 * 60 * 1000, // 10 minutos en cache
      retry: 1, // Reintentar 1 vez si falla
      refetchOnWindowFocus: false, // No refetch al cambiar de ventana
    },
    mutations: {
      retry: 1,
    },
  },
});

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};