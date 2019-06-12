'use strict';

let map;
let service;
let infoWindow;
let apiKey = "";
let zipCoords = false;
let zipLat, zipLng;

function startScreen () {
  //Diffrentiate between zip code search or geolocation search
  $('.search').on('click', '.zipSearch', function(event){
      $('.zip').remove();
      $('.geo').remove();
      $('.zipCode').css('display', 'flex');
      //console.log("zip search");
      watchCityZip();
  });
  
  $('.search').on('click', '.geoSearch', function(event) {
      console.log("geo search");
      //generate map from geolocation
      generateMap();
   });
}

function watchCityZip() {
  //Get zipcode from form
  $('form').submit(event => {
    event.preventDefault();
    let code = $('#js-search-city').val();
    console.log(code);
    generateZipMap(code);
  });
}

function generateMap() {
  //add script to initiate google map
  $(".map").replaceWith(`<div class="map" id="map"><script src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap" async defer></script></div>`);
  $('.search').css('display', 'none');
}

function generateZipMap(zipCode) {
  //call to geocode server to return lat and long of zipcode area
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(responseJson => returnCoord(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function returnCoord(responseJson) {
  //set coordinates and boolean to initiate map based on coordinates. 
  let coords = responseJson.results[0].geometry.location;
  console.log(coords);
  zipLat = coords.lat;
  zipLng = coords.lng;
  zipCoords = true;
  //Generate Map from Zipcode call
  generateMap();
}

function initMap() {
  //create map from call
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.0389, lng: -87.9065},
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow;
  
  //map based on coordinates from zipcode
  if(zipCoords == true) {
    console.log(here);
    let loc = {
      lat: zipLat,
      lng: zipLng
    };

    infoWindow.setPosition(loc);
    infoWindow.setContent('Location');
    infoWindow.open(map);
    map.setCenter(loc);
    initialize(loc);
  }
  //map from geolocation
  else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
  
      infoWindow.setPosition(pos);
      infoWindow.setContent('You');
      infoWindow.open(map);
      map.setCenter(pos);
      initialize(pos);
      }, 
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  }
  // Searched by geolocation but browser doesn't support Geolocation
  else {
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
  //search based on location provided by zipcode or geolocation
  let city = new google.maps.LatLng(location);

  let request = {
    location: city,
    radius: '3000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  //create unordered list to append restaurant info to
  let food = $('<ul class="results"></ul>');
  //Return places near location  
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i=0; i < results.length; i++) {
      let places = results[i];
      let placeID = places.place_id;
      createMarker(results[i]);
      //request details about each place
      let request = {
        placeId: placeID,
        fields: ['name', 'rating', 'formatted_phone_number', 'formatted_address', 'website', 'review']
      }
      //format and append returned data
      service.getDetails(request, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //generate random number to display one of five possible reviews
          let num = Math.floor((Math.random() * 5) + 0);
          food.append(`<li><h3>${place.name} - ${place.rating}/5.0</h3>
          <p>${place.formatted_address}</p>
          <p>Phone : ${place.formatted_phone_number}</p>
          <a href="${place.website}">Go To Website</a>
          <p>${place.reviews[num].author_name} - ${place.reviews[num].rating}/5 <br> ${place.reviews[num].text}</p>
          </li>`);
        }
      });
    }
  }
  //Display in DOM
  $('.results').replaceWith(food);
}

function createMarker(place) {
  //create markers and add them to the map
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
} 

function elusiveEats () {
    startScreen();
}

$(elusiveEats);
