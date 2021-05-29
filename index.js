const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");

let contacts = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
];

// middleware
app.use(cors());
app.use(express.json());
app.use(logger("tiny"));
logger.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  logger(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

// routes
app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  let response = `Phonebook has info for ${
    contacts.length - 1
  } people ${new Date()}`;
  res.json(response);
});

app.get("/api/persons/:id", (req, res) => {
  let id = +req.params.id;
  let response = contacts.find((contact) => contact.id === id);
  if (response) {
    res.json(response);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  let id = +req.params.id;
  contacts = contacts.filter((contact) => contact.id !== id);
  return res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  // error handling
  let checkIfContactExists = contacts.find(
    (contact) => contact.name === req.body.name
  );

  if (checkIfContactExists) {
    res.status(400).send({ error: "name must be unique" });
  } else if (!req.body.name) {
    res.status(400).send({ error: "name is missing" });
  } else if (!req.body.number) {
    res.status(400).send({ error: "number is missing" });
  }

  // adding a new entry
  let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
  let contact = req.body;
  contact.id = id;
  contacts = contacts.concat(contact);
  return res.json(contact);
});

const PORT = process.env.port || 3002;

app.listen(PORT);
