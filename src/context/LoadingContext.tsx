"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { createContext, useState } from "react";

interface LoadingProviderProps {
  isLoading: boolean;
  toggle: () => void;
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
      {isLoading && (
        <div
          className="flex justify-center items-center h-screen w-screen z-10 absolute"
          style={{ backgroundColor: "rgb(0 0 0 / 34%)" }}
        >
          <CircularProgress />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}
