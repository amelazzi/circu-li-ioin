import { StepType } from "../../../constants/enums";
import type { Step, TakeImageStep, UnscrewingStep } from "../../../interfaces";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRecipesContext } from "../../recipe/RecipesContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import "./StepItem.css";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

type StepItemProps = {
  step: Step;
  recipeId: number;
  dragHandleProps?: any;
};

export const StepItem = ({
  step,
  recipeId,
  dragHandleProps,
}: StepItemProps) => {
  const { removeStep } = useRecipesContext();
  const { t } = useTranslation();

  return (
    <div className="step-item">
      <div className="step-header">
        <div {...dragHandleProps} className="icon-container drag">
          <DragIndicatorIcon fontSize="small" />
        </div>

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
              ? `${t("yes")}`
              : `${t("no")}`}
          </div>
        </div>
      </div>

      <Tooltip title={t("home.stepItem.delete")} arrow>
        <div
          className="icon-container"
          onClick={() => removeStep(recipeId, step.id)}
        >
          <DeleteForeverIcon sx={{ color: "red" }} fontSize="small" />
        </div>
      </Tooltip>
    </div>
  );
};
