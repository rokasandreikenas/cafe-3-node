require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.URI;

const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const { brand, sort, property } = req.query;

  try {
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('cars')
      .find(brand ? { $or: [{ brand: { $in: brand.split(',') } }] } : {})
      .sort(sort ? { [property]: sort === 'asc' ? 1 : -1 } : {})
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect(); // prisijungimas prie duomenu bazes
    const data = await con.db('first').collection('cars').findOne(ObjectId(id));
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
      .insertOne({ brand: 'Seat', model: 'Ibiza' });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
