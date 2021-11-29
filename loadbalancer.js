const https = require('https');
const path = require('path');
const fs = require('fs');
const httpProxy = require('http-proxy');
const seaport = require('seaport');



var ports = seaport.connect('localhost', 9090);

// Are to be used later
var i = - 1;

//Using the http-proxy library. The proxy variable will be used in the function below
var proxy = httpProxy.createProxyServer({});

//Creating a server with the createServer method.
var server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'key','key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'key','cert.pem')),
}, function (req, res){

    //The different servers are found in the query
    var addresses = ports.query('server');
    i = (i + 1) % addresses.length;

    console.log('Number of servers running:' + '' + addresses.length)

    var host = addresses[i].host.split(":").reverse()[0];
    var port = addresses[i].port;
    proxy.web(req, res, { target: 'https://' + host + ':' + port, secure: false});
});


//Opening the load-balancer
server.listen(6000, function(){
    console.log('listening on: ' + 6000)
});