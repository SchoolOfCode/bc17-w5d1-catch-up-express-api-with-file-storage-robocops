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
		})

	} catch (error) {
		console.error(error);
	}
}

// CREATE A RECIPE
export async function createRecipe(newRecipe) {
	try {
		let db = await fs.readFile(fileName, "utf-8")
		let parsedDb = JSON.parse(db);
		parsedDb.push(newRecipe)
		const returnedDb = JSON.stringify(parsedDb)
		return fs.writeFile(fileName, returnedDb, "utf-8")
	} catch (error) {
		console.log(error.message)
	}
}

// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, updatedRecipe) { }

// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) { }


createRecipe(
	{
		"id": "4c848d48-b81e-4d6f-b45d-7b3090f4f8ef",
		"title": "Beans on Toast",
		"ingredients": ["150g of beans", "150g of butter", "150g of toast"],
		"instructions": "Put the butter in your mouth, wait 2 seconds to allow slight melting. Then follow with the toast. Swish around for 10-15 seconds to allow even coating of butter on the toast. Then add the beans, slowly.\n  \n    Season to taste.",
		"image": "https://natashaskitchen.com/wp-content/uploads/2019/04/Best-Burger-4-500x375.jpg"
	}
)