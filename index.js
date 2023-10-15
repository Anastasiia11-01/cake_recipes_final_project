'use strict';

const cakeRecipes = require("./cake-recipes.json");

// console.log(cakeRecipes[0]);

// Your functions here
// 1
const recipesAuthors = (recipes) => {
  const authors = [];
  recipes.forEach(({Author}) => {
    if (!authors.includes(Author)) {  
      authors.push(Author)};
  });
  return authors;
};

// console.log(recipesAuthors(cakeRecipes));
// 2 & 3
const recipesNames = (recipes) =>{
  if (recipes.length === 0){
    console.log("There are no recipes found.");
  }else{
    for(const recipe of recipes){
      console.log(recipe.Name);
    }
  }
};

// recipesNames(cakeRecipes);

// 2
const authorRecipes = (recipes, author) =>{
  const filteredRecipes = recipes.filter(({Author}) => Author.toLowerCase() === author.toLowerCase());

  if (filteredRecipes.length === 0){
    console.log(author + " has no recipes in the given list.");
  }
  
  return filteredRecipes;
};

// console.log(authorRecipes(cakeRecipes, "Good food"));
// console.log(recipesNames(authorRecipes(cakeRecipes, "Good food")));
// 3
const ingredientRecipes = (recipes, ingredient) =>{
  const filteredRecipes = recipes.filter(({Ingredients}) => Ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase())));
  
  return filteredRecipes;
};

// console.log(ingredientRecipes(cakeRecipes, "caster sugar"));
// console.log(recipesNames(ingredientRecipes(cakeRecipes, "140g caster sugar")));
// 4
const savedRecipes = [];

const nameRecipe = (recipes, name) => {
  const nameParts = name.toLowerCase().split(" ");
  const filteredRecipes = recipes.filter(recipe => !savedRecipes.includes(recipe));
  const foundNameRecipe = filteredRecipes.find(({ Name }) => {
    const normalizedName = Name.toLowerCase();
    return nameParts.every(part => normalizedName.includes(part));
  });

  if (foundNameRecipe === undefined){
    console.log("No recipe found with the given name.");
  }else{
    return foundNameRecipe;
  }
};


// console.log(nameRecipe(cakeRecipes, "buyfuy"));


// 5
const recipeIngredientsList = (savedRecipes) => {
  if(savedRecipes.length !== 0){
    const ingredientQuantities = savedRecipes.reduce((acc, recipe) => {
      recipe.Ingredients.forEach((ingredient) => {
        const normIngredient = ingredient.toLowerCase();
        acc[normIngredient] = (acc[normIngredient] || 0) + 1;
      });
      return acc;
    
    }, {});
    return ingredientQuantities; 
  }else{
    return {};
  }
};

console.log(recipeIngredientsList(savedRecipes));

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(`Here are all authors:`);
      console.log(recipesAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter your author's name:");
      console.log(`These are recipes of ${author}:`);
      recipesNames(authorRecipes(cakeRecipes, author));
      break;
    case 3:
      const ingredient = prompt("Enter your ingredient:");
      console.log(`These are recipes with ${ingredient}:`);
      recipesNames(ingredientRecipes(cakeRecipes, ingredient));
      break;
    case 4:
      const recipeName = prompt("Enter the name of the recipe you're looking for:");
      console.log(`This is a recipe containing ${recipeName} in it's name:`);
      const recipe = nameRecipe(cakeRecipes, recipeName)
      console.log(recipe);
      
      const recipeToSave = prompt("Do you want to save the recipe (Y/N)?");
      if (recipeToSave.toLowerCase() === "y" && !savedRecipes.includes(recipe))
      {savedRecipes.push(recipe);
      console.log(`Recipe "${recipe.Name}" saved!`);
      };
      break;
    case 5:
      console.log(`These are ingredients from the saved recipes list:`);
      console.log(recipeIngredientsList(savedRecipes));
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
