function findsinglereservations(reservatione, id){
    let result = ""
    //console.log(reservatione);
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
            //console.log(arr);
            return arr
        }

    }
}

module.exports.deleteReservation = deleteReservation;


function findsingleclients(clients, id){
    let result = ""
    //console.log(reservatione);
    for(i = 0; i < Object.keys(clients).length; i++){
        if(id === clients[i].clientID){
           result = clients[i]
        }
   }
   return result
}

module.exports.findsingleclients = findsingleclients;

function deleteClient(id, arr){
    for(i=0; i<Object.keys(arr).length; i++){
        if(id===arr[i].clientID){
            arr.splice(i,1)
            //console.log(arr);
            return arr
        }

    }
}

module.exports.deleteClient = deleteClient;
