import { StepType } from "../../../constants/enums";
import type { Step, TakeImageStep, UnscrewingStep } from "../../../interfaces";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRecipesContext } from "../../recipe/context/RecipesContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./StepItem.css";

export const StepItem = ({
  step,
  recipeId,
}: {
  step: Step;
  recipeId: number;
}) => {
  const { removeStep } = useRecipesContext();

  return (
    <div className="step-item">
      <div className="step-header">
        <DragIndicatorIcon fontSize="small" />
        <div className="step-columns">
          <div className="step-col type">
            {step.type === StepType.TakeImage
              ? (step as TakeImageStep).takeImageType
              : (step as UnscrewingStep).unscrewingType}
          </div>

          <div className="step-col coords">
            {step.coords
              ? `coords: (x: ${step.coords.x}, y: ${step.coords.y})`
              : "—"}
          </div>
          <div className="step-col pointcloud">
            {step.type === StepType.TakeImage &&
            (step as TakeImageStep).pointCloud
              ? "Yes"
              : "No"}
          </div>
        </div>
      </div>

      <div
        className="icon-container"
        onClick={() => removeStep(recipeId, step.id)}
      >
        <DeleteForeverIcon sx={{ color: "red" }} fontSize="small" />
      </div>
    </div>
  );
};
