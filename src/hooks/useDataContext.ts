import { useContext } from "react";
import { ContextData } from "../providers/ContextProvider";

export const useDataContext = () => {
    const context = useContext(ContextData);
    if (context === undefined) {
      throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
  };