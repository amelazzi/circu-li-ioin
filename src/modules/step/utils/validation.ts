import {
  StepType,
  TakeImageType,
  UnscrewingType,
} from "../../../constants/enums";
import type { Step, TakeImageStep, UnscrewingStep } from "../../../interfaces";
import type { Coordinates } from "../../../interfaces/coordinates";

export const validateCoords = (coords: Coordinates) => {
  return coords.x >= 0 && coords.y >= 0;
};

export function validateStep(step: Step): boolean {
  switch (step.type) {
    case StepType.TakeImage: {
      const takeImageStep = step as TakeImageStep;
      if (!takeImageStep.takeImageType) return false;
      if (takeImageStep.takeImageType === TakeImageType.SectionImage) {
        return (
          takeImageStep.coords !== undefined &&
          validateCoords(takeImageStep.coords)
        );
      }
      return true;
    }
    case StepType.Unscrewing: {
      const unscrewingStep = step as UnscrewingStep;
      if (!unscrewingStep.unscrewingType) return false;
      if (unscrewingStep.unscrewingType === UnscrewingType.Specific) {
        return (
          unscrewingStep.coords !== undefined &&
          validateCoords(unscrewingStep.coords)
        );
      }
      return true;
    }
    default:
      return false;
  }
}
