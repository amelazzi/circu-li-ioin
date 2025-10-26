import React, { createContext, useReducer, useContext } from "react";
import { alertReducer, initialState } from "./alertReducer";
import type { AlertAction, AlertState } from "../../interfaces";

const AlertContext = createContext<{
  state: AlertState;
  dispatch: React.Dispatch<AlertAction>;
} | null>(null);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlertContext must be used inside AlertProvider");
  return context;
}
