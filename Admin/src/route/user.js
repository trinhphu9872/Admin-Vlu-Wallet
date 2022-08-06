const express = require('express');
const route = express.Router();
import homeController from "../controller/homeController";

 route.get('/listuser', homeController.getListUser)
 route.get('/naptien/:mssv', homeController.getDetail)
 route.post('/naptienuser', homeController.naptienUser)
 route.get('/studentlist', homeController.getListStudent)
 route.get('/student/:mssv', homeController.getDetailStudent)
 route.get('/student/history/:id', homeController.getHistoryStudent)

 
 module.exports = route