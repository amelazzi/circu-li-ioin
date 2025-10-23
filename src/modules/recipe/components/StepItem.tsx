import { StepType } from "../../../constants/enums";
import type { Step, TakeImageStep, UnscrewingStep } from "../../../interfaces";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRecipesContext } from "../../../recipe/context/RecipesContext";
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
      <div className="step-info">
        <p>
          {step.type === StepType.TakeImage
            ? (step as TakeImageStep).takeImageType
            : (step as UnscrewingStep).unscrewingType}
        </p>
        {step.coords && (
          <p> {`coords: (x: ${step.coords.x}, y: ${step.coords.y})`}</p>
        )}
        <p> point cloud </p>
      </div>
      <div
        className="icon-container"
        onClick={() => removeStep(recipeId, step.id)}
      >
        <DeleteForeverIcon sx={{ color: "red" }} />
      </div>
    </div>
  );
};
