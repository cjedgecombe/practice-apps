require("dotenv").config();
const db = require('./db.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});



app.post('/entries', (req, res) => {
  // take term and definition information from the request (req.body.data.X)
  let _term = req.body.data.term;
  let _definition = req.body.data.definition;
  // create a new entry and add it to the database

  console.log(req.body);

  db.saveEntry(_term, _definition)
  .then(() => {
    // respond with 201 success if no error
    res.status(201).end();
  })
  .catch((err) => {
    // respond with internal server error if error
    res.status(500).end();
  })
})

app.patch('/entries', (req, res) => {

  console.log('patch data', req.body.data);
  let _term = req.body.data.term;
  let _newTerm = req.body.data.newTerm;
  let _newDef = req.body.data.newDef;

  db.updateEntry(_term, _newTerm, _newDef)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    res.status(500).end();
  })
})

app.get('/entries', (req, res) => {
  db.getEntries()
  .then((allEntries) => {
    res.status(200).send(allEntries);
  })
  .catch((err) => {
    res.status(500).end();
  })
})

app.delete('/entries', (req, res) => {

  let _term = req.body.term;

  db.deleteEntry(_term)
  .then(() => {
    res.status(200).end();
  })
  .catch((err) => {
    res.status(500).end();
  })
})