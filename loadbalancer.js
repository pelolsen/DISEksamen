const https = require('https');
const path = require('path');
const fs = require('fs');
const seaport = require('seaport');
const httpProxy = require('http-proxy');
const loadbalancerPORT = 6000;

//Using the http-proxy library. The proxy variable will be used in the function below

// SEAPORT:
const seaPort = seaport.connect('localhost', 9090);

//PROXYSERVER:
var proxy = httpProxy.createProxyServer({});

//This is just used for the first time the load balancer starts, so when it goes through the function at line 36, the program choses INDEX 0 in the addresses array
var i = - 1;

//SSL Keys:
const options = {
    key: fs.readFileSync(path.join(__dirname, "key", 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, "key", 'cert.pem'))
}

//Load Balancer SERVER:
var server = https.createServer(options, function (req, res){
    //Find the connected servers
    var addresses = seaPort.query('server');
    //Check if Seaport is working properly and there actually is something the the addresses array!
    if (!addresses.length) {
        res.writeHead(503, {
            'Content-Type': 'text/plain'
        });
        res.end('Load-balancer could not find any Servers - Please check if Seaport is running properly');
        return;
    }
    //Takes the modolus of i with the number of indexes in the addresses array, using modulos assures me that i will never get bigger than the actual number of indexes, 
    //as when i gets as big as the number of indexses, it will return to 0 as "X % X = 0" 
    i = (i + 1) % addresses.length;
    var host = addresses[i].host.split(":").reverse()[0];
    var port = addresses[i].port;
    proxy.web(req, res, { 
        target: 'https://' + host + ':' + port, 
        secure: false
    });
});

server.listen(loadbalancerPORT, function(){
    console.log('Load-balancer listening on PORT: ' + loadbalancerPORT)
});