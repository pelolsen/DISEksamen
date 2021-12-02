//LOCALSTORAGE DB:
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}
//Requirering Modules
const express = require('express');
const bodyParser = require('body-parser');
//Requerering Database Functions
const dbcmd = require('../models/DBcommands')
//Defining the Router
const router = express.Router();

router.use(express.urlencoded({extended: false}))
router.use(bodyParser.json())

//GET REQUESTS:
//all reservations:
router.get("/", (req, res)=>{
    try{
        const reservationdb = JSON.parse(localStorage.getItem('reservations'))
        res.send(reservationdb)
    } catch{
        res.send("Something went wrong")
    }
})
//single reservation based on its reservation ID:
router.get("/:id", (req, res) => {
    try{
        const reservationdb = JSON.parse(localStorage.getItem('reservations'))
        const reservationid = req.params.id
        const reservation = dbcmd.findsinglereservations(reservationdb, reservationid)
        //console.log(reservation);
        res.send(reservation)

    }catch{
 
    }
})

//POST REQUEST:
//add a reservation:
router.post("/", (req,res) => {
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    try{
        const reservation ={
            reservationID: req.body.reservationID,
            clientID: req.body.clientID,
            date: req.body.date,
            hotelName: req.body.hotelName,
            price: req.body.price,
            balance: req.body.balance
        }
        reservationdb.push(reservation)
        res.json('Travel Registered')
        
    }catch{

    }
    localStorage.setItem('reservations',JSON.stringify(reservationdb));
})

//PUT REQUEST:
//Change a reservations based on its reservation ID, the code is written so you can't change the reservation ID or the Client ID:
router.put("/:id", (req,res) =>{
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    const id = req.params.id
    const UpdateReservation = (id, arr) =>{
        for(i=0; i < arr.length; i++){
            if(arr[i]['reservationID'] === id){
                arr[i]['date'] = req.body.date;
                arr[i]['hotelName'] = req.body.hotelName;
                arr[i]['price'] = req.body.price;
                arr[i]['balance'] = req.body.balance;
                return arr
            }
        }
    }
    const reservationafter = UpdateReservation(id, reservationdb)
    localStorage.setItem('reservations', JSON.stringify(reservationafter))
    res.json("Reservation Update")
})

//DELETE REQUEST:
//Delete a reservation based on it's reservation ID:
router.delete('/:id', (req, res) =>{
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    const id = req.params.id
    const reservationafter = dbcmd.deleteReservation(id, reservationdb)
    localStorage.setItem('reservations', JSON.stringify(reservationafter))
    res.json('Reservation Deleted') 
})


module.exports = router