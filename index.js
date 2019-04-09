const express = require('express');
const metric = require('./modules/metric');
const ip = require('./modules/ip');
const app = express();

app.get('/hello', function (req, res) {
  res.status(200).send({
    message: 'hello',
  });
});

app.get('/bye', function (req, res) {
  res.status(200).send({
    message: 'goodbye',
  });
});

app.get('/metric', async (req, res) => {
  const result = await metric.sendCustomMetric(req.query.metricValue);
  try {
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use('/js', express.static('js'));
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.render('index', { ip: ip.getIP() });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('RUNNING EXPRESS SERVER IN PORT', process.env.PORT || 3000);
});

module.exports = app;
