import type { Step } from "./step";

export type Recipe = {
  id: number;
  name: string;
  steps: Step[];
};
