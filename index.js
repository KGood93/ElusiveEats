'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let numStart;
let apiKey = "7c817eeb531cb578b30c389378fbbabd"; 

function startFood () {
   console.log('start');
    $('.startScreen').on('click', '.feedMe', function(event) {
        $('.startScreen').remove();
        $('.restaurant').css('display', 'flex');
        watchFood();
    });
}

function watchFood() {
    console.log("food request");
    $('.restaurantSearch').submit(event => {
      event.preventDefault();
      cityName = $('#js-search-city').val();
      //maxResults = $('#js-max-results').val();
      console.log(cityName);
      numberGenerator();
      findCityId();
    });
}

function startDrink () {
    $('.startScreen').on('click', '.beerMe', function(event) {
        $('.startScreen').remove();
        $('.beer').css('display', 'flex');
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function findCityId() {
    //console.log("find city");
    
    //const url = searchURL + '?' + queryString;

    const params = {
        q: cityName,
        start: numStart,
        count: 5
    };  

    let queryString = formatQueryParams(params);

    let cityURL = zoCities + "?" + queryString;
    console.log(cityURL);
    
    const options = {
       headers: new Headers({
         "Accept": "application/json",
         "user-key": apiKey})
      };

    //fetch(cityURL, options)
    //    .then(response => response.json())
    //    .then(responseJson => returnCityId(responseJson))
    //    .catch(error => console.log('Something went wrong. Try again later.'));    
}

function returnCityId(responseJson) {
    console.log(responseJson);
    let food = $('<ul id="results"></ul>');
    console.log(responseJson.restaurants.length);
    for (let i=0; i <= responseJson.restaurants.length - 1; i++) {
      food.append(`<li><h3>${responseJson.restaurants[i].restaurant.name}</h3></li>`);
    }

    $('.results').replaceWith(food);
   
    $('.info').removeClass('hidden');
}

function numberGenerator() {
    numStart = Math.floor(Math.random() * 101);
    console.log(numStart);
}

function elusiveEats () {
    startFood();
    startDrink();
}

$(elusiveEats);
