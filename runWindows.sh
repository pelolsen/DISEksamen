echo "Starting Seaport Module"
npm run seaport listen 9090 &
sleep 2

echo "Starting Servers"
node server.js &
node server.js &
node server.js &
sleep 2

echo "Starting Load-Balancer"
node loadbalancer.js &
sleep 2

echo "Reseting Dadabase"
node cleardb.js &
sleep 2

echo "=========================================================="
echo "[101;93m Testing Starting: [0m"
echo "=========================================================="
sleep 3
echo "Testing Load-Balancer:"
sleep 1
echo "The PORTs in each test should be different from each other"
echo "LB-test 1:"
curl -k https://localhost:6000 &
sleep 1
echo "LB-test 2:"
curl -k https://localhost:6000 &
sleep 1
echo "LB-test 3:"
curl -k https://localhost:6000 &
sleep 1
echo "=========================================================="
echo "CLIENTS"
echo "=========================================================="
sleep 1
echo " Testing [32mPOST[0m Client:"
sleep 1
echo "[32mPOST[0m Client 1:"
curl -k -X POST -H "Content-Type: application/json" -d '{"clientID": "1", "firstName": "Patrick", "lastName": "Olsen", "streetAddress": "Kastrupvej 2A", "City": "KBH"}' https://localhost:6000/clients &
sleep 1
echo "[32mPOST[0m Client 2:"
curl -k -X POST -H "Content-Type: application/json" -d '{"clientID": "2", "firstName": "John", "lastName": "Pedersen", "streetAddress": "Fasanvej 12", "City": "Frederiksberg"}' https://localhost:6000/clients &
sleep 1
echo "=========================================================="
echo "Testing [35mGET[0m Clients (all clients):"
echo "It should show clients with id 1 and 2, named Patrick and John in an array"
sleep 2
echo "[35mGET[0m Clients:"
curl -k https://localhost:6000/clients &
sleep 1
echo "=========================================================="
echo "Testing [35mGET[0m Client (single client):"
sleep 1
echo "[35mGET[0m Client with clientID = 1:"
curl -k https://localhost:6000/clients/1 &
sleep 1
echo "[35mGET[0m Client with clientID = 2:"
curl -k https://localhost:6000/clients/2 &
sleep 1
echo "=========================================================="
echo "Testing [33mPUT[0m Client:"
echo "It should change the name of client 1 from Patrick to CHANGED NAME:"
sleep 1
echo "[33mPUT[0m Client 1:"
curl -k -X PUT -H "Content-Type: application/json" -d '{"firstName": "CHANGED NAME", "lastName": "Olsen", "streetAddress": "Kastrupvej 2A", "City": "KBH"}' https://localhost:6000/clients/1 &
sleep 1
echo "[35mGET[0m all clients to check the client 1 was updated"
curl -k https://localhost:6000/clients &
sleep 1
echo "=========================================================="
echo "Testing [31mDELETE[0m Client:"
echo "It should delete the client"
sleep 1
echo "[31mDELETE[0m client with clientID =2"
curl -k -X DELETE https://localhost:6000/clients/2 &
sleep 1
echo "[35mGET[0m all clients to check the client was deleted:"
echo "Only client with clientID = 1 should be returned"
curl -k https://localhost:6000/clients &
sleep 1
echo "=========================================================="
echo "RESERVATIONS"
echo "=========================================================="
sleep 1
echo " Testing [32mPOST[0m Reservation:"
sleep 1
echo "[32mPOST[0m Reservation 1:"
curl -k -X POST -H "Content-Type: application/json" -d '{"reservationID": "100", "clientID": "1", "date": "24122021", "hotelName": "Marriot", "price": "2300", "balance": "2"}' https://localhost:6000/reservations &
sleep 1
echo "[32mPOST[0m Reservation 2:"
curl -k -X POST -H "Content-Type: application/json" -d '{"reservationID": "200", "clientID": "2", "date": "01012022", "hotelName": "Holiday Inn", "price": "1400", "balance": "1000"}' https://localhost:6000/reservations &
sleep 1
echo "=========================================================="
echo "Testing [35mGET[0m Reservations (all reservations):"
echo "It should show reservations with id 100 and 200 in an array"
sleep 2
echo "[35mGET[0m Reservations:"
curl -k https://localhost:6000/reservations &
sleep 1
echo "=========================================================="
echo "Testing [35mGET[0m Reservation (single reservation):"
sleep 1
echo "[35mGET[0m Reservation with reservationID = 100:"
curl -k https://localhost:6000/reservations/100 &
sleep 1
echo "[35mGET[0m Reservation with reservationID = 200:"
curl -k https://localhost:6000/reservations/200 &
sleep 1
echo "=========================================================="
echo "Testing [33mPUT[0m Reservation:"
echo "It should change the hotel name of reservation 100 from Marriot to CHANGED HOTEL:"
sleep 1
echo "[33mPUT[0m Reservation 100:"
curl -k -X PUT -H "Content-Type: application/json" -d '{"date": "24122021", "hotelName": "CHANGED HOTEL", "price": "2300", "balance": "2"}' https://localhost:6000/reservations/100 &
sleep 1
echo "[35mGET[0m all reservations to check the reservation 100 was updated"
curl -k https://localhost:6000/reservations &
sleep 1
echo "=========================================================="
echo "Testing [31mDELETE[0m Reservation:"
echo "It should delete the reservation"
sleep 1
echo "[31mDELETE[0m reservation with reservationID =200"
curl -k -X DELETE https://localhost:6000/reservations/200 &
sleep 1
echo "[35mGET[0m all reservations to check the reservation was deleted:"
echo "Only reservation with reservationID = 100 should be returned"
curl -k https://localhost:6000/reservations &
sleep 1
echo "=========================================================="
echo "[101;93m TESTING DONE, PLEASE READ ABOVE [0m"
echo "=========================================================="
read -p "Press something to end"
echo "Shutting down"
pkill node
npx kill-port 9090