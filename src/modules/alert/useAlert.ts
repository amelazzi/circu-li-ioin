import { useCallback } from "react";
import { useAlertContext } from "./AlertContext";
import { AlertActionType, type AlertType } from "../../constants/enums";
import type { Alert } from "../../interfaces";

export function useAlert() {
  const { state, dispatch } = useAlertContext();

  const showAlert = useCallback(
    (message: string, type: AlertType = "info") => {
      const id = Date.now();
      const alert: Alert = { id, message, type };
      dispatch({ type: AlertActionType.Add, payload: alert });

      setTimeout(() => {
        dispatch({ type: AlertActionType.Remove, payload: { id } });
      }, 3000);
    },
    [dispatch]
  );

  const removeAlert = useCallback(
    (id: number) => {
      dispatch({ type: AlertActionType.Remove, payload: { id } });
    },
    [dispatch]
  );

  return { alerts: state.alerts, showAlert, removeAlert };
}
