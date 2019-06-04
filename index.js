'use strict';

let map;
let service;
let infowindow;
let food;
let places;

function startScreen () {
    $('.search').on('click', '.feedMe', function(event) {
        //$('.startScreen').remove();
        //$('.search').css('display', 'flex');
        console.log("feed me");
        //watchCityName();
        generateMap();
    });
}

function generateMap() {
    $('.map').removeClass('hidden');
    $('.map').replaceWith('<div class="map" id="map"><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ&libraries=places&callback=initialize" async defer></script></div>');
}

function initialize() {
  let milwaukee = new google.maps.LatLng(43.0436,-88.0218);

  map = new google.maps.Map(document.getElementById('map'), {
      center: milwaukee,
      zoom: 15
    });

  let request = {
    location: milwaukee,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      places = results[i];
    }
   }
   foodList(places);
}

function foodList(estab) {
    for(let i = 0; i < estab.length; i++){
      food.append(`<li><h3>${estab[i].name} - ${estab[i].rating}</h3>
      <p>${estab[i].vicinity}</p>
      </li>`);
    }

    $('.results').replaceWith(food);
}

function elusiveEats () {
    startScreen();
}

$(elusiveEats);
