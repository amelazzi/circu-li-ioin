import type { AlertActionType, AlertType } from "../constants/enums";

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

export type AlertAction =
  | { type: typeof AlertActionType.Add; payload: Alert }
  | { type: typeof AlertActionType.Remove; payload: { id: number } };

export type AlertState = {
  alerts: Alert[];
};

export type ActionResult = {
  success: boolean;
  message: string;
};
