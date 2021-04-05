import React from "react";
import { createContext, FC } from "react";

export const Context = createContext(null);

export const Provider: FC = ({ children }) => {
  const [sequenceLength, setSequenceLength] = React.useState(16);
  return (
    <Context.Provider
      value={{
        sequenceLength,
      }}
    >
      {children}
    </Context.Provider>
  );
};
