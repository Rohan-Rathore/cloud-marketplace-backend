var mongoose = require("mongoose");

var AboutCSPSchema = new mongoose.Schema(
  {
    csp_name: {
      type: String,
      required: true,
    },
    csp_image: {
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


module.exports = mongoose.model("AboutCSP", AboutCSPSchema);