import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/recipes", async (req, res) => {
  let allRecipes = await getRecipes();
	res.status(200).json({
    success: true,
    payload: allRecipes
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
