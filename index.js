function startFood () {
    $('.startScreen').on('click', '.feedMe', function(event) {
        $('.startScreen').remove();
        $('.restaurant').css('display', 'flex');
    });
}

function startDrink () {
    $('.startScreen').on('click', '.beerMe', function(event) {
        $('.startScreen').remove();
        $('.beer').css('display', 'flex');
    });
}

function elusiveEats () {
    startFood();
    startDrink();
}

$(elusiveEats);