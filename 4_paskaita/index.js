require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungimas prie duomenu bazes
    const data = await con.db('first').collection('cars').find().toArray(); // duomenu istraukimas
    await con.close(); // prisijungimo isjungimas
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('cars')
      .insertOne({ brand: 'VW', model: 'Polo' });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
