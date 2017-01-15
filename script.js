$(function() {

    //startTime();
    console.log('inside jquery.....');

    var totalCash = 100;
    var timeCounter = 0;
		var maxTime=300;

    // timer
    var timeTracker = setInterval(timeUpdate, 1000);

    //function called ever second to increase clock time by 1 second
    //Breaks setInterval function at the end of 300 seconds and calls calculateProfit function to calculate profit/loss
    function timeUpdate() {
        timeCounter++;
        var time = $('.countdownContainer').find('span').text();
        $('.countdownContainer').find('span').remove();
        $('.countdownContainer').append('<span>Timer :: ' + timeCounter + '</span>');

        if (timeCounter == maxTime) {
            console.log('stopping newPriceGenerator loop');
            clearInterval(newPriceGenerator);
            clearInterval(timeTracker);
            calculateProfit();
        }
    }


    // calculates profit at the end of the 300 seconds  and displays profit/loss on screen.
    function calculateProfit() {
        var spentCash = 100 - totalCash;
        var stockSaleCash = 0;
        var profit;
        for (var i = 0; i < arr1.length; i++) {
            //var calprice = Number(arr1[i].currentStockValue());
            stockSaleCash = Number(Number(stockSaleCash) + Number(arr1[i].currentStockValue())).toFixed(2);
        }
        profit = Number(stockSaleCash - spentCash).toFixed(2);
				totalCash= Number(totalCash)+Number(stockSaleCash);
        $('.finalProfitDisplay').append('<span>Total Profit Made :: ' + profit + '</span>');
				$('#totalCash').find('span').remove();
        $('#totalCash').append('<span>' + totalCash+ '</span>');
    }

    // Building an object for each fruit.
    var banana = new Fruit('banana', randomStartPrice(), 0, 0);
    var apple = new Fruit('apple', randomStartPrice(), 0, 0);
    var orange = new Fruit('orange', randomStartPrice(), 0, 0);
    var grape = new Fruit('grapes', randomStartPrice(), 0, 0);

    // adding all  fruit objects created to an array
    var arr1 = [banana, apple, orange, grape];


    for (var i = 0; i < arr1.length; i++) {
        var fruit = '<div class="fruit"  id="' + arr1[i].name + '"><span>' + arr1[i].name + '</span></div>';
        $('.fruits').append(fruit);
        var priceDiv = '<div  id="' + arr1[i].name + '"' + 'class="priceDisplay">' +
            '<button class="buy">Buy</button>' +
            '<button class="sell">Sell</button>' +
            '<span id="price' + arr1[i].name + '" data-' + arr1[i].name + '="' + arr1[i].currentPrice + '">' + arr1[i].currentPrice + '</span></div>';
        $('.priceDisplays').append(priceDiv);
    }

    tableDisplay();
    updateTotalCash();

    $('.sell').on('click', function() {
			 if(timeCounter<maxTime){
        console.log("user clicked on the sell buttn");
        var fruit = $(this).parent().attr('id');
        //var currentPrice=Number($(this).parent().find('span').text());
        arr1.forEach(function(o) {
            //	console.log("inside looping function"+o.name);
            if (o.name == fruit && o.quantity > 0) {
                var price = Number(o.currentPrice);
                console.log('price....' + price);
                o.totalCost = Number(o.totalCost) - price;
                console.log('total  cost...' + o.totalCost);
                console.log('totalCash before calculation...' + totalCash + price);
                totalCash = Number(Number(totalCash) + Number(price)).toFixed(2);
                console.log('totalCash....' + totalCash);
                o.quantity--;
                updateTotalCash();
                tableDisplay();
                console.log(arr1);

            }

        });

}
    })

    $('.buy').on('click', function() {
			  if(timeCounter<maxTime){
        var fruit = $(this).parent().attr('id');
        var currentPrice = Number($(this).parent().find('span').text());
        console.log('current price from data attribute' + currentPrice);
        //console.log(arr1);
        if (totalCash - currentPrice <= 0) {

            console.log('you have run out of cash');
            runOutOfCashFunction();
        } else {
            arr1.forEach(function(o) {
                //	console.log("inside looping function"+o.name);
                if (o.name == fruit) {
                    var price = Number(o.currentPrice);
                    o.totalCost = Number(o.totalCost) + price;
                    totalCash = Number(totalCash - price).toFixed(2);
                    o.quantity++
                        updateTotalCash();
                    tableDisplay();
                    console.log(arr1);

                }

            });

        }
     }
    });

    function tableDisplay() {
        $('.displayDetails').children().remove();
        for (var i = 0; i < arr1.length; i++) {
            var name = arr1[i].name;
            var quantity = Number(arr1[i].quantity);
            var totalCost = Number(arr1[i].totalCost);
            var averagePrice = Number((isNaN(totalCost / quantity)|| quantity==0) ? 0 : totalCost / quantity).toFixed(2);

            var strBuilder = '<tr id="' + name + '">' +
                '<td>' + name + '</td>' +
                '<td>' + quantity + '</td>' +
                '<td>' + averagePrice + '</td>'
            $('.displayDetails').append(strBuilder);
            console.log("name: " + name + "  quantity: " + quantity + " totalCost: " + totalCost);

        }

    }

    var that = this;
    var newPriceGenerator = setInterval(function() {
        for (let i = 0; i < arr1.length; i++) {
            var temp = '#' + 'price' + arr1[i].name;
            $(that).find(temp).remove();
            var randomNumber = Number(generateRandomPrice(arr1[i].currentPrice));
            arr1[i].currentPrice = Number(randomNumber).toFixed(2);
            var newPriceDiv = '<span id="price' + arr1[i].name + '"  data-' + arr1[i].name + '="' + arr1[i].currentPrice + '">' + arr1[i].currentPrice + '</span>';
            var div = '.priceDisplays #' + arr1[i].name;
            console.log(div);
            $(div).append(newPriceDiv);
        }
    }, 15000)

    function updateTotalCash() {
        $('#totalCash').find('span').remove();
				$('.cashDisplay').find('#notEnoughCash').remove();
        $('#totalCash').append('<span>' + totalCash + '</span>');
    }

    function runOutOfCashFunction() {
			   $('.cashDisplay').find('#notEnoughCash').remove();
        $('.cashDisplay').append('<div  id="notEnoughCash"><span>Not Enough Cash  in the Bank</span></div>');
    }

}) //end of document ready function.....


//Generates random starting price for Fruit
function randomStartPrice() {
	  var randomNumber=Math.random() * (0.5 - 9.99) + 9.99;
		while(randomNumber<0.5 || randomNumber>9.99){
			randomNumber=Math.random() * (0.5 - 9.99) + 9.99;
		}
    return Number(randomNumber).toFixed(2);
}


function generateRandomPrice(currentPrice) {
	var currentPrice=Number(currentPrice);
  var randomNumber =Math.random() * (-0.5 - 0.5) + 0.5;
	var newPrice=currentPrice+randomNumber;
	while(newPrice<0.5 || newPrice>9.99){
		randomNumber =Math.random() * (-0.5 - 0.5) + 0.5;
		newPrice=currentPrice+randomNumber;
	}
	console.log('random number:: '+randomNumber);
	console.log('current price :: '+currentPrice);
	console.log('new  price :: '+newPrice);

	return newPrice;
}


function Fruit(name, currentPrice, quantity, totalCost) {
    this.name = name;
    this.quantity = quantity;
    this.currentPrice = currentPrice;
    this.totalCost = totalCost;
    this.currentStockValue = function() {
        var temp = Number(Number(this.quantity) * Number(this.currentPrice)).toFixed(2);
        return temp = (temp != NaN) ? temp : 0;
    }
}

function findFruit(obj, fruit) {
    console.log("inside findFruit function");
    return obj.name == fruit;
}
