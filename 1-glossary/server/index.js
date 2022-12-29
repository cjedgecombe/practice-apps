require("dotenv").config();
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.listen(3000, () => {
  console.log('listening on port 3000');
});
