const express = require("express");
const agentController = require("./../controllers/agentController");
const router = express.Router({ mergeParams: true });

router.post("/", agentController.createAgent);
router.get("/", agentController.getAgents);

module.exports = router;
