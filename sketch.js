//creating variables
var standingDog, happyDog, database, foodS, foodStock;
var dog;

function preload()
{
  //loading images
  standingDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

  
}

function setup() {
	createCanvas(500, 500);
  
  //setting up attributes to dog
  dog = createSprite(250,250,10,10)
  dog.addImage(standingDog)

  dog.scale = 0.5

  //enables firebase
  database = firebase.database()
  
  //goes to firebase
  foodStock = database.ref('Food')

  //setting foodStock in DB to 5
  writeStock(5)
 
  //foodstock is constantly set to the thing, so if there's a change this reads it
  foodStock.on("value",readStock)
  

}


function draw() {  
  background(46,139,87)

  textSize(15)
  fill("black")
  stroke("blue")

  //writes number of food remaining, feeds dog
  if(foodS>=1 && keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
    foodS= foodS - 1
  }

  drawSprites();
  
  if(foodS>1)
  {
  text("Press the up arrow to feed the dog! You have " +foodS+ " treats left!",15,485)
  }
  else
  {
    text("Sorry! No more treats.",15,485)
  }
  

}

//takes value from firebase, sets variable foodS to that
function readStock(data)
{
  foodS = data.val();

}

//goes to firebase and updates food count to x
function writeStock(x)
{
  database.ref('/').update({
    Food:x
  })
}


