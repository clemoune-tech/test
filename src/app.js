const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Application devsecops-sample-app' });
});

// Read secrets from environment variables (NOT hardcoded)
const SIMULATED_AWS_KEY = process.env.SIMULATED_AWS_KEY || '';
const INTERNAL_TOKEN = process.env.INTERNAL_TOKEN || '';

// VULNÉRABILITÉ INTENTIONNELLE - CodeQL doit détecter ceci
app.get('/ping', (req, res) => {
  const targetIp = req.query.ip;
  
  if (!targetIp) {
    return res.status(400).json({ error: 'IP parameter required' });
  }

  // Command injection vulnerability - INTENTIONAL FOR TESTING
  exec(`ping -c 1 ${targetIp}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ result: stdout });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const isSecure = !!(SIMULATED_AWS_KEY && INTERNAL_TOKEN);
  res.json({ 
    status: 'ok',
    secrets_loaded: isSecure
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
