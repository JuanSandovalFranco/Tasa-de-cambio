const express = require("express");

const {
  getTasaDeCambios,
  getHistoriaTasaDeCambio,
} = require("../controllers/TasaDeCambio");

const router = express.Router();

router.route("/latestcurrencies").get(getTasaDeCambios);

router.route("/historical/:date").get(getHistoriaTasaDeCambio);

module.exports = router;
