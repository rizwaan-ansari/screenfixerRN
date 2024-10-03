import React, { useReducer } from 'react';

interface ContextData {
  editIssueDetails?: boolean;
  repairRequestItem?: any;
  editIMEINumber?: boolean;
  addImages?: string[] | null;
  editBeforeRepair?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const ContextDataDefaultValues = {
  editIssueDetails: false,
  repairRequestItem: null,
  editIMEINumber: false,
  addImages: [],
  editBeforeRepair: false,
  isLoading: false,
  isError: false,
}

export interface ContextValue {
  contextData: ContextData;
  setContextData: React.Dispatch<React.SetStateAction<ContextData>>
}

interface AppDataProviderProps {
  children: React.ReactNode;
}

interface AppDataState {
  [key: string]: any;
}

type AppDataAction = Partial<AppDataState>
export const ContextData = React.createContext<ContextValue>({
  contextData: ContextDataDefaultValues,
  setContextData: () => {}
});


const DataContextProvider = ({ children }: AppDataProviderProps) => {
  const [contextData, setContextData] = useReducer(
      (state: ContextData, newState: React.SetStateAction<ContextData>) => ({ ...state, ...newState }), ContextDataDefaultValues
  );
  const contextValue: ContextValue = { contextData, setContextData };
  return <ContextData.Provider value={contextValue}>{children}</ContextData.Provider>;
};

export default DataContextProvider;
