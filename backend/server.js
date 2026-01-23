const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

require("./src/libs/db.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
