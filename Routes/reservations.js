if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const dbcmd = require('../models/DBcommands')

router.use(express.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/", (req, res)=>{
    try{
        const reservationdb = JSON.parse(localStorage.getItem('reservations'))
        res.send(reservationdb)
    } catch{
        res.send("Something went wrong")
    }
})

router.get("/:id", (req, res) => {
    try{
        const reservationdb = JSON.parse(localStorage.getItem('reservations'))
        const reservationid = req.params.id
        const reservation = dbcmd.findsinglereservations(reservationdb, reservationid)
        console.log(reservation);
        res.send(reservation)

    }catch{
 
    }
})

router.post("/", (req,res) => {
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    try{
        //encrypt the Uses password, so "we" cant see it
        const reservation ={
            reservationID: req.body.reservationID,
            clientID: req.body.clientID,
            date: req.body.date,
            hotelName: req.body.hotelName,
            price: req.body.price,
            balance: req.body.balance
        }
        reservationdb.push(reservation)
   
        //if all the above is right, than redirect the user to login page
        res.json('Travel Registered')
        
    }catch{

    }
    localStorage.setItem('reservations',JSON.stringify(reservationdb));
})

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


router.delete('/:id', (req, res) =>{
    const reservationdb = JSON.parse(localStorage.getItem('reservations'))
    const id = req.params.id
    const reservationafter = dbcmd.deleteReservation(id, reservationdb)
    localStorage.setItem('reservations', JSON.stringify(reservationafter))
    res.json('Reservation Deleted') 

})


module.exports = router