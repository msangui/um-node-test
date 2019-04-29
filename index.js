const express = require('express');
const ip = require('./modules/ip');
const app = express();
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

let healthStatusCode = 200;

app.get('/hello', function (req, res) {
  res.status(200).send({
    message: 'hello',
  });
});

app.get('/health-check', function (req, res) {
  res.status(healthStatusCode).send({message: healthStatusCode === 200 ? 'success' : 'fail'});
});

app.post('/health-status-code', urlencodedParser, async (req, res) => {
  healthStatusCode = parseInt(req.body.healthStatusCode, 10);
  res.render('result', { healthStatusCode });
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
