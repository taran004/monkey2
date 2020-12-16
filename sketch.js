var PLAY = 1;
var END = 0;
var gameState = PLAY;

var count  = 0;
var Ground
var backImage

var back
var  bananaImage;
var obstacleImage;


var foodGroup
var gameOver,restart;
  
var player

var obstacle1Group 
var score = 0;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png");
  
  
  bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("stone.png");
}
            
function setup() {
  createCanvas(400, 400);
   
  back = createSprite(200,200);
  back.addImage("abc", backImage);
back.velocityX = -4
  back.x = back.width/2
 
   Ground = createSprite(200,385,400,5);
Ground.visible = false;
   Ground.x = Ground.width/2;
  player = createSprite(100,350,20,20)
  player.addAnimation("running",player_running)

player.scale = 0.1;
   foodGroup = new Group();
  obstacle1Group = new Group();
} 
function draw() {
  background(180);
  
if(gameState === PLAY)  {
  
back.velocityX = -4
  if(back.x < 0){
    back.x = back.width/2
  }
  
  
 if(keyDown("space")) {
    player.velocityY = -10;
   
  }
   player.velocityY = player.velocityY + 0.8
  
  player.collide(Ground)
  if(foodGroup.isTouching(player)){
    score = score + 2
    foodGroup.destroyEach();
  }
  createBannanas();
  createObstacle();
  
   switch(score){
    case 10 : player.scale = 0.12;
             break;
      case 20 : player.scale = 0.14;
             break;
      case 30 : player.scale = 0.16;
             break;   
      case 40 : player.scale = 0.18;
             break;
             default:break;
  }
  
  if(count ===1){
    player.scale = 0.1;
                }
  if(obstacle1Group.isTouching(player)){
  count = count + 1 
    obstacle1Group.destroyEach();
    console.log(count);
  }
  if(count === 2){
    gameState = END
    
  }
  
  
}
  
  if(gameState === END){
    player.velocityY = 0;
    back.velocityX = 0;
    obstacle1Group.destroyEach();
    foodGroup.destroyEach();
    score = 0;
    count = 0;
    textSize(30);
    
    if(keyDown("r")){
      gameState = PLAY
    
    }
  }
  drawSprites();
  
  stroke("white");
     textSize(20);
     fill("white");   
  text("score:" + score,200,50)
  if(gameState === END){
  text("you loose",100,100)
    text("press R to restart",100,200)
  }
}


function createBannanas(){
 if (World.frameCount % 150 === 0) {
    var bananas = createSprite(400,320,40,10);
    bananas.y = random(200,230);
    bananas.addImage("bcd",bananaImage);
    bananas.scale = 0.1;
    bananas.velocityX = -3;
    
     //assign lifetime to the variable    
    bananas.lifetime = 134;
   foodGroup.add(bananas)
 }
}

function createObstacle(){
 if (World.frameCount % 120 === 0) {
    var obstacles = createSprite(400,355,40,40);
    obstacles.addImage("acd",obstacleImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -5;
   
     //assign lifetime to the variable
    obstacles.lifetime = 134;
   
   obstacle1Group.add(obstacles);
   
 }
}

