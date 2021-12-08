/*
READ THIS:
This is an example of how you continue developing this project and what can be implemented.
Here we see the implemantation of finding a Cient by using a reservationID.
This code takes use of the data model that was set on the repport which links a reservation to a client.

IMPLEMENTATION:
If you wish to implement this route on the server, copy and paste the following two lines:

const reservationRoute = require("./example/clientreservation")
app.use("/clientreservation", reservationRoute);

USE:
On you API Client, navigate to https://localhost:6000/clientreservation/X
Where X = a reservationID
*/

//LOCALSTORAGE DB:
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}
//Requirering Modules
const bodyParser = require('body-parser');
const express = require('express');
//Requerering Database Functions
const dbcmd = require('../models/DBcommands')
//Defining Router
const router = express.Router();

router.use(express.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/:id', (req, res)=>{
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    const reservationid = req.params.id
    const reservation = dbcmd.findsinglereservations(reservationdb, reservationid)
    const idfromreservation = reservation.clientID
    const client = dbcmd.findsingleclients(clientdb, idfromreservation)
    res.send(client)
})

module.exports = router