[GitHub](https://github.com/pelolsen/diseksamen) Repo for this project.
[comment]: <> (If you wish this file to be more readable, please access the GitHub link above, so the file can render)
# Travel Reservation Application
This Travel Reservation Application is made as an Exam for Copenhagen Buisiness School - Winter 2021

## Usage
1. Make sure that PORTs 6000 and 9090 are not in use in your computer as this application rely on the usage of those ports
2. Make sure you have installed seaport globaly - Read more about this in the Error Handling section
3. Follow the guide that applies for your operating sistem:

### MACOS / LINUX
1. Open you terminal and navigate to the scr folder of this application
2. Once you are in the folder, run the following command:
```bash
sh runMacOS.sh
```
3. This will reset the database, start all servers, the load-balancer as well as the Seaport-server.
4. This will as well, perform tests with CRUD operations - GET, POST, PUT and DELETE
5. There are two precoded users in the runMacOS.sh which will be used for the tests. So if you wish to try the application with more users, you will need to use an API Client such as [Insomnia](https://insomnia.rest), [Postman](https://www.postman.com) or curl from your own terminal. Read more about it in the API Client Section.
6. NOTE - This application will not run on normal browsers as Chrome or Safari because og the self signed SSL key

### WINDOWS
1. Make sure you have [GitBash](https://git-scm.com/downloads) installed at your computer.
2. In the folder of this aplication simply just click on the runWindows.sh. Otherwise, run the following command on your teminal in the folde scr:
```bash
npm start
```
3. This will open a GitBash terminal where the Shell Script will run.
3. The Shell Script will reset the database, start all servers, the load-balancer as well as the Seaport-server.
4. It will as well, perform tests with CRUD operations - GET, POST, PUT and DELETE
5. There are two precoded users in the runWindows.sh which will be used for the tests. So if you wish to try the application with more users, you will need to use an API Client such as [Insomnia](https://insomnia.rest), [Postman](https://www.postman.com) or curl from your own terminal. Read more about it in the API Client Section.
6. NOTE - This application will not run on normal browsers as Chrome or Safari because og the self signed SSL key

## Packages in use
body-parser: "^1.19.0",
express: "^4.17.1",
fs: "0.0.1-security",
http: "0.0.1-security",
http-proxy: "^1.18.1",
https: "^1.0.0",
node-localstorage: "^2.2.1",
path: "^0.12.7",
seaport: "^2.0.9"

## Error Handling
### Seaport
If there are errors regarding the Seaport Package, it might be because you have not installed seaport globally in your PC:
For **MAC/Linux** users, you may need administrator permision for doing that. For that, use "sudo" before "npm" as follows:
```bash
sudo npm i seaport -g
```
For **Windows** users:
```bash
npm i seaport -g
```
It is rare windowns will ask you for admin permission, but if it does, just run you CMD terminal as an administrator and use the same command as above.

### Other Packages
If for some reason, any package got corrupted and are giving ERROR on the terminal:
1. Delete the **node_modules** file;
2. In your terminal, navigate to the scr file again
3. run:
```bash
npm install
```
4. All the packages should have returned in the right version

### ShellScript(.sh) not working
If the ShellScript does not work, you will have to run the program manually. For that, open 6 terminals and navigate to scr file in all of them, and run the following commands (1 command per terminal)
```bash
1. npm run seaport listen 9090
2. node server.js
3. node server.js
4. node server.js
5. node loadbalancer.js
6. node cleardb.js
```
For sending requests read API Client section

## API Client - sending request:
Use your prefered way of sending request. In the example, I will desmonstrade the request using curl as it is accecible for everybody:

Syntax for sending requests that require a body (JSON)
1. POST CLIENT:
```bash
Path: https://localhost:6000/clients
```
```JSON
{
    "clientID": "2", 
    "firstName": "John", 
    "lastName": "Pedersen", 
    "streetAddress": "Fasanvej 12", 
    "City": "Frederiksberg"
}
```
2. PUT CLIENT (requires a clientID in the path):
```bash
Path: https://localhost:6000/clients/:clientID
```
```JSON
{
    "firstName": "CHANGE", 
    "lastName": "Pedersen", 
    "streetAddress": "Fasanvej 12", 
    "City": "Frederiksberg"
}
```
3. POST RESERVATION:
```bash
Path: https://localhost:6000/reservations
```
```JSON
{
	"reservationID": "100", 
	"clientID": "1", 
	"date": "24122021", 
	"hotelName": "Marriot", 
	"price": "2300", 
	"balance": "2"
}
```
4. PUT Reservation (requires a reservationID in the path):
```bash
Path: https://localhost:6000/reservations/:reservationID
```
```JSON
{
	"date": "24122021", 
	"hotelName": "CHANGE", 
	"price": "2300", 
	"balance": "2"
}
```
### Example
1. POST CLIENT
```bash
curl -k -X POST -H "Content-Type: application/json" -d '{"clientID": "2", "firstName": "John", "lastName": "Pedersen", "streetAddress": "Fasanvej 12", "City": "Frederiksberg"}' https://localhost:6000/clients
```
2. GET all clients
```bash
curl -k https://localhost:6000/clients
```
3. GET client with ID = 2
```bash
curl -k https://localhost:6000/clients/2
```
4. PUT client with ID = 2
```bash
curl -k -X PUT -H "Content-Type: application/json" -d '{"firstName": "CHANGED NAME", "lastName": "Olsen", "streetAddress": "Kastrupvej 2A", "City": "KBH"}' https://localhost:6000/clients/2
```
5. DELETE client with ID = 2
```bash
curl -k -X DELETE https://localhost:6000/clients/2
```

## Author
Patrick Esben Lerdrup Olsen - Copenhagen, Denmark.
[GitHub](https://github.com/pelolsen)

## Sources / Inspiration
- Load-Balancer: GitHub user Hasanmansur - [GitRepo](https://github.com/hasanmansur/BalanceYourLoad)
- SSL key generation: [NodeJs-Documentation](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)


