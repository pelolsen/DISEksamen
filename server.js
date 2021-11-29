if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}
//require everything I need
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https')
const fs = require('fs')
const seaport = require('seaport')
const seaPort = seaport.connect('localhost', 9090);

const options = {
    key: fs.readFileSync(path.join(__dirname, "/key", 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, "/key", 'cert.pem'))
}

const server = https.createServer(options, app)

app.use(express.urlencoded({extended: false}))
//BodyParser
app.use(bodyParser.json());

const clientRoute = require("./Routes/clients")
const reservationRoute = require("./Routes/reservations")

//Use the diffenret routes
app.use("/reservations", reservationRoute);
app.use("/clients", clientRoute)



app.get("/", (req,res) => {
    res.send('this is server: ' + server.address().port)
    //res.render("index.ejs")
})

const serverport = seaPort.register('server')

server.listen(serverport, () => {
    console.log("server is listining on: " + serverport)
})


