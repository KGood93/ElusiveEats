'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let cityId;
let numStart;
let numEnd;
let apiKey = "7c817eeb531cb578b30c389378fbbabd"; 
let yelpBase = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=';

function startFood () {
   console.log('start');
    $('.startScreen').on('click', '.feedMe', function(event) {
        $('.startScreen').remove();
        $('.restaurant').css('display', 'flex');
        watchFood();
        numberGenerator();
    });
}

function watchFood() {
    console.log("food request");
    $('.restaurantSearch').submit(event => {
      event.preventDefault();
      cityName = $('#js-search-city').val();
      //maxResults = $('#js-max-results').val();
      console.log(cityName);
      findCityId();
    });
}

function startDrink () {
    $('.startScreen').on('click', '.beerMe', function(event) {
        $('.startScreen').remove();
        $('.beer').css('display', 'flex');
    });
}

function findCityId() {
    console.log("find city");
    let cityURL = yelpBase + cityName;
    console.log(cityURL);

    //const options = {
    //    headers: new Headers({
    //      "Accept": "application/json",
    //      "user-key": apiKey})
    //  };

    const options = {
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer UB_DuyAoaacjiT4zIvdg0Kz2J48nx67sRMghYpJBncow190PE0ubEv4NsVGgbetFVYkxsqnWr_Ecc8LtGiLTpUQYFwmyu3yJVhK0s8dOIKujchp2zx7addgRn_HqXHYx"
        })
    };

    fetch(cityURL, options)
        .then(response => response.json())
        .then(responseJson => returnCityId(responseJson))
        .catch(error => console.log('Something went wrong. Try again later.'));    
}

function returnCityId(responseJson) {
    console.log(responseJson);
}

function numberGenerator() {
    numStart = Math.floor(Math.random() * 101);
    console.log(numStart);
    numEnd = numStart + 4;
    console.log(numEnd);
}

function elusiveEats () {
    startFood();
    startDrink();
}

$(elusiveEats);
