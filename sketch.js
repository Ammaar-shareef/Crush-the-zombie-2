const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var breakButton;
var bg,bgImg;
var ground, leftWall, rightWall;
var bridge, bridgeImg;
var joinPoint, jointLink;
var zombie1,zombie2,zombie3,zombie4;
var stones = [];
var stoneImg;

function preload(){
  
  bgImg = loadImage("assets/background.png");
  bridgeImg = loadImage("assets/wood.png");
  
  zombieRight = loadAnimation("assets/Zombie-1.png","assets/Zombie-2.png");
  
  zombieLeft = loadAnimation("assets/Zombie-3.png","assets/Zombie-4.png");

  stoneImg = loadImage("assets/stone.png");
}

function setup() {
  createCanvas(800,500);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(400,490,800,20);
  leftWall = new Base(10,400,20,200);
  rightWall = new Base(790,400,20,200);

  bridge = new Bridge(17,{x:0,y:200});
  joinPoint = new Base(770,200,20,50);

  Matter.Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint); 
  
  for(var i = 0; i <= 8; i++){
    var x = random(width/2-200, width/2+300);
    var y = random(-10,100);
    var stone = new Stone(x,y,50,50);
    stones.push(stone);
  }

  zombie = createSprite(80,450,10,10);
  zombie.addAnimation("left to right",zombieRight);
  zombie.addAnimation("right to left",zombieLeft);
  zombie.scale = 0.1;
  zombie.velocityX = 0.2;

  zombieRight.frameDelay = 20;
  zombieLeft.frameDelay = 20;
 
  breakButton = createImg("axe.png"); 
  breakButton.position(750,390); 
  breakButton.size(50,50); 
  breakButton.mousePressed(handleButtonPress); 
  

  ellipseMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  background("grey");
  image(bgImg,0,0,800,500);
  Engine.update(engine);
  
  ground.display();
  leftWall.display();
  rightWall.display();
  bridge.show();
  
  for(var stone of stones){
    stone.displayBall();
  }

  drawSprites();
}
function handleButtonPress() {
  jointLink.detach(); 
  setTimeout(() => {
    bridge.break(); 
  }, 1500);
 }
