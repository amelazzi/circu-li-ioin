import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./RecipeItem.css";
import type { Recipe } from "../../../../interfaces";

type RecipeItemProps = {
  recipe: Recipe;
};

export const RecipeItem = ({ recipe }: RecipeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="recipe-item">
      <div className="recipe-item-header" onClick={toggle}>
        <h3>{recipe.name}</h3>
        <div className="icon-container">
          <AddOutlinedIcon sx={{ color: "#00cfb4" }} />
        </div>
      </div>
      {isOpen && <div className="recipe-details">Recipe details</div>}
    </div>
  );
};
