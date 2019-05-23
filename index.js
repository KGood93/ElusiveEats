'use strict';

//let zoCities = 'https://developers.zomato.com/api/v2.1/cities';
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
      cityName = $('#js-search-parks').val();
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
    let cityURL = 'https://developers.zomato.com/api/v2.1/cities?q=Milwaukee';
    console.log(cityURL);

    const options = {
        headers: new Headers({
          //"Accept": "application/json",
          "user-key": apiKey})
      };

    fetch(cityURL, options)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => console.log('Something went wrong. Try again later.'));
}

function returnCityId(responseJson) {
    console.log(responseJson);
  }

function elusiveEats () {
    startFood();
    startDrink();
}

$(elusiveEats);
