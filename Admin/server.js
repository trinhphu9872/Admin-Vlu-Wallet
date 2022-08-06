// import { express } from 'express'
// import { configViewEngine } from './src/configs/viewEngine'
import initWebRoute from "./src/route/web";

const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const dbRef = require("./firebase/firebase");
const cookieParser = require("cookie-parser");
var session = require("express-session");

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

//express
app.use(bodyParser.json());
app.use(morgan("combined"));
//cookie
app.use(cookieParser());

// urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// using session
app.use(
  session({
    secret: "abcdefg",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//view engine
app.use(express.static("./src/views"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

//init web route
initWebRoute(app);


const server = app.listen(3000, function () {
  const host = "localhost";
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

function addUserBtnClicked() {
  const addUserBtnUI = document.getElementById("add-user-btn");
  addUserBtnUI.addEventListener("click", addUserBtnClicked);
  const usersRef = dbRef.child("users");
}
