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

//GET REQUESTS:
//all clients:
router.get("/", (req, res)=>{
    try{
        const clientdb = JSON.parse(localStorage.getItem('clients'))
        res.send(clientdb)
    } catch{
        res.send("Something went wrong")
    }
})
//single client based on its client ID:
router.get("/:id", (req, res) => {
    try{
        const clientdb = JSON.parse(localStorage.getItem('clients'))
        const clientid = req.params.id
        const client = dbcmd.findsingleclients(clientdb, clientid)
        //console.log(client);
        if(client == ""){
            res.json("No client found with this ID")
        } else{
            res.send(client)
        }

    }catch{
    //Could put error handling in here.    
    }
})

//POST REQUEST:
//add a client:
router.post("/", (req,res) => {
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    try{
        const client ={
            clientID: req.body.clientID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            streetAddress: req.body.streetAddress,
            City: req.body.City,
        }
        clientdb.push(client)
        res.json('Client Registered')
    }catch{

    }
    localStorage.setItem('clients',JSON.stringify(clientdb));
})

//PUT REQUEST:
//Change a client based on its client ID, the code is written so you can't change the Client ID:
router.put("/:id", (req,res) =>{
    const id = req.params.id
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    const UpdateClient = (id, arr) =>{
        for(i=0; i < arr.length; i++){
            if(arr[i]['clientID'] === id){
                arr[i]['firstName'] = req.body.firstName;
                arr[i]['lastName'] = req.body.lastName;
                arr[i]['streetAddress'] = req.body.streetAddress;
                arr[i]['City'] = req.body.City;
                return arr
            }
        }
    }
    const clientafter = UpdateClient(id, clientdb)
    localStorage.setItem('clients', JSON.stringify(clientafter))
    res.json("client Update")
})

//DELETE REQUEST:
//delete a client based on its client ID:
router.delete('/:id', (req, res) =>{
    const id = req.params.id
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    const clientafter = dbcmd.deleteClient(id, clientdb)
    localStorage.setItem('clients', JSON.stringify(clientafter))
    res.json('Client Deleted')
})


module.exports = router