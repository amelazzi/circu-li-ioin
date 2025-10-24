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
