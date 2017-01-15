$(function(){

//startTime();
console.log('inside jquery.....');

var totalCash=100;
var timeCounter=0;
// function Fruit(name,quantity,currentPrice,totalCost)
var timeTracker=setInterval(timeUpdate,1000);



function timeUpdate(){
  timeCounter++;
	var time=$('.countdownContainer').find('span').text();
	    $('.countdownContainer').find('span').remove();
	   $('.countdownContainer').append('<span>Timer :: '+timeCounter+'</span>');

	if(timeCounter==10){
		  console.log('stopping newPriceGenerator loop');
	    clearInterval(newPriceGenerator);
      clearInterval(timeTracker);
       calculateProfit();
	 }
}


function calculateProfit(){
var spentCash= 100 - totalCash;
var stockSaleCash=0;
var profit;
for(var i=0;i<arr1.length;i++){
	var calprice=Number(arr1[i].currentStockValue());
	console.log("calprice: "+arr1[i]+'::'+calprice);
stockSaleCash=Number(Number(stockSaleCash)+Number(arr1[i].currentStockValue())).toFixed(2);
console.log("stock sale Cash: "+arr1[i]+'::'+stockSaleCash);
}
//console.log("spend Cash::"+spentCash);
//console.log("stock sale Cash::"+stockSaleCash);
profit=Number(stockSaleCash-spentCash).toFixed(2);
$('.finalProfitDisplay').append('<span>Total Profit Made :: '+profit+'</span>');
}

// Building an object for each fruit.
var banana=new Fruit('banana',randomStartPrice(),0,0);
var apple=new Fruit('apple',randomStartPrice(),0,0);
var orange=new Fruit('orange',randomStartPrice(),0,0);
var grape=new Fruit('grapes',randomStartPrice(),0,0);

// adding all  fruit objects created to an array
var arr1 = [banana, apple, orange,grape];
//console.log(arr1);
//background-image: url("paper.gif");
for(var i=0;i<arr1.length;i++){
	var fruit='<div class="fruit"  id="'+arr1[i].name+'"><span>'+arr1[i].name+'</span></div>';
	$('.fruits').append(fruit);
	var priceDiv='<div  id="'+arr1[i].name+'"'+'class="priceDisplay">'+
							'<button class="buy">Buy</button>'+
							'<button class="sell">Sell</button>'+
							'<span id="price'+arr1[i].name+'" data-'+arr1[i].name+'="'+arr1[i].currentPrice+'">'+arr1[i].currentPrice+'</span></div>';
	$('.priceDisplays').append(priceDiv);
}

tableDisplay();
updateTotalCash();

$('.sell').on('click',function(){
	console.log("user clicked on the sell buttn");
	var fruit=$(this).parent().attr('id');
	//var currentPrice=Number($(this).parent().find('span').text());
	arr1.forEach(function(o){
	//	console.log("inside looping function"+o.name);
		if(o.name==fruit && o.quantity>0){
			var price=Number(o.currentPrice);
			console.log('price....'+price);
			o.totalCost=Number(o.totalCost)-price;
			console.log('total  cost...'+o.totalCost);
     console.log('totalCash before calculation...'+totalCash+price);
			totalCash=Number(Number(totalCash)+Number(price)).toFixed(2);
			console.log('totalCash....'+totalCash);
			o.quantity--;
			updateTotalCash();
			tableDisplay();
			console.log(arr1);

			}

	});


})

$('.buy').on ('click', function() {
	var fruit=$(this).parent().attr('id');
  var currentPrice=Number($(this).parent().find('span').text());
console.log('current price from data attribute'+currentPrice);
//console.log(arr1);
if(totalCash-currentPrice<=0){

	console.log('you have run out of cash');
	runOutOfCashFunction();
}else{
	arr1.forEach(function(o){
	//	console.log("inside looping function"+o.name);
		if(o.name==fruit){
			var price=Number(o.currentPrice);
			o.totalCost=Number(o.totalCost)+price;
			totalCash=Number(totalCash-price).toFixed(2);
			o.quantity++
			updateTotalCash();
			tableDisplay();
			console.log(arr1);

      }

	});

}

});

function tableDisplay(){
	$('.displayDetails').children().remove();
for(var i=0;i<arr1.length;i++){
 var name=arr1[i].name;
 var quantity=Number(arr1[i].quantity);
 var totalCost=Number(arr1[i].totalCost);
	var averagePrice=(isNaN(totalCost/quantity))?0:totalCost/quantity;

	 var strBuilder='<tr id="'+name+'">'+
	 								'<td>'+name+'</td>'+
									'<td>'+quantity+'</td>'+
									'<td>'+averagePrice+'</td>'
    $('.displayDetails').append(strBuilder);
	 console.log("name: "+name+"  quantity: "+quantity+" totalCost: "+totalCost);

}

}

	var that=this;
	console.log(that);
	//var temp = 0;
	var newPriceGenerator=setInterval(function(){
		for(let i=0;i<arr1.length;i++){
		var temp='#'+'price'+arr1[i].name;
		$(that).find(temp).remove();
		var randomNumber = Number(generateRandomPrice());
		arr1[i].currentPrice=Number(Number(arr1[i].currentPrice)+Number(randomNumber)).toFixed(2);
		 var newPriceDiv='<span id="price'+arr1[i].name+'"  data-'+arr1[i].name+'="'+arr1[i].currentPrice+'">'+arr1[i].currentPrice+'</span>';
		 var div='.priceDisplays #'+arr1[i].name;
		 console.log(div);
		 $(div).append(newPriceDiv);

		 //clearInterval(timer);
	}
},5000)

function updateTotalCash(){
	$('#totalCash').find('span').remove();
  $('#totalCash').append('<span>'+totalCash+'</span>');
}

function runOutOfCashFunction(){
	$('#totalCash').append('<div  id="notEnoughCash"><span>Not Enough Cash  in the Bank</span></div>');
}

})   //end of document ready function.....


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
			this.currentStockValue=function(){
				var temp=Number(Number(this.quantity)*Number(this.currentPrice)).toFixed(2);
				return temp=(temp!=NaN)? temp:0;
			}
}

function findFruit(obj,fruit){
	console.log("inside findFruit function");
	return obj.name==fruit;
}
