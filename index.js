const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({hi: 'Hello World!'});
});

app.get('/test', (req, res) => {
  res.send({message: 'Its ok Ryan, its working now!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
