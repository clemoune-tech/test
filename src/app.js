const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Application devsecops-sample-app' });
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
