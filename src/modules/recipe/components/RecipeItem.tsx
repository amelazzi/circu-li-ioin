import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./RecipeItem.css";
import type { Recipe } from "../../../interfaces";
import { StepItem } from "./StepItem";
import { StepModal } from "./StepModal";

export const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAddStepModal, setOpenAddStepModal] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="recipe-item">
      <div className="recipe-item-header">
        <div className="recipe-name-container" onClick={toggle}>
          <h3>{recipe.name}</h3>
        </div>
        <div
          className="icon-container"
          onClick={() => setOpenAddStepModal(true)}
        >
          <AddOutlinedIcon sx={{ color: "#00cfb4" }} />
        </div>
      </div>
      {isOpen && (
        <div className="recipe-details">
          {recipe.steps.map((step) => (
            <StepItem key={step.id} recipeId={recipe.id} step={step} />
          ))}
        </div>
      )}
      <StepModal
        isOpen={openAddStepModal}
        recipeId={recipe.id}
        onClose={() => setOpenAddStepModal(false)}
      />
    </div>
  );
};
