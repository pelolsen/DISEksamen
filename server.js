// LOCALSTORAGE:
    //If you wish to clear the database, run cleardb.js
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}
//Requirering moduels
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https')
const fs = require('fs')
const seaport = require('seaport')

// EXPRESS:
const app = express();
// SEAPORT:
const seaPort = seaport.connect('localhost', 9090);

//SSL Keys:
const options = {
    key: fs.readFileSync(path.join(__dirname, "/key", 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, "/key", 'cert.pem'))
}

// SERVER:
const server = https.createServer(options, app)

// EXPRESS:
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());

//Require the different routes from the Routes folder
const clientRoute = require("./Routes/clients")
const reservationRoute = require("./Routes/reservations")

//Use the diffenret routes
app.use("/reservations", reservationRoute);
app.use("/clients", clientRoute)


//Homepage to check if the loadbalancer is working
app.get("/", (req,res) => {
    res.send('This response comes from server at PORT: ' + server.address().port)
})

//Register a server port to Seaport
const serverport = seaPort.register('server')

//Start Server
server.listen(serverport, () => {
    console.log("Server is listening on: " + serverport)
})