const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
}
main().catch(err => console.log(err));

const port = 8000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Express specific stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));  // Call express.urlencoded as a function

// Pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  const params = {};
  res.status(200).render('home.pug', params);
});

app.post('/contact', (req, res) => {
  const mydata = new Contact(req.body);
  mydata.save().then(() => {
    res.send("This item has been saved to the database");
  }).catch((err) => {
    console.error(err); // Log the error for debugging
    res.status(400).send("Item was not saved to the database");
  });
});

app.get('/contact', (req, res) => {
  const params = {};
  res.status(200).render('contact.pug', params);
});

// Start the server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
