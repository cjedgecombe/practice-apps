require("dotenv").config();
const mongoose = require("mongoose");
// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);

// 2. Set up any schema and models needed by the app
const entrySchema = new mongoose.Schema({
  term: String,
  definition: String
});

const Entry = mongoose.model('Entry', entrySchema);

// 3. Export the models
// 4. Import the models into any modules that need them

const saveEntry = (term, definition) => {

  let query = { 'term': term };
  let update = { $setOnInsert: { 'term': term, 'definition': definition }};

  return new Promise((resolve, reject) => {
    Entry.findOneAndUpdate(query, update, { upsert: true })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      console.log('db SAVE error', err);
      reject(err);
    })
  })
}

const updateEntry = (term, newTerm, newDef) => {

  let query = { 'term': term };
  let update = { 'term': newTerm, 'definition': newDef };

  return new Promise((resolve, reject) => {
    Entry.findOneAndUpdate(query, update)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      console.log('db UPDATE error', err);
      reject(err);
    })
  })
}

const getEntries = () => {

  return new Promise((resolve, reject) => {
    Entry.find({})
    .then((entries) => {
      resolve(entries);
    })
    .catch((err) => {
      console.log('db GET error', err);
      reject(err);
    })
  })
}

const deleteEntry = (term) => {

  let query = { 'term': term };

  return new Promise((resolve, reject) => {
    Entry.findOneAndDelete(query)
    .then(() => {
      resolve();
    })
    .catch((err) => {
      console.log('db DELETE error', err);
      reject(err);
    })
  })
}


exports.saveEntry = saveEntry;
exports.getEntries = getEntries;
exports.deleteEntry = deleteEntry;
exports.updateEntry = updateEntry;
