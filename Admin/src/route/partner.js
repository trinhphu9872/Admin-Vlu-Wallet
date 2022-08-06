const express = require('express');
const route = express.Router();
import partnerController from "../controller/partnerController";

route.get('/qltkdoitac', partnerController.getListPartner)
route.get('/detail/:id', partnerController.getDetailPartner)
route.get('/getcreatenewpartner', partnerController.getCreatePartner)
route.post('/postcreatenewpartner', partnerController.postCreatePartner)
route.get('/get-remove/:id', partnerController.getRemovePartner)
route.post('/post-remove-partner', partnerController.postRemovePartner)

module.exports = route