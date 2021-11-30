//RUN THIS CODE FOR CLEARING THE HOLE DATABASE
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./database');
}

const clear = []

// If you only wish to clear one of the databases, please comment "//" the line of the other database so it remains intact
//RESERVATIONS DB:
localStorage.setItem('reservations',JSON.stringify(clear));
//CLIENTS DB:
localStorage.setItem('clients',JSON.stringify(clear));