const cspList = [
  { provider: 'Ec2', cost: 10, serverSpeed: 'Fast', storage: '50GB', uptime: '99.9%', security: 'High', support: '24/7' },
  { provider: 'Cloud Engine', cost: 20, serverSpeed: 'Moderate', storage: '100GB', uptime: '99.5%', security: 'Medium', support: '12/7' },
  { provider: 'Virtual machine', cost: 30, serverSpeed: 'Slow', storage: '500GB', uptime: '99%', security: 'Low', support: '9/5' }
];

// Define the custom requirements for hosting a website
const requirements = {
  serverSpeed: 'Fast',
  storage: '100GB',
  uptime: '99.5%',
  security: 'High',
  support: '24/7'
};

// Assign scores to each CSP based on how well it satisfies the requirements
const scoredCSPs = cspList.map(csp => {
  let score = 0;
  if (csp.serverSpeed === requirements.serverSpeed) {
    score += 2;
  } else if (csp.serverSpeed === 'Moderate' && requirements.serverSpeed === 'Fast') {
    score += 1;
  }
  
  if (csp.storage >= requirements.storage) {
    score += 2;
  } else if (csp.storage >= requirements.storage / 2) {
    score += 1;
  }
  
  if (csp.uptime >= requirements.uptime) {
    score += 2;
  } else if (csp.uptime >= '99%') {
    score += 1;
  }
  
  if (csp.security === requirements.security) {
    score += 2;
  } else if (csp.security === 'Medium' && requirements.security === 'High') {
    score += 1;
  }
  
  if (csp.support === requirements.support) {
    score += 2;
  } else if (csp.support === '12/7' && requirements.support === '24/7') {
    score += 1;
  }
  
  return { provider: csp.provider, score: score };
});

// Sort the CSPs by their scores in descending order
const sortedCSPs = scoredCSPs.sort((a, b) => b.score - a.score);

// Print the best CSP
console.log(`The best CSP for your requirements is ${sortedCSPs[0].provider}.`);