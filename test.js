if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./database')};

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { ClientRequest } = require('http');

router.use(express.urlencoded( { extended: false}));
router.use(bodyParser.json());

router.get('/:id', (req,res)=> {
    const getReservation = JSON.parse(localStorage.getItem('reservation'))
    const getClient= JSON.parse(localStorage.getItem('client'))
    const id = req.query.id
    if(id == undefined){
        res.send(getReservation)
    } else if(id != undefined){
        for(i=0; i<Object.keys(getReservation).length; i++){
            if(getReservation[i].reservationID == id){
                for(k=0; k<Object.keys(getClient).length; i++){
                    if(getClient[k].clientID == getReservation[i].id){
                        res.send(getClient[k])
                    }
                }
                
            }
        }
    }

})

router.post("/", (req, res) => {
    let etellerandet = JSON.parse(localStorage.getItem('reservation'))
    try{

    const reservation = {
        clientID: req.body.clientID,
        reservationID: req.body.reservationID,
        date: req.body.date,
        hotelName: req.body.hotelName,
        price: req.body.price,
        balance: req.body.balance
    }
    

    etellerandet.push(reservation)
    
    res.send()

    }catch{

    }
    localStorage.setItem('reservation', JSON.stringify('etellerandet'))
})

router.put('/:id', (req, res)=>{
    let etellerandet = JSON.parse(localStorage.getItem('reservation'))
    let id = req.params.id
    for(i=0; i<Object.keys(etellerandet).length; i++){
        if(etellerandet[i].reservationID == id){
            etellerandet[i].date = req.body.date
        }
    }
    localStorage.setItem('reservation', JSON.stringify('etellerandet'))
    res.send()
})



function delReservation(key, reservations){
    for(i=0; i<Object.keys(reservations).length; i++){
        if(key===reservations[i].clientID){
            reservations.splice(i,1)
            return reservations
        }
    }
}

router.delete('/:id', function (req, res) {
    let key = req.params.id
    let reservationsdelete = JSON.parse(localStorage.getItem('reservation'))
    let newreservations = delReservation(key, reservationsdelete)
    localStorage.setItem('reservation', JSON.stringify(newreservations))
    res.json()
})


module.exports = router