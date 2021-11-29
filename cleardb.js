if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./database');
}

const clear = []

localStorage.setItem('reservations',JSON.stringify(clear));
localStorage.setItem('clients',JSON.stringify(clear));

