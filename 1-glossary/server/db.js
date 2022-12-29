require("dotenv").config();
const mongoose = require("mongoose");
// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/glossary');

// 2. Set up any schema and models needed by the app
const entrySchema = new mongoose.Schema({
  term: String,
  definition: String
});

const Entry = mongoose.model('Entry', entrySchema);

// 3. Export the models
// 4. Import the models into any modules that need them
