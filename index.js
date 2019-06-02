'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let totalNum;
let numStart;
let url;
let apiKey = "7c817eeb531cb578b30c389378fbbabd"; 
let map, infoWindow;
let location;

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
      findRestNum();
      //numberGenerator();
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
        q: cityName,
        //start: numStart,
        //count: 5
    };  

    let queryString = formatQueryParams(params);
    let url = zoCities + "?" + queryString;
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

    generateMap();

    $('.results').replaceWith(food);
   
    $('.info').removeClass('hidden');

    $('.options').removeClass('hidden');
    watchAgain();
}

function numberGenerator() {
    //console.log(totalNum-4);
    numStart = Math.floor(Math.random() * (totalNum-4));
    console.log(numStart);
    findCityId();
}

function watchAgain() {
    $('.options').on('click', '.tryAgain', function(event) {
        console.log("Try Again");
        numberGenerator();
    });
}

function generateMap() {
 $('.map').removeClass('hidden');
    $('.map').append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiFNVG6TsLybfDfR9eBj0kl9ZzkooRMUQ&callback=initMap"></script>');
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {center: {lat: -34.397, lng: 150.644}, zoom: 6});
    infoWindow = new google.maps.InfoWindow;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude, 
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);},
            function() {
                handleLocationError(true, infoWindow, map.getCenter());
        });
    }

    else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    addLocations();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation Service Failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function addLocations() {
    let myLatlng = new google.maps.LatLng(43.0365522000,-87.9062654000);

    let marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });

// To add the marker to the map, call setMap();
    marker.setMap(map);
}


function elusiveEats () {
    startScreen();
}

$(elusiveEats);
