const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { ReturnDocument } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://yerkoarcegalaz:Brd7tkNL2GATAMxX@openbootcamp.8xxrw.mongodb.net/?retryWrites=true&w=majority&appName=openbootcamp'


async function manageRecipes() {
  try {
    // Connection to the database "recipe-app"
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${mongoose.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Insert new recipes
    const recipes = await Recipe.insertMany(data)
    console.log('Recipes created!!')
    recipes.forEach(recipe => {
      console.log(recipe.title)
    })

    // Update recipe duration
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true } 
    );
  
    if (updatedRecipe) {
      console.log('Recipe updated:', updatedRecipe);
    } else {
      console.log("Recipe not found");
    }
    

    // Delete one recipe
    const result = await Recipe.deleteOne({ title: 'Carrot Cake' });

    if (result.deletedCount > 0) {
      console.log('Recipe removed!');
    } else {
      console.log("Recipe not found.");
    }

    // Disconnect from the database
    await mongoose.disconnect();

  } catch (error) {
    console.error('Error: ', error);
  }
}

manageRecipes()

/*
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data)
      .then(recipes => {
        console.log('Recipes created')
        recipes.forEach(recipe => {
          console.log(recipe.title)
        })
        mongoose.connection.close()
      })
      .catch(error => console.log(`Error adding recipe: ${error}`));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
*/