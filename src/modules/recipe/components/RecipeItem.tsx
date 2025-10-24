import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { StepList } from "./StepList";
import { StepModal } from "./StepModal";
import type { Recipe } from "../../../interfaces";
import { useRecipesContext } from "../context/RecipesContext";
import "./RecipeItem.css";

export const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAddStepModal, setOpenAddStepModal] = useState(false);
  const { reorderSteps } = useRecipesContext();

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
          {recipe.steps.length > 0 ? (
            <StepList
              recipeId={recipe.id}
              steps={recipe.steps}
              onReorder={reorderSteps}
            />
          ) : (
            <div>This recipe doesn't contain steps yet </div>
          )}
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
