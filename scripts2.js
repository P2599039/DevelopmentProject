menuToggler.addEventListener('click', ev => {
    menu2.classList.toggle('open');
    const bike = document.getElementById("LittleBike");
    if (menu2.classList.contains('open')) {
        bike.style.width = "10%";
    } else {
        bike.style.width = "20%";
    }
});
var map;
var directionsService;
var directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 14
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directionsPanel')
    });
}

document.getElementById('routeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    calculateRoute();
});

function calculateRoute() {
    var start = document.getElementById('start').value;
    var destination = document.getElementById('destination').value;

    // Geocode starting point and destination to get latitude and longitude
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        address: start
    }, function (results, status) {
        if (status === 'OK') {
            var startLocation = results[0].geometry.location;
            geocoder.geocode({
                address: destination
            }, function (results, status) {
                if (status === 'OK') {
                    var destinationLocation = results[0].geometry.location;
                    // Plan walking route
                    var request = {
                        origin: startLocation,
                        destination: destinationLocation,
                        travelMode: 'WALKING'
                    };
                    directionsService.route(request, function (result, status) {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                            // Display directions and duration
                            var route = result.routes[0];
                            var directions = '';
                            for (var i = 0; i < route.legs.length; i++) {
                                var leg = route.legs[i];
                                if (leg.instructions) {
                                    directions += '<p><strong>Step ' + (i + 1) +
                                        ':</strong> ' + leg.instructions + '</p>';
                                }
                                directions += '<p>Distance: ' + leg.distance.text +
                                    '</p>';
                                directions += '<p>Duration: ' + leg.duration.text +
                                    '</p>';
                            }
                            document.getElementById('directionsPanel').innerHTML =
                                directions;
                            document.getElementById('map').style.display = 'block';
                            document.getElementById('directionsPanel').style.display =
                                'block';
                        } else {
                            alert('Directions request failed due to ' + status);
                        }
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}