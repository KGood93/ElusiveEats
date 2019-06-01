'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let totalNum;
let numStart;
let url;
let apiKey = "7c817eeb531cb578b30c389378fbbabd"; 

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
    findCityId();
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
    console.log(responseJson.restaurants.length);
    for (let i=0; i <= responseJson.restaurants.length - 1; i++) {
      food.append(`<li><h3>${responseJson.restaurants[i].restaurant.name}</h3>
      <span>${responseJson.restaurants[i].restaurant.user_rating.aggregate_rating}</span>
      <p>${responseJson.restaurants[i].restaurant.cuisines}</p>
      <p>${responseJson.restaurants[i].restaurant.location.address}</p>
      <a href="${responseJson.restaurants[i].restaurant.url}">
      ${responseJson.restaurants[i].restaurant.url}</a></li>`);
    }

    $('.results').replaceWith(food);
   
    $('.info').removeClass('hidden');
}

function numberGenerator() {
    //console.log(totalNum-4);
    numStart = Math.floor(Math.random() * (totalNum-4));
    console.log(numStart);
}

function elusiveEats () {
    startScreen();
}

$(elusiveEats);
