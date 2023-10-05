import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const addData = (newData) => {
    setData([...data, newData]);
  };

  return (
    <DataContext.Provider value={{ data, addData }}>
      {children}
    </DataContext.Provider>
  );
}
