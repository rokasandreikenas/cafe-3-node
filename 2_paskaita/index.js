const express = require("express");
const cors = require("cors");
const app = express(); // app yra express instance
const port = 3000;

app.use(cors());

// req - request - duomenys kuriuos paduoda kviečiantysis pvz. POST user duomenys ar validacijos raktas
// res - response - duomenys kuriuos grąžinam kai kviečia mūsų API keliu "/"
// pirmas argumentas - kelias į mūsų API "/"

const cars = ["BMW", "Porsche", "VW", "Seat"];

app.get("/", (req, res) => {
  res.send(cars);
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
