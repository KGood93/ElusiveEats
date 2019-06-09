'use strict';

let map;
let service;
let infoWindow;

function startScreen () {
    $('.search').on('click', '.feedMe', function(event) {
        console.log("feed me");
        generateMap();
    });
}

function generateMap() {
    $(".search").replaceWith('<div class="map" id="map"><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ&libraries=places&callback=initMap" async defer></script></div>');
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.0389, lng: -87.9065},
      zoom: 12
    });
    infoWindow = new google.maps.InfoWindow;
  
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('You');
        infoWindow.open(map);
        map.setCenter(pos);
        initialize(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

function initialize(location) {
  let milwaukee = new google.maps.LatLng(location);

  let request = {
    location: milwaukee,
    radius: '3000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
    let food = $('<ul class="results"></ul>');
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i=0; i < results.length; i++) {
      let places = results[i];
      console.log(results[i]);
      food.append(`<li><h3>${places.name} - ${places.rating}/5.0</h3>
      <p>${places.vicinity}</p>
      </li>`);
      createMarker(results[i]);
      getDetails(places.id);
    }
   }
   $('.results').replaceWith(food);
}

function createMarker(place) {
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

function getDetails(placeId) {
    ('.info').append(`<script src="https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,formatted_address,website&key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ" async defer></script>`);
    console.log(placeId);
    console.log("getting place details");
}

function elusiveEats () {
    startScreen();
}

$(elusiveEats);
