const express = require('express');
const route = express.Router();
import historyController from "../controller/historyController";

// route.get('/listhistory', historyController.getListHistory)
route.get('/detail-history/:id', historyController.getDetailHistory)

module.exports = route