const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      default: "CRITICAL",
    },
    type: {
      type: String,
      default: "USER ASSISTANCE",
    },
    status: {
      type: String,
      default: "NEW",
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "Agent",
      required: [true, "Ticket must be assigned to an agent"],
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    resolvedOn: {
      type: Date,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

ticketSchema.index({ topic: "text", description: "text" });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
