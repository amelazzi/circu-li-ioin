import { useEffect } from "react";
import { Stack } from "@mui/material";
import { useAlertContext } from "../AlertContext";
import { AlertActionType } from "../../../constants/enums";
import { AlertItem } from "./AlertItem";

export const AlertList = () => {
  const { state, dispatch } = useAlertContext();

  useEffect(() => {
    const timers = state.alerts.map((alert) =>
      setTimeout(() => {
        dispatch({ type: AlertActionType.Remove, payload: { id: alert.id } });
      }, 3000)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [state.alerts, dispatch]);

  return (
    <Stack
      spacing={1}
      sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 9999 }}
    >
      {state.alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </Stack>
  );
};
