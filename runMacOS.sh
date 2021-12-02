#!/bin/sh
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
PURPLE='\033[0;35m'
ORANGE='\033[0;33m'
NC='\033[0m'
echo "Starting Seaport Module"
npm run seaport listen 9090 &
sleep 2

echo "\nStarting Servers"
node server.js &
node server.js &
node server.js &
sleep 2

echo "\nStarting Load-Balancer"
node loadbalancer.js &
sleep 2

echo "\nReseting Dadabase"
node cleardb.js &
sleep 2

echo "\n=========================================================="
echo "${YELLOW}Testing Starting:${NC}"
echo "=========================================================="
sleep 3
echo "\nTesting Load-Balancer:"
sleep 1
echo "The PORTs in each test should be different from each other"
echo "\nLB-test 1:"
curl -k https://localhost:6000 &
sleep 1
echo "\nLB-test 2:"
curl -k https://localhost:6000 &
sleep 1
echo "\nLB-test 3:"
curl -k https://localhost:6000 &
sleep 1
echo "\n=========================================================="
echo "CLIENTS"
echo "=========================================================="
sleep 1
echo "\n Testing ${GREEN}POST${NC} Client:"
sleep 1
echo "\n${GREEN}POST${NC} Client 1:"
curl -k -X POST -H "Content-Type: application/json" -d '{"clientID": "1", "firstName": "Patrick", "lastName": "Olsen", "streetAddress": "Kastrupvej 2A", "City": "KBH"}' https://localhost:6000/clients &
sleep 1
echo "\n${GREEN}POST${NC} Client 2:"
curl -k -X POST -H "Content-Type: application/json" -d '{"clientID": "2", "firstName": "John", "lastName": "Pedersen", "streetAddress": "Fasanvej 12", "City": "Frederiksberg"}' https://localhost:6000/clients &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${PURPLE}GET${NC} Clients (all clients):"
echo "\nIt should show clients with id 1 and 2, named Patrick and John in an array"
sleep 2
echo "\n${PURPLE}GET${NC} Clients:"
curl -k https://localhost:6000/clients &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${PURPLE}GET${NC} Client (single client):"
sleep 1
echo "\n${PURPLE}GET${NC} Client with clientID = 1:"
curl -k https://localhost:6000/clients/1 &
sleep 1
echo "\n${PURPLE}GET${NC} Client with clientID = 2:"
curl -k https://localhost:6000/clients/2 &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${ORANGE}PUT${NC} Client:"
echo "\nIt should change the name of client 1 from Patrick to CHANGED NAME:"
sleep 1
echo "\n${ORANGE}PUT${NC} Client 1:"
curl -k -X PUT -H "Content-Type: application/json" -d '{"firstName": "CHANGED NAME", "lastName": "Olsen", "streetAddress": "Kastrupvej 2A", "City": "KBH"}' https://localhost:6000/clients/1 &
sleep 1
echo "\n${PURPLE}GET${NC} all clients to check the client 1 was updated"
curl -k https://localhost:6000/clients &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${RED}DELETE${NC} Client:"
echo "\nIt should delete the client"
sleep 1
echo "\n${RED}DELETE${NC} client with clientID =2"
curl -k -X DELETE https://localhost:6000/clients/2 &
sleep 1
echo "\n${PURPLE}GET${NC} all clients to check the client was deleted:"
echo "\nOnly client with clientID = 1 should be returned"
curl -k https://localhost:6000/clients &
sleep 1
echo "\n=========================================================="
echo "RESERVATIONS"
echo "=========================================================="
sleep 1
echo "\n Testing ${GREEN}POST${NC} Reservation:"
sleep 1
echo "\n${GREEN}POST${NC} Reservation 1:"
curl -k -X POST -H "Content-Type: application/json" -d '{"reservationID": "100", "clientID": "1", "date": "24122021", "hotelName": "Marriot", "price": "2300", "balance": "2"}' https://localhost:6000/reservations &
sleep 1
echo "\n${GREEN}POST${NC} Reservation 2:"
curl -k -X POST -H "Content-Type: application/json" -d '{"reservationID": "200", "clientID": "2", "date": "01012022", "hotelName": "Holiday Inn", "price": "1400", "balance": "1000"}' https://localhost:6000/reservations &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${PURPLE}GET${NC} Reservations (all reservations):"
echo "\nIt should show reservations with id 100 and 200 in an array"
sleep 2
echo "\n${PURPLE}GET${NC} Reservations:"
curl -k https://localhost:6000/reservations &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${PURPLE}GET${NC} Reservation (single reservation):"
sleep 1
echo "\n${PURPLE}GET${NC} Reservation with reservationID = 100:"
curl -k https://localhost:6000/reservations/100 &
sleep 1
echo "\n${PURPLE}GET${NC} Reservation with reservationID = 200:"
curl -k https://localhost:6000/reservations/200 &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${ORANGE}PUT${NC} Reservation:"
echo "\nIt should change the hotel name of reservation 100 from Marriot to CHANGED HOTEL:"
sleep 1
echo "\n${ORANGE}PUT${NC} Reservation 100:"
curl -k -X PUT -H "Content-Type: application/json" -d '{"date": "24122021", "hotelName": "CHANGED HOTEL", "price": "2300", "balance": "2"}' https://localhost:6000/reservations/100 &
sleep 1
echo "\n${PURPLE}GET${NC} all reservations to check the reservation 100 was updated"
curl -k https://localhost:6000/reservations &
sleep 1
echo "\n=========================================================="
echo "\nTesting ${RED}DELETE${NC} Reservation:"
echo "\nIt should delete the reservation"
sleep 1
echo "\n${RED}DELETE${NC} reservation with reservationID =200"
curl -k -X DELETE https://localhost:6000/reservations/200 &
sleep 1
echo "\n${PURPLE}GET${NC} all reservations to check the reservation was deleted:"
echo "\nOnly reservation with reservationID = 100 should be returned"
curl -k https://localhost:6000/reservations &
sleep 1
echo "\n=========================================================="
echo "${YELLOW}TESTING DONE, PLEASE READ ABOVE${NC}"
echo "=========================================================="









read -p "Press any key to shut down"
echo "\nShutting down"
kill $(lsof -t -i:9090)
