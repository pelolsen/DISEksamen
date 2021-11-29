if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = LocalStorage('./database');
}

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const dbcmd = require('../models/DBcommands')

const clients = []

router.use(express.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get("/", (req, res)=>{
    try{
        const clientdb = JSON.parse(localStorage.getItem('clients'))
        res.send(clientdb)
    } catch{
        res.send("Something went wrong")
    }
})

router.get("/:id", (req, res) => {
    try{
        const clientdb = JSON.parse(localStorage.getItem('clients'))
        const clientid = req.params.id
        const client = dbcmd.findsingleclients(clientdb, clientid)
        //console.log(client);
        res.send(client)

    }catch{
 
    }
})

router.post("/", (req,res) => {
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    try{
        //encrypt the Uses password, so "we" cant see it
        const client ={
            clientID: req.body.clientID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            streetAddress: req.body.streetAddress,
            City: req.body.City,
        }
        clientdb.push(client)
   
        //if all the above is right, than redirect the user to login page
        res.json('Client Registered')
        
    }catch{

    }
    localStorage.setItem('clients',JSON.stringify(clientdb));
})

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



router.delete('/:id', (req, res) =>{
    const id = req.params.id
    const clientdb = JSON.parse(localStorage.getItem('clients'))
    const clientafter = dbcmd.deleteClient(id, clientdb)
    localStorage.setItem('clients', JSON.stringify(clientafter))
    res.json('Client Deleted')
})


module.exports = router