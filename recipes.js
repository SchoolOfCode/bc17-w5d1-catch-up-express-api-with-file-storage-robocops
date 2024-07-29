import { error } from "node:console";
import * as fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// GET ALL RECIPES
export async function getRecipes() {
  try {
    let db = await fs.readFile(fileName, "utf-8");
    let parsedDb = JSON.parse(db);
    return parsedDb;
  } catch (error) {
    console.error(error);
  }
}

// GET A RECIPE BY ID
export async function getRecipeByID(id) {
  try {
    let db = await fs.readFile(fileName, "utf-8");
    let parsedDb = JSON.parse(db);

    return parsedDb.find((el) => {
      return el.id === id;
    });
  } catch (error) {
    console.error(error);
  }
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
  try {
    let db = await fs.readFile(fileName, "utf-8");
    let parsedDb = JSON.parse(db);
    if (
      newRecipe.title &&
      newRecipe.ingredients &&
      newRecipe.instructions &&
      newRecipe.image
    ) {
      parsedDb.push({
        ...newRecipe,
        id: uuidv4(),
      });
    } else {
      return null;
    }

    const returnedDb = JSON.stringify(parsedDb);
    return fs.writeFile(fileName, returnedDb, "utf-8");
  } catch (error) {
    console.log(error.message);
  }
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) {
  try {
    let db = await fs.readFile(fileName, "utf-8");
    let parsedDb = JSON.parse(db);
    let index = parsedDb.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error("Recipe not found");
    }
    parsedDb[index] = {
      id: id,
      title: updatedRecipe.title,
      ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.ingredients,
      image: updatedRecipe.image,
    };
    await fs.writeFile(fileName, JSON.stringify(parsedDb), "utf-8");
    return parsedDb[index];
  } catch (error) {
    console.error(error);
  }
}

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
  try {
    let db = await fs.readFile(fileName, "utf-8");
    let parsedDb = JSON.parse(db);
    const index = parsedDb.findIndex((recipe) => recipe.id === id);
    if (index === -1) {
      throw new Error("Recipe not found");
    }
    let deleteRecipe = parsedDb.splice(index, 1);
    await fs.writeFile(fileName, JSON.stringify(parsedDb), "utf-8");
    return deleteRecipe;
  } catch (error) {
    console.error(error);
  }
}
