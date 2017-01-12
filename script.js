$(function(){

console.log('inside jquery.....');

var totalCash=100;
// function Fruit(name,quantity,currentPrice,totalCost)
var banana=new Fruit('banana',randomStartPrice(),0,0);
var apple=new Fruit('apple',randomStartPrice(),0,0);
var orange=new Fruit('orange',randomStartPrice(),0,0);
var grape=new Fruit('grapes',randomStartPrice(),0,0);
var arr1 = [banana, apple, orange,grape];
//console.log(arr1);
for(var i=0;i<arr1.length;i++){
	//console.log(arr1.length);
	//console.log(arr[i]);
	var fruit='<div class="fruit"><span>'+arr1[i].name+'</span></div>';
	$('.fruits').append(fruit);
	var priceDiv='<div  id="'+arr1[i].name+'"'+'class="priceDisplay">'+
							'<button>Buy</button>'+
							'<span id="price'+arr1[i].name+'" data-'+arr1[i].name+'="'+arr1[i].currentPrice+'">'+arr1[i].currentPrice+'</span></div>';
	$('.priceDisplays').append(priceDiv);
}

$('#totalCash').append('<span>'+totalCash+'</span>');

$('button').on ('click', function() {
	var fruit=$(this).parent().attr('id')
//console.log(arr1);
	arr1.forEach(function(o){
	//	console.log("inside looping function"+o.name);
		if(o.name==fruit){

			var price=Number(o.currentPrice);
			o.totalCost=Number(o.totalCost)+price;
			totalCash=totalCash-price;
			o.quantity++
			updateSpanFunction(totalCash);
			//console.log(totalCash);
			console.log(arr1);
		}


	});
//console.log("price after the fo each"+price);

	//console.log($(this).parent().attr('id'));


});

	var that=this;
	// console.log(that);
	var temp = 0;
	setInterval(function(){

		for(let i=0;i<arr1.length;i++){
		//console.log('inside settimeout....')
		//console.log( arr1[i]);

		var temp='#'+'price'+arr1[i].name;
		// var temp=arr1[i].currentPrice;
		//console.log('temp = ',temp);
		// var currentPrice=$(that).find(temp).text();
		// console.log('price....'+currentPrice);
		$(that).find(temp).remove();

		//console.log('current price is: '+arr1[i].currentPrice);
		//console.log('random price'+generateRandomPrice());
		var randomNumber = Number(generateRandomPrice());

		arr1[i].currentPrice=Number(Number(arr1[i].currentPrice)+Number(randomNumber)).toFixed(2);
		///console.log(randomNumber);
		//console.log('NEW price is: ' + arr1[i].currentPrice);


		 var newPriceDiv='<span id="price'+arr1[i].name+'">'+arr1[i].currentPrice+'</span>';
		 var div='#'+arr1[i].name;
		 //console.log('div.....'+div);
		 $(div).append(newPriceDiv);

	}
},5000)

function updateSpanFunction(totalCost){
	$('#totalCash').find('span').remove();
$('#totalCash').append('<span>'+totalCash+'</span>');

}

	// var temp='#'+'price'+arr1[j];
	// var currentPrice=$(temp).text();
	// console.log(currentPrice);
	// $('.priceDisplays').find(temp).remove();
	// currentPrice+=generateRandomPrice;
	// var newPriceDiv='<span id="price'+arr1[j]+'" data-'+arr1[j]+'="'+currentPrice+'">'+currentPrice+'</span>';
	// var priceDiv='<div  class="priceDisplay">'+
	// 						'<button>Buy</button>'+
	// 						'<span data-'+arr1[i]+'="'+price+'">'+price+'</span>';
 //settimeOut()



})


//Generates random starting price for Fruit
function randomStartPrice() {
	return (Math.random() * (0.5 - 9.99) + 9.99).toFixed(2);
}


function generateRandomPrice() {
	return (Math.random() * (-0.5 - 0.5) + 0.5).toFixed(2);
}

function Fruit(name,currentPrice,quantity,totalCost){
			this.name=name;
			this.quantity=quantity;
			this.currentPrice=currentPrice;
			this.totalCost=totalCost;
}

function findFruit(obj,fruit){
	console.log("inside findFruit function");
	return obj.name==fruit;
}
