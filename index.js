'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let totalNum;
let numStart;
let url;
let apiKey = "7c817eeb531cb578b30c389378fbbabd"; 
let map, infoWindow;
let latlong = [];
let tryAgain = false;

function startScreen () {
    $('.startScreen').on('click', '.feedMe', function(event) {
        $('.startScreen').remove();
        $('.search').css('display', 'flex');
        console.log("feed me");
        watchCityName();
    });

    $('.startScreen').on('click', '.beerMe', function(event) {
        $('.startScreen').remove();
        $('.search').css('display', 'flex');
        console.log("beer me");
        watchCityName();
    });
}

function watchCityName() {
    //console.log("food request");
    $('.citySearch').submit(event => {
      event.preventDefault();
      cityName = $('#js-search-city').val();
      console.log(cityName);
      //findRestNum();
      numberGenerator();
      //findCityId();
    });
}

function findRestNum() {
    url = zoCities + "?q=" + cityName;
    console.log(url);
    
    const options = {
       headers: new Headers({
         "Accept": "application/json",
         "user-key": apiKey})
      };

    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => returnRestNum(responseJson))
        .catch(error => console.log('Something went wrong. Try again later.'));
}

function returnRestNum(responseJson) {
    console.log(responseJson);
    totalNum = responseJson.results_found;
    console.log(totalNum);
    numberGenerator();
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function findCityId() {
    const params = {
        q: "Milwaukee",
        start: numStart,
        count: 5
    };  

    let queryString = formatQueryParams(params);
    url = zoCities + "?" + queryString;
    console.log(url);
    
    const options = {
       headers: new Headers({
         "Accept": "application/json",
         "user-key": apiKey})
    };

    fetch(url, options)
        .then(response => response.json())
        .then(responseJson => returnRestInfo(responseJson))
        .catch(error => console.log('Something went wrong. Try again later.'));
}

function returnRestInfo(responseJson) {
    console.log(responseJson);
    let food = $('<ul class="results"></ul>');
    //console.log(responseJson.restaurants.length);
    for (let i=0; i <= responseJson.restaurants.length - 1; i++) {
      food.append(`<li><h3>${responseJson.restaurants[i].restaurant.name}<span>${responseJson.restaurants[i].restaurant.user_rating.aggregate_rating}</h3>
      <p>${responseJson.restaurants[i].restaurant.cuisines}</p>
      <p>${responseJson.restaurants[i].restaurant.location.address}</p>
      <a href="${responseJson.restaurants[i].restaurant.url}">
      ${responseJson.restaurants[i].restaurant.url}</a></li>`);
    }

    for (let l=0; l <= responseJson.restaurants.length - 1; l++) {
        latlong.push({
            lat: responseJson.restaurants[l].restaurant.location.latitude,
            lng: responseJson.restaurants[l].restaurant.location.longitude
        });
    }

    //console.log(latlong);
    if(tryAgain == false){
        generateMap();
    }
    else {
        removeMarkers();
    }
    

    $('.results').replaceWith(food);
   
    $('.info').removeClass('hidden');

    $('.options').removeClass('hidden');
    watchAgain();
}

function numberGenerator() {
    //console.log(totalNum-4);
    numStart = Math.floor(Math.random() * (95));
    console.log(numStart);
    findCityId();
}

function watchAgain() {
    $('.options').on('click', '.tryAgain', function(event) {
        console.log("Try Again");
        tryAgain = true;
        numberGenerator();
    });
}

function generateMap() {
 $('.map').removeClass('hidden');
 $('.map').replaceWith('<div class="map" id="map"><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ&callback=initMap"></script></div>');
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: 43.0389, lng: -87.9065}, zoom: 10});
    //infoWindow = new google.maps.InfoWindow;

    for(let i=0; i <= latlong.length - 1; i++){
    
        let myLatlng = new google.maps.LatLng(latlong[i].lat,latlong[i].lng);

        let marker = new google.maps.Marker({
            position: myLatlng,
            title: "Restarant " + (i+1)
        });
    
    // To add the marker to the map, call setMap();
        marker.setMap(map);
    }
}

function removeMarkers() {
    marker.setMap(null);

    for(let i=0; i <= latlong.length - 1; i++){
    
        let myLatlng = new google.maps.LatLng(latlong[i].lat,latlong[i].lng);

        let marker = new google.maps.Marker({
            position: myLatlng,
            title: "Restarant " + (i+1)
        });
    
    // To add the marker to the map, call setMap();
        marker.setMap(map);
    }
}

function watch() {
    $('.search').on('click', '.feedMe', function(event) {
        console.log("search");
        numberGenerator();
    });
}

function elusiveEats () {
    //startScreen();
    watch();
}

$(elusiveEats);
