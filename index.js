const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const Contact = require("./models/contact");

// middleware
app.use(express.static("build"));
app.use(express.json());

app.use(cors());
app.use(logger("tiny"));
logger.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  logger(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

// routes
app.get("/api/contacts", (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  let contactsLength;
  Contact.find({})
    .then((contacts) => {
      let response = `Phonebook has info for ${
        contacts.length
      } people - ${new Date()}`;
      res.json(response);
    })
    .catch((error) => next(error));
});

app.get("/api/contacts/:id", (req, res, next) => {
  let id = req.params.id;
  Contact.findById((id) => contact.id === id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      return next(error);
    });
});

app.delete("/api/contacts/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/contacts", (req, res, next) => {
  const body = req.body;

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });
  contact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((error) => next(error));
});

app.put("/api/contacts/:id", (req, res, next) => {
  const body = req.body;
  const updatedContact = {
    name: req.body.name,
    number: req.body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, updatedContact, {
    new: true,
  })
    .then((updatedContact) => res.json(updatedContact))
    .catch((err) => next(err));
});

const errorHandler = (error, req, res, next) => {
  console.log(error.name);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted Id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: "Invalid Name or Number." });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT);
