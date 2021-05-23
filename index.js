const express = require("express");
const app = express();

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

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/info", (req, res) => {
  let response = `Phonebook has info for ${
    contacts.length - 1
  } people ${new Date()}`;
  res.json(response);
});

const port = 3002;

app.listen(port);
