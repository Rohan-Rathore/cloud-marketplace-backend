var mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    billtype: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tages: {
      type: String,
      required: true,
    },
    csp_id: {
      type: String,
      required: true,
    }
  },
  {timestamps: true}
); 


module.exports = mongoose.model("Service", serviceSchema);