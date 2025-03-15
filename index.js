const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://yerkoarcegalaz:Brd7tkNL2GATAMxX@openbootcamp.8xxrw.mongodb.net/?retryWrites=true&w=majority&appName=openbootcamp'



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
    Recipe.create({
      title: 'Primera receta',
      level: 'Amateur Chef',
      ingredients: ['algo', 'algo mas', 'Otra cosa mas'],
      cuisine: 'Cocina',
      dishType: 'breakfast',
      duration: 5,
      creator: 'Yerko Arce'
      })
      .then(recipe => {
        console.log('Recipe created', recipe.title)
        mongoose.connection.close()
      })
      .catch(error => console.log(`Error creating recipe: ${error}`));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
