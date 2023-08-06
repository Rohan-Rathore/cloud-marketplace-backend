// find best csp provider based on the parameters

// price 
// scalable
// performance

const findServiceOnCustomReq = (all_services, traffic, time, security) =>{
  let sname = '';
  let cspname = '';
  
  if (traffic < 10000 && security === 'low') {
    sname = 'Cloud Engine';
    cspname = 'Google Cloud Provider';
  }
  else if(traffic < 10000 && security === 'medium'){
    sname = 'Virtual Machines';
    cspname = 'Microsoft Azure';
  }
  else if(traffic < 10000 && security === 'high'){
    sname = 'EC2';
    cspname = 'Amazon Web Service';
  }
  else if(traffic > 10000000 && security === 'high'){
    sname = 'EC2';
    cspname = 'Amazon Web Service';
  }
  else if(traffic > 1000000 && security === 'medium'){
    sname = 'Virtual Machines';
    cspname = 'Microsoft Azure';
  }
  const resp = {
    'service_name': sname,
    'csp_name': cspname
  }
  return resp;
}

exports.FindBestCSP = (req, res) => {
  console.log(req.body);
  const traffic = req.body['req_traffic'];
  const time = req.body['req_timep'];
  const security = req.body['req_security'];

  const req_name = req.body['more_req']['name'];

  const all_services = req.body['more_req']

  console.log(all_services);

  // const requirements = {
  //   ptime: time,
  //   psecurity: security,
  //   ptraffic: traffic
  // };

  // const serviceByPrice = findServiceOnPrice(all_services);
  
  const serviceByCustomReq = findServiceOnCustomReq(all_services, traffic, time, security); //find best csp based on traffic and time
  
  console.log(serviceByCustomReq);
  
  res.json({serviceByCustomReq});

  // const serviceBySecurity = findServiceOnSecurity(all_services);
  
  // csp.save((err, csp) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "NOT able to save csp in DB!"
  //     });
  //   }
  // });
};



