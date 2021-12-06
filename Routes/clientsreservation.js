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