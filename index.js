const path = require('path');
const cors = require('cors');
const express = require('express');
const randomstring = require('randomstring');
const { query_short_url, query_forward_url_by_code, query_access_count_by_code } = require('./queries');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/', express.static(path.join(__dirname, '/static')));
app.use(cors({ origin: '*', allowedHeaders: '*' }));

app.get('/', (req, res) => {
  return res.render('index');
});

app.get('/s', (req, res) => {
  let url = req.query['real_url'];
  if (!!url){
    //Salvar na base
    let code = randomstring.generate({ length: 5 });
    query_short_url(url, code, (isSuccess) => {
      return res.json({
        shorten_result: isSuccess,
        short_code: isSuccess ? code : null
      });
    });
  } else {
    return res.json({
      shorten_result: false,
      short_code: null
    });
  }
});

app.get('/c/:code', (req, res) => {
  let code = req.params['code'];
  query_forward_url_by_code(code, (result) => {
    if (result){
      return res.redirect(result.url);
    }
    return res.status(404).end();
  });
});

app.get('/c/:code/clicks', (req, res) => {
  let code = req.params['code'];
  query_access_count_by_code(code, (result) => {
    if (result){
      return res.json({
        clicks_result: true,
        total_clicks: result.clicks
      });
    }
    return res.json({
      clicks_result: false,
      total_clicks: 0
    });
  });
});

// app.all('*', (req, res) => {
//   return res.redirect('/');
// });

app.listen(14900, () => {
  console.log('[+] Shortly server started successfully on port 14900.');
});
