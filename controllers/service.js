const Service = require("../models/service");

exports.createService = (req, res) => {
  const service = new Service(req.body);
  console.log(req.body);
  service.save((err, service) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save category in DB!"
      });
    }
    res.json({ service , 'message': 'service created successfully'});
  });
};

exports.getCSPServices = (req, res) => {
  var query = {csp_id : req.body['csp_id']};
  Service.find(query).exec((err, services) => {
    if (err) {
      return res.status(400).json({
        error: "services not found!"
      });
    }
    res.json(services);
  });
};

// get all services
exports.getAllServices = (req, res) => {
  Service.find({}).exec((err, services) => {
    if (err) {
      return res.status(400).json({
        error: "services not found!"
      });
    }
    res.json(services);
  });
};

exports.getServiceNameOnly = (req, res) =>{
    
}

exports.removeService = (req, res) => {
  const service = req.params.serviceId;
  const findservice = Service.findById(service);
  Service.remove(findservice, (err) => {
    if (err) {
      return res.status(400).json({
        error: "service deletion failed!"
      });
    }
    res.json({
      message: "Successfully deleted service!"
    });
  });
};
