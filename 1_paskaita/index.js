const casual = require("casual");

console.log(casual.city);
console.log(Math.floor(Math.random() * 10) + 1);
console.log(Math.trunc(Math.random() * 10) + 1);
console.log(casual.integer(1, 10));

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

console.log(randomNumber(1, 10));

const name = "Rokas";
const surname = "Andreikenas";
const fullName = name + " " + surname; // bad
const newFullName = `${name} ${surname}`; // good

console.log(`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);
