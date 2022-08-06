const express = require("express");
const route = express.Router();
import authController from "../controller/authController";

route.get("/", authController.login);
route.post("/login", authController.postlogin);
route.get("/logout", authController.postLogout);

module.exports = route;
