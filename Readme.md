# Anti-Theft Vehicle Tracking System

This project is designed to protect your vehicle from theft. The GPS location of the vehicle is collected by the microcontroller and sent to the backend, where it is stored in a database. The frontend then displays the trip's GPS coordinates on a map, allowing you to track the vehicle's whereabouts in case of theft.

## Frontend

### Technologies:
- JavaScript
- HTML
- CSS
- [OpenLayers](https://openlayers.org/)
### Description: 
The frontend retrieves a list of trips from the backend and displays them in a list format. Once a trip is selected from the list, it draws all the GPS coordinates for that trip onto a map, which is created using the OpenLayers library.

## Backend

### Technologies:
- Node.js
- Express.js
- Knex.js
- PostgreSQL
### Description:
The backend receives GPS data and stores it in a database, which has two tables: 'trips' and 'plots'. The GPS data is stored in the plots table, and an entire trip is stored by containing a reference to  trip_id for each plot. The backend also accepts requests to get the list of trips and a list of plots for a specific trip.

## Microcontroller

### Technologies:
- C++
- sim7600 module

### Description:
The microcontroller is built using C++ and a sim7600 module. When the connected car is turned on, the microcontroller is powered. Every 30 seconds the microcontroller will get the GPS location and send it to the backend using the sim7600 module.

## Getting Started
1.  Clone the repository to your local machine.
2.  Install the dependencies for the frontend and backend by running npm install or yarn install in the respective folders.
3.  Start the backend by running npm start or yarn start in the backend folder.
4.  Connect the microcontroller to the car and make sure it's powered on.

## Usage
Once the frontend and backend are running, you can access the frontend by navigating to `https://localhost:1337` in your browser.

The frontend will display a list of trips, which can be selected to view the corresponding GPS coordinates on a map.

The microcontroller will automatically send GPS data to the backend every 30 seconds.

## Note
This project is just a sample, and it would require further development and testing to be used in a real-world scenario.

## Conclusion
This project provides a comprehensive anti-theft tool for vehicles, by providing real-time tracking of the vehicle's location using GPS technology, which can be accessed through the frontend or backend and can help in case of a theft.