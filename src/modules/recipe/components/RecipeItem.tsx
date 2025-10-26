import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { StepList } from "./StepList";
import { StepModal } from "./StepModal";
import type { Recipe } from "../../../interfaces";
import { useRecipesContext } from "../RecipesContext";
import "./RecipeItem.css";
import { validateRecipe } from "../validation";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { useAlert } from "../../alert/useAlert";
import { AlertType } from "../../../constants/enums";

export const RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAddStepModal, setOpenAddStepModal] = useState(false);
  const { reorderSteps } = useRecipesContext();
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleExport = (recipe: Recipe) => {
    if (!validateRecipe(recipe)) {
      showAlert(`${t("home.recipeItem.exportFailed")}`, AlertType.Error);
      return;
    }

    const dataStr = JSON.stringify(recipe, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${recipe.name}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="recipe-item">
      <div className="recipe-item-header">
        <div className="recipe-name-container" onClick={toggle}>
          <h3>{recipe.name}</h3>
        </div>
        <div className="recipe-icons">
          <Tooltip title={t("home.recipeItem.export")} arrow>
            <div
              className="icon-container"
              onClick={() => handleExport(recipe)}
            >
              <FileDownloadIcon sx={{ color: "#00cfb4" }} />
            </div>
          </Tooltip>
          <Tooltip title={t("home.recipeItem.newStep")} arrow>
            <div
              className="icon-container"
              onClick={() => setOpenAddStepModal(true)}
            >
              <AddOutlinedIcon sx={{ color: "#00cfb4" }} />
            </div>
          </Tooltip>
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
            <div>{t("home.recipeItem.emptySteps")} </div>
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
