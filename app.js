import express from "express";
import cors from "cors";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.get("/api/recipes", async (req, res) => {
  let allRecipes = await getRecipes();
  res.status(200).json({
    success: true,
    payload: allRecipes,
  });
});

app.post("/api/recipes", async (req, res) => {
  let recipe = await createRecipe(req.body);
  try {
    res.status(200).json({
      success: true,
      payload: recipe,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.patch("/api/recipes/:id", async (req, res) => {
  let recipe = await updateRecipeByID(req.params.id, req.body);
  res.status(200).json({
    success: true,
    payload: recipe,
  });
});
app.delete("/api/recipes/:id", async (req, res) => {
  let recipe = await deleteRecipeByID(req.params.id);
  recipe.status(200).json({
    success: true,
    payload: recipe,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
