var ground,groundImg;
var ballImg, ball, ballsGroup;
var climberImg, climber, climbersGroup;
var pokemon, pokemonImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  groundImg = loadImage("bg.jpg");
  ballImg = loadImage("bone.png");
  //climberImg = loadImage("climber.png");
  pokemonImg = loadImage("bad2.png");
  //spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  ground = createSprite(300,300);
  ground.addImage("ground",groundImg);
  ground.velocityY = 1;
  
  ballsGroup = new Group();
  //climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  pokemon = createSprite(200,200,50,50);
  pokemon.scale = 0.3;
  pokemon.addImage("pokemon", pokemonImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      pokemon.x = pokemon.x - 3;
    }
    
    if(keyDown("right_arrow")){
      pokemon.x = pokemon.x + 3;
    }
    
    if(keyDown("space")){
      pokemon.velocityY = -10;
    }
    
    pokemon.velocityY = pokemon.velocityY + 0.8
    
    if(ground.y > 400){
      ground.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
   
    if(invisibleBlockGroup.isTouching(pokemon) || pokemon.y > 600){
      pokemon.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var ball = createSprite(200, -50);
   // var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = ball.width;
    invisibleBlock.height = 2;
    
    ball.x = Math.round(random(120,400));
    //climber.x = ball.x;
    invisibleBlock.x = ball.x;
    
    ball.addImage(ballImg);
   // climber.addImage(climberImg);
    ball.scale=0.1
    ball.velocityY = 1;
   // climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    pokemon.depth = ball.depth;
    pokemon.depth +=1;
   
    //assign lifetime to the variable
    ball.lifetime = 800;
  //  climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

  
    //add each door to the group
    ballsGroup.add(ball);
    invisibleBlock.debug = true;
  //  climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}