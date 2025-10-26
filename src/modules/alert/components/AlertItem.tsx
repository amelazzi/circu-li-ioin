import { Alert as MuiAlert, IconButton } from "@mui/material";
import type { Alert } from "../../../interfaces";
import CloseIcon from "@mui/icons-material/Close";
import { AlertActionType } from "../../../constants/enums";
import { useAlertContext } from "../AlertContext";

export const AlertItem = ({ alert }: { alert: Alert }) => {
  const { dispatch } = useAlertContext();
  return (
    <MuiAlert
      key={alert.id}
      severity={alert.type}
      action={
        <IconButton
          color="inherit"
          size="small"
          onClick={() =>
            dispatch({
              type: AlertActionType.Remove,
              payload: { id: alert.id },
            })
          }
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {alert.message}
    </MuiAlert>
  );
};
