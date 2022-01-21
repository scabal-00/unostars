const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

//route, controller
api.get("/users", UserController.getUsers);
api.post("/users", UserController.createUser);
api.get("/users/:id", UserController.getUserById);
api.put("/users/:id", UserController.updateUser);
api.delete("/users/:id", UserController.deleteUser);

module.exports = api;
