const express = require('express')
const app = express()
const request = require('request');
const bodyParser = require('body-parser');
var firebase = require("firebase");

var query = "Toronto";
var key  = "40e7262374ecd630d1150c536dd9a7c0";
var url_request = "http://api.openweathermap.org/data/2.5/weather?" + "&APPID=" + key + "&q=" + query ;

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
	var email = req.body.email;
	console.log(email);
	res.send('POST request to the homepage')
});

app.set('port',(process.env.PORT||3000));
app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:'+app.get('port')+'/');
});

app.all('/foo', function(req, res) {
    console.log(req.body.email);
})

function getWeather(){
	request(url_request, function(err, resp, body) {
		if(!err && resp.statusCode == 200) {
			var data = JSON.parse(body);
		}	
		else if (err) {
			console.log("There was an error");
		}
	});
}