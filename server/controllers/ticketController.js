const Agent = require("../models/agentModel");
const Ticket = require("../models/ticketModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

function getNextAgent(agents, lastAssignedAgent) {
  const totalAgents = agents.length;

  const lastAssigned = agents.findIndex(
    (agent) => agent._id.toString() === lastAssignedAgent.toString()
  );

  return lastAssigned !== -1 && lastAssigned < totalAgents - 1
    ? lastAssigned + 1
    : 0;
}

exports.createTicket = catchAsync(async (req, res, next) => {
  try {
    const activeAgents = await Agent.find({ active: true });

    if (activeAgents.length === 0) {
      return res
        .status(400)
        .json({ error: "There are no active agents for assignment" });
    }

    const filteredBody = filterObj(
      req.body,
      "topic",
      "description",
      "dateCreated",
      "severity",
      "type",
      "status",
      "assignedTo",
      "resolvedOn"
    );

    console.log(filteredBody);

    let ticket;

    if (filteredBody?.assignedTo) {
      ticket = await Ticket.create(filteredBody);
    } else {
      const lastAssigned = await Ticket.findOne({}).sort({ createdAt: -1 });

      const nextAgent = lastAssigned
        ? getNextAgent(activeAgents, lastAssigned.assignedTo)
        : 0;

      ticket = await Ticket.create({
        ...filteredBody,
        assignedTo: activeAgents[nextAgent]._id,
      });
    }

    const populatedTicket = await Ticket.findById(ticket._id).populate(
      "assignedTo",
      "name email"
    );

    res.status(201).json({
      status: "success",
      message: "Ticket created successfully!",
      data: populatedTicket,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message,
      reason: "Unable to create ticket",
    });
  }
});

exports.getTicket = catchAsync(async (req, res, next) => {
  try {
    const total = await Ticket.find({}).count();
    const features = new APIFeatures(Ticket.find(), req.query).textFilter();
    const tickets = await features.query.populate("assignedTo", "name email");

    res.status(200).json({
      status: "success",
      message: "Tickets found successfully!",
      data: tickets,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});
