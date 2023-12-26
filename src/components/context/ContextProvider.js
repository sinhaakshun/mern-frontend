import React, { createContext, useState } from 'react';

export const addContext = createContext("");
export const updateContext= createContext("");
export const delContext = createContext("");

const ContextProvider = ({ children }) => {
  const [uData, setUData] = useState("");
  const [upData, setUPData] = useState("");
  const [dltData, setDltData] = useState("");

  return (
      <addContext.Provider value={{ uData, setUData }}>
          <updateContext.Provider value={{ upData, setUPData }}>
              <delContext.Provider value={{ dltData, setDltData }}>
                  {children}
              </delContext.Provider>
          </updateContext.Provider>
      </addContext.Provider>
  );
}

export default ContextProvider;
