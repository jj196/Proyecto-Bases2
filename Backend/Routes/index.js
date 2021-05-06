const express = require("express"); 
var router = express.Router();
const controller = require('../Controllers/index')
 
router.route('/')
   .get(controller.getReporte) 
   .post(controller.postTransaccion)
;
module.exports = router;
