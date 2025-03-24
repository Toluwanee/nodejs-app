const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world, testing workflows!');
});

app.listen(port, () => {
  console.log(`App listening at http://192.168.1.188:${port}`);
});

