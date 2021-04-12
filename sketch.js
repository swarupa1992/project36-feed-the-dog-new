var dog,sadDog,hDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var foodti,foodS;


function preload(){

sadDog = loadImage("Dog.png");
hDog = loadImage("happydog.png");

}

function setup() {

  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage("sdog",sadDog);
  dog.addImage("hdog",hDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("Feed Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedsDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {

  background(46,139,87);

  foodObj.display();
 

  //write code to read fedtime value from the database 
  
  var foodT=database.ref('FoodTime');
  foodT.on("value",readTime);

 
  function readTime(data){
    foodti = data.val();
    foodObj.getFedTime(foodti);
  }
 
//write code to display text lastFed time here
  fill(255,255,254);
  textSize(15);
  if(foodti>= 12){
      text("Last Feed : " + foodti % 12  + " PM" ,300,30);
  } else if(foodti == 0){
      text("LastFeed : 12 PM",300,30);
  }else{
       text("Last Feed : "+ foodti  + " AM",300,30);
  }
  
  if(foodS === 0){
    fill("black");
    text("Food not available-Please add the food",300,80);
  }
 
  drawSprites();
}



//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//code to update food stock and last fed time
function feedsDog(){

  dog.changeImage("hdog",hDog);
  if(foodS !== 0){
  if(dog.x < 800 )
    dog.x = dog.x + 5;
  else
    dog.x = dog.x - 5;
  }

  if(foodS > 0){  
    foodS--; 
  }
  
  var hr = hour();
  console.log("hour" + hr);
    
  database.ref('/').update({
    Food : foodS,
    FoodTime : hr
  })

}



//function to add food in stock
function addFoods(){

  dog.changeImage("sdog",sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

