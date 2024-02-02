import React, { createContext, useContext, useState } from "react";

const context = createContext();
const AppContext = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(context);
};

export default AppContext;
