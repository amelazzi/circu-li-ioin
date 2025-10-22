import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./RecipeItem.css";

export const RecipeItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="recipe-item">
      <div className="recipe-item-header" onClick={toggle}>
        <h3>Recipe name</h3>
        <div className="icon-container">
          <AddOutlinedIcon sx={{ color: "#00cfb4" }} />
        </div>
      </div>
      {isOpen && <div className="recipe-details">Recipe details</div>}
    </div>
  );
};
