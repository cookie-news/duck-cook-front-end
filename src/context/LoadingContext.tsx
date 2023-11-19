"use client";

import { createContext, useState } from "react";

interface LoadingProviderProps {
  isLoading: boolean;
  toggle: (loading?: boolean) => void;
}

export const LoadingContext = createContext({
  isLoading: false,
} as LoadingProviderProps);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggle = () => {
    setIsLoading((state) => !state);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, toggle: handleToggle }}>
      {children}
    </LoadingContext.Provider>
  );
}
