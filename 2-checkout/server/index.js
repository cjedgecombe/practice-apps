require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

app.use(express.json());

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.post('/form1', (req, res) => {
  // get data sent to server
  var session_id = req.session_id;
  var name = req.body.data.name;
  var email = req.body.data.email;
  var password = req.body.data.password;

  // query the database and insert a new record
  // respond with success/failure
  insertNew(session_id, name, email, password)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log('form 1 save error', err);
    res.status(500).end();
  })
})

app.post('/form2', (req, res) => {
  let shippingInfo = {
    'session': req.session_id,
    'address1': req.body.data.address1,
    'address2': req.body.data.address2,
    'city': req.body.data.city,
    'state': req.body.data.state,
    'zip': req.body.data.zip,
    'phone': req.body.data.phone
  }

  addShipping(shippingInfo)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log('form 2 save error', err);
    res.status(500).end();
  })
})

app.post('/form3', (req, res) => {
  let billingInfo = {
    'session': req.session_id,
    'cardNumber': req.body.data.cardNumber,
    'expDate': req.body.data.expDate,
    'cvv': req.body.data.cvv,
    'billingZip': req.body.data.billingZip
  }
  addBilling(billingInfo)
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log('form 3 save error', err);
    res.status(500).end();
  })
})

app.get('/responses', (req, res) => {
  getAllResponses(req.session_id)
  .then((data) => {
    res.status(200).send(data[0]);
  })
  .catch((err) => {
    console.log('get all responses error', err);
    res.status(500).end();
  })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);

// DATABASE QUERY HELPER FUNCTIONS

const insertNew = (...args) => {
  return new Promise((resolve, reject) => {
    let query = 'INSERT INTO responses (sessionID, name, email, password) VALUES (?, ?, ?, ?)';

    db.execute(query, args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

const addShipping = (info) => {

  return new Promise((resolve, reject) => {
    let query = `UPDATE responses SET address_line_1 = '${info.address1}', address_line_2 = '${info.address2}', city = '${info.city}',
    state = '${info.state}', zip_code = '${info.zip}', phone_number = '${info.phone}' WHERE sessionID = '${info.session}';`

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

const addBilling = (info) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE responses SET card_number = '${info.cardNumber}', date = '${info.expDate}', cvv = '${info.cvv}', billing_zip = '${info.billingZip}' WHERE sessionID = '${info.session}';`

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
}

const getAllResponses = (session) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM responses WHERE sessionID = '${session}';`

    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}
