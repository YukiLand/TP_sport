require("dotenv").config();
const express = require("express"); // import express
let cors = require("cors");

const Users = require("./routes/api/Users");
const Materials = require("./routes/api/Materials");
const Carts = require("./routes/api/Carts");

const app = express(); // initialize express

// Connexion BDD
const connectDB = require("./db/connexion");

app.use(cors());
app.use(express.json()); // for parsing application/json

connectDB();

app.use("/users", Users); // main route and after the /users we add the route from the Users.js file
app.use("/materials", Materials); // main route and after the /materials we add the route from the Materials.js file
app.use("/carts", Carts); // main route and after the /carts we add the route from the Carts.js file

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
