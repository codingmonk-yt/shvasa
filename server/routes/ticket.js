const express = require("express");
const ticketController = require("./../controllers/ticketController");
const router = express.Router({ mergeParams: true });

router.post("/", ticketController.createTicket);
router.get("/", ticketController.getTicket);

module.exports = router;