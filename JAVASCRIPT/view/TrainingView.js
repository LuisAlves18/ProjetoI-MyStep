import UserController from '../controller/UserController.js'

export default class TrainingView {
    constructor() {
        this.userController = new UserController();

        this.userController.LoginStatus();

        //dom mapa
        this.mapa = document.getElementById('mapDiv');
        this.distanceMessage = document.getElementById('distanceMessage');

        //dom buttons
        this.btnSave = document.getElementById('btnSave');
        this.btnStart = document.getElementById('btnStart');
        this.btnStop = document.getElementById('btnStop');

        //dom variavel de distancia
        this.runDistance = document.getElementById('hiddenInput');

        var timerInterval = null;
        const value = 0;



        this.initMap();
        this.getRunDistance();
        this.start(value);
        this.stop();

    }


    getRunDistance() {
        this.btnSave.addEventListener('click', event => {
            this.time = document.getElementById("timer").innerText;
            this.result = new Date(this.time * 1000).toISOString().substr(11, 8)

            //duas variaveis que guardam o tempo e a distancia corrida
            console.log("time in timer: ", this.result);
            console.log("distance", this.runDistance.value);

            //falta enviar nome para meter como key na localStorage, time e distance para ficar na localStorage como value
            // "tiagosantos10" -> ["distance" : "this.runDistance.value" , "time" : "this.result"]


        })
    }



    start(value) {
        this.btnStart.addEventListener('click', event => {
            stop();
            value = 0;
            this.timerInterval = setInterval(updateTimer, 1000);
        })

        function updateTimer() {
            document.getElementById("timer").innerHTML = ++value;
        }

    }

    stop() {
        this.btnStop.addEventListener('click', event => {
            clearInterval(this.timerInterval);
        })

    }









    initMap() {
        //initiate the map
        const map = new google.maps.Map(this.mapa, {
            center: { lat: 41.366178, lng: -8.7418871 },
            zoom: 18,
            mapTypeId: "satellite"
        });
        this.infoWindow = new google.maps.InfoWindow();

        /* const marker = new google.maps.Marker({
            position: { lat: 41.366178, lng: -8.7418871},
            title: "Your Location!"
        });
        marker.setMap(map); */

        //get the actual location when the page loads
        /* if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.infoWindow.setPosition(pos);
                    this.infoWindow.setContent("Your location!");
                    this.infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => this.handleLocationError(true, infoWindow, map.getCenter())
            );
        } else {
            this.handleLocationError(false, infoWindow, map.getCenter());
        }

        function handleLocationError(browserHasGeoLocation, infoWindow, pos) {
            this.infoWindow.setPosition(pos);
            this.infoWindow.setCenter(
                browserHasGeoLocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
            );
            this.infoWindow.open(map);
        } */

        const geocoder = new google.maps.Geocoder();
        //create objects to manage the directions service
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        //get the value of the inputs with the streets
        const StartAddress = document.getElementById('startLocation').value;
        const EndAddress = document.getElementById('endLocation').value;



        //listener for the button to get the routes
        document.getElementById('btnGetRoutes').addEventListener('click',
            () => geocodeAddress(geocoder, map, directionsService, directionsRenderer)
        );
        let training = "";

        function geocodeAddress(geocoder, resultsMap, directionsService, directionsRenderer) {

            //put satartLocation on the map with a marker
            geocoder.geocode({ 'address': StartAddress },
                (results, status) => {
                    if (status === 'OK') {
                        resultsMap.setCenter(results[0].geometry.location);

                        const marker = new google.maps.Marker({
                            map: resultsMap,
                            //label: labels[labelIndex++ % labels.length],
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the followwing reason: ' + status);
                    }
                }
            );

            //put endLocation on the map with a marker
            geocoder.geocode({ 'address': EndAddress },
                (results, status) => {
                    if (status === 'OK') {
                        resultsMap.setCenter(results[0].geometry.location);

                        const marker2 = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the followwing reason: ' + status);
                    }
                }
            );

            //creation of a DirectionsRequest objetc
            const request = {
                origin: StartAddress,
                destination: EndAddress,
                travelMode: google.maps.TravelMode['WALKING']
            };


            document.getElementById('hiddenInput').value = "";
            //call directionsService.route() to initiate a request to the directions service
            //passing it to a directionsRequest object literal containing the input terms and a callback method
            //to execute upon receipt of the response.
            directionsService.route(request,
                (result, status) => {
                    if (status == 'OK') {
                        directionsRenderer.setDirections(result);
                        const directionsData = result.routes[0].legs[0];
                        if (directionsData) {
                            let contentString = `
                                <div>
                                    <h4>Informations about the run:</h4>
                                    <p>The distance of the run you choose is ${directionsData.distance.text}</p>
                                </div>
                            `;
                            console.log(`The distance is ${directionsData.distance.text} (${directionsData.duration.text})`);
                            training = directionsData.distance.text;
                            //console.log("distancia",training);

                            document.getElementById('distanceMessage').innerHTML = contentString;
                            document.getElementById('hiddenInput').value = directionsData.distance.text;
                        } else {
                            console.log("Directions request failed");

                        }
                    } else {
                        console.log("status", status);

                    }
                })

        }
    }






}