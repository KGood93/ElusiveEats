'use strict';

let zoCities = 'https://developers.zomato.com/api/v2.1/search';
let cityName;
let cityId;
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
    let cityURL = zoCities + "?q=" + cityName;
    console.log(cityURL);

    const options = {
        headers: new Headers({
          "Accept": "application/json",
          "user-key": apiKey})
      };

    fetch(cityURL, options)
        .then(response => response.json())
        .then(responseJson => returnCityId(responseJson))
        .catch(error => console.log('Something went wrong. Try again later.'));    
}

function returnCityId(responseJson) {
    console.log(responseJson);
    //console.log(responseJson.location_suggestions[0].id);
    //cityId = responseJson.location_suggestions[0].id;
    //console.log(cityId);
  }

function elusiveEats () {
    startFood();
    startDrink();
}

$(elusiveEats);
