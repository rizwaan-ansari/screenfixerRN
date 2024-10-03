import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('Network Error')) {
          return failureCount < 3;
        }
        if (error instanceof Error && 'status' in error && (error as any).status === 500) {
          return failureCount < 3;
        }
        return false;
      },
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 30, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
    },
    mutations: {
      retry: 2,
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});