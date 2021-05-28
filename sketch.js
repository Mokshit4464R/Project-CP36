var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}



function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 feed=createButton("Feed The Dog");
 feed.position(650,95);
 feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  database=firebase.database()
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill("white");
  stroke("black");
  textSize(25);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 + "PM", 150, 30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 150, 30)
  }else{
    text("Last Feed :"+lastFed+ "AM", 150, 30)
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock=foodObj.getFoodStock()
  if(food_stock <= 0){
    foodObj.updateFoodStock(food_stock *0);
}else{
    foodObj.updateFoodStock(food_stock -1);
}
database.ref('/').update({
Food : foodObj.getFoodStock(),
FeedTime : hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
})

}

