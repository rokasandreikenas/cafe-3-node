// npm init - sukuria package.json faila
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const users = db.data;
const app = express();
const port = process.env.PORT || 8080;

// Jeigu neimportavo env failo
// 1. patikrinti kintamuju pavadinimus
// 2. modulio importavima ir config paleidima
// 3. .env failas turi buti root folderyje prie package.json

app.use(cors());
app.use(express.json()); // is JSON i JS

app.get('/users', (req, res) => {
  res.send(users);
});

const cars = [
  {
    id: 1,
    make: 'BMW',
    model: '530',
    color: 'Black',
  },
  {
    id: 2,
    make: 'Audi',
    model: 'A6',
    color: 'White',
  },
];

app.get('/cars', (req, res) => {
  res.send(cars);
});

app.get('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find((c) => c.id === id);

  if (car) {
    res.send(car);
  } else {
    res.status(404).send({
      error: 'Car not found',
    });
  }
});

// atsiuncia {make, model, color}
// gauna {id, make, model, color}
app.post('/cars', (req, res) => {
  const car = req.body;
  if (car.make && car.model && car.color) {
    const newCar = { ...car, id: Date.now() };
    cars.push(newCar);
    res.send(newCar);
  } else {
    res.status(400).send({
      error: 'Invalid request',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
