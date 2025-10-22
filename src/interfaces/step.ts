import type {
  StepType,
  TakeImageType,
  UnscrewingType,
} from "../constants/enums";
import type { Coordinates } from "./coordinates";

export type TakeImageStep = {
  id: number;
  order: number;
  type: typeof StepType.TakeImage;
  pointCloud: boolean;
  takeImageType: TakeImageType;
  coords?: Coordinates;
};

export type UnscrewingStep = {
  id: number;
  order: number;
  type: typeof StepType.Unscrewing;
  unscrewingType: UnscrewingType;
  coords?: Coordinates;
};

export type Step = TakeImageStep | UnscrewingStep;
