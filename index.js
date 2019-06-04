'use strict';

let map;
let service;
let infowindow;

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
    $('.map').replaceWith('<div class="map"><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ&libraries=places&callback=initMap" async defer></script></div>');
    //initialize();
}

function initialize() {
  let milwaukee = new google.maps.LatLng(43.0389,-87.9065);

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
      let place = results[i];
      createMarker(results[i]);
      console.log(place);
    }
  }
}

function elusiveEats () {
    startScreen();
}

$(elusiveEats);
