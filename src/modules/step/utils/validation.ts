import type { Coordinates } from "../../../interfaces/coordinates";

export const validateCoords = (coords: Coordinates) => {
  return coords.x >= 0 && coords.y >= 0;
};
