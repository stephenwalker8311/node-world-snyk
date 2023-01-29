



const express = require('express')
const bodyParser = require('body-parser')
const pug = require('pug');

const app = express();
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));
app.set('view engine', 'pug')

app.post('/api/users', jsonParser, function (req, res) {

})

app.get('/lookup', (req, res) => {
	res.render('userlookup', {
	  title: 'Search Hacker News',
	});
  });

let port = process.env.PORT || 4000;

const server = app.listen(port, function() {
	console.log('Listening on port ' + port);
});