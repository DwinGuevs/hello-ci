const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Welcome to CI/CD</h1>');
});

if (require.main === module) {
  app.listen(3000, '0.0.0.0', () => console.log('App listening on port 3000'));
}

module.exports = app;