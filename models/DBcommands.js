//Functions used to manage DATABASE
//Functions for RESERVATIONS DB:
function findsinglereservations(reservatione, id){
    let result = ""
    for(i = 0; i < Object.keys(reservatione).length; i++){
        if(id === reservatione[i].reservationID){
           result = reservatione[i]
        }
   }
   return result
}
module.exports.findsinglereservations = findsinglereservations;

function deleteReservation(id, arr){
    for(i=0; i<Object.keys(arr).length; i++){
        if(id===arr[i].reservationID){
            arr.splice(i,1)
            return arr
        }
    }
}
module.exports.deleteReservation = deleteReservation;
//-------------------------------------------------------------------------------------------------------------------
//Functions for CLIETS DB:
function findsingleclients(clients, id){
    let result = ""
    for(i = 0; i < Object.keys(clients).length; i++){
        if(id === clients[i].clientID){
           result = clients[i]
        }
   }
   return result
}
module.exports.findsingleclients = findsingleclients;

function checkClientExistance(clients,id){
    let result = false
    for(i = 0; i < Object.keys(clients).length; i++){
        if(id === clients[i].clientID){
           result = true
        }
   }
   return result
}
module.exports.checkClientExistance = checkClientExistance

function deleteClient(id, arr){
    for(i=0; i<Object.keys(arr).length; i++){
        if(id===arr[i].clientID){
            arr.splice(i,1)
            return arr
        }
    }
}
module.exports.deleteClient = deleteClient;
