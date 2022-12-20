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
  try {
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'title',
            foreignField: 'category',
            as: 'products',
          },
        },
        {
          $project: {
            category: '$title',
            description: '$description',
            total: {
              $sum: '$products.price',
            },
          },
        },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('first').collection('products').deleteMany();
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('first')
      .collection('products')
      .deleteOne({ _id: ObjectId(id) });
    res.send(data);
    await con.close();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`It works on ${port} port`);
});
