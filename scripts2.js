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
var startLocation;
var destinationLocation;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.6369,
            lng: 1.1398
        },
        zoom: 14,
        gestureHandling: 'cooperative'
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
    var modeSelect = document.getElementById('mode');
    var mode = modeSelect.options[modeSelect.selectedIndex].value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        address: start
    }, function (results, status) {
        if (status === 'OK') {
            startLocation = results[0].geometry.location;
            console.log("Start Location Lat: " + startLocation.lat());
            console.log("Start Location Lng: " + startLocation.lng());
            geocoder.geocode({
                address: destination
            }, function (results, status) {
                if (status === 'OK') {
                    destinationLocation = results[0].geometry.location;
                    console.log("Destination Location Lat: " + destinationLocation.lat());
                    console.log("Destination Location Lng: " + destinationLocation.lng());
                    var request = {
                        origin: startLocation,
                        destination: destinationLocation,
                        travelMode: mode
                    };
                    directionsService.route(request, function (result, status) {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                            var route = result.routes[0];
                            var directions = '';
                            for (var i = 0; i < route.legs.length; i++) {
                                var leg = route.legs[i];
                                if (leg.instructions) {
                                    directions += '<p><strong>Step ' + (i + 1) +
                                        ':</strong> ' + leg.instructions + '</p>';
                                }
                                directions += '<p class="Distance">Distance: ' + leg.distance.text +
                                    '</p>';
                                directions += '<p class="Distance">Duration: ' + leg.duration.text +
                                    '</p>';
                            }
                            document.getElementById('directionsPanel').innerHTML =
                                directions;
                            document.getElementById('map').style.display = 'block';
                            document.getElementById('directionsPanel').style.display =
                                'block';
                            document.getElementById('directionsPanel').style.backgroundColor =
                                '#09814A';
                            GetCoords(destinationLocation.lat(), destinationLocation.lng());
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

function GetCoords(latitude, longitude) {
    console.log(latitude, longitude);
    const showweather = document.getElementById('weather');
    showweather.style.display = "block";
    const url = `https://weather338.p.rapidapi.com/weather/forecast?date=20230421&latitude=${latitude}&longitude=${longitude}&language=en-UK&units=m`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '26f11eb67fmsh6726d950fd9279ap13d840jsnee667a1ad0a4',
            'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            const currentWeather = response['v3-wx-observations-current'];
            const temperature = currentWeather['temperature'];
            const rain1Hour = currentWeather['precip1Hour'];
            const rain6Hour = currentWeather['precip6Hour'];
            const cloudcover = currentWeather['cloudCoverPhrase'];
            const humidity = currentWeather['relativeHumidity'];
            const feelslike = currentWeather['temperatureFeelsLike'];
            const windspeed = currentWeather['windSpeed'];
            const weather = document.getElementById('weather2');            
            weather.innerHTML = `Temperature: ${temperature}°C<br>Feels Like: ${feelslike}°C<br>Precipitation (Next Hour): ${rain1Hour}mm<br>Precipitation (Next 6 Hours): ${rain6Hour}mm<br>Cloud Cover: ${cloudcover}<br>Humidity: ${humidity}%<br>Wind Speed: ${windspeed} m/s`;
            const weather3 = document.getElementById('weather3');
            if (rain1Hour > 2) {
                weather3.innerHTML += "It is not recommended to do your route due to heavy rainfall in the next hour.";
              } else if (temperature < 3) {
                weather3.innerHTML += "It is not recommended to do your route due to low temperatures.";
              } else {
                weather3.innerHTML += "It's a good day to do your route!";
              }
        })
        .catch(err => console.error(err));
}