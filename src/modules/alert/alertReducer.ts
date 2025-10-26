import { AlertActionType } from "../../constants/enums";
import type { AlertAction, AlertState } from "../../interfaces";

export const initialState: AlertState = { alerts: [] };

export function alertReducer(
  state: AlertState,
  action: AlertAction
): AlertState {
  switch (action.type) {
    case AlertActionType.Add:
      return { ...state, alerts: [...state.alerts, action.payload] };
    case AlertActionType.Remove:
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id !== action.payload.id),
      };
    default:
      return state;
  }
}
