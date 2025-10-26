export const StepType = {
  TakeImage: "takeImage",
  Unscrewing: "unscrewing",
} as const;
export type StepType = (typeof StepType)[keyof typeof StepType];

export const TakeImageType = {
  FullImage: "fullImage",
  SectionImage: "sectionImage",
} as const;
export type TakeImageType = (typeof TakeImageType)[keyof typeof TakeImageType];

export const UnscrewingType = {
  Automatic: "automatic",
  Specific: "specific",
} as const;
export type UnscrewingType =
  (typeof UnscrewingType)[keyof typeof UnscrewingType];

export const AlertType = {
  Success: "success",
  Error: "error",
  Info: "info",
  Warning: "warning",
} as const;
export type AlertType = (typeof AlertType)[keyof typeof AlertType];

export const AlertActionType = {
  Add: "ADD_ALERT",
  Remove: "REMOVE_ALERT",
} as const;
export type AlertActionType =
  (typeof AlertActionType)[keyof typeof AlertActionType];
