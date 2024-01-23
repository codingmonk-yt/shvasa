const Agent = require("../models/agentModel");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");
const APIFeatures = require("../utils/apiFeatures");

exports.createAgent = catchAsync(async (req, res, next) => {
  try {
    const filteredBody = filterObj(
      req.body,
      "name",
      "email",
      "phone",
      "description"
    );

    console.log(filteredBody);

    const agent = await Agent.create(filteredBody);

    res.status(201).json({
      status: "success",
      message: "Agent created successfully!",
      data: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message,
      reason: "Unable to create agent",
    });
  }
});

exports.getAgents = catchAsync(async (req, res, next) => {
  try {
    const total = await Agent.find({}).count();
    const features = new APIFeatures(Agent.find(), req.query).textFilter();
    const agents = await features.query;

    res.status(200).json({
      status: "success",
      message: "Agents found successfully!",
      data: { agents, total },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});
