const express = require('express');

const app = express();

app.get('/hello', function (req, res) {
  res.status(200).send({
    message: 'hello',
  });
});

app.get('/bye', function (req, res) {
  res.status(200).send({
    message: 'bye2',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('RUNNING EXPRESS SERVER IN PORT', process.env.PORT || 3000);
});

module.exports = app;
