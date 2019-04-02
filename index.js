const express = require('express');
const db = require('./modules/db.js');
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

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use('/js', express.static('js'));
app.use(express.urlencoded());

app.get('/', function(req, res){
  res.render('index');
});

app.post('/connection', async (req, res) => {
  try {
    const result = await db.connect(req.body.endpoint, req.body.user, req.body.password);
    res.render('result', {title: 'Success', message: result});
  } catch (err) {
    res.render('result', {title: 'Error', message: err});
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('RUNNING EXPRESS SERVER IN PORT', process.env.PORT || 3000);
});

module.exports = app;
