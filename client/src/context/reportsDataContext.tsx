import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { IDData } from "../types/idData";

type DataContextType = {
  data: IDData[];
  setData: React.Dispatch<React.SetStateAction<IDData[]>>;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<IDData[]>([] as IDData[]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
