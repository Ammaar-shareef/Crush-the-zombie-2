const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground, leftWall, rightWall;
var bridge, bridgeImg;
var joinPoint, jointLink;
var bgImg;
var zombie1,zombie2,zombie3,zombie4;
var stones = [];
var stoneImg;

function preload(){
  
  bgImg = loadImage("assets/background.png");
  bridgeImg = loadImage("assets/wood.png");
  
  zombie1 = loadImage("assets/Zombie-1.png");
  zombie2 = loadImage("assets/Zombie-2.png");
  
  zombie3 = loadImage("assets/Zombie-3.png");
  zombie4 = loadImage("assets/Zombie-4.png");

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

  bridge = new Bridge(17,{x:0,y:400});
  joinPoint = new Base(770,400,20,50);

  Matter. Composite.add(bridge.body, joinPoint);
  jointLink = new Link(bridge, joinPoint); 
  
  zombie = createSprite(100,480,10,10);
  zombie.addAnimation("left to right",zombie1,zombie2);
  zombie.addAnimation(" right to left",zombie3,zombie4);
  zombie.scale = 0.1;
  zombie.velocityX = 1;

  breakButton = createButton(""); 
  breakButton.position(width - 200, height / 2 - 50); 
  breakButton.class("breakbutton"); 
  breakButton.mousePressed(handleButtonPress); 

  ellipseMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  background("grey");
  Engine.update(engine);
  
  image(bgImg,800,500);
  imageMode(CENTER);
  
  ground.display();
  leftWall.display();
  rightWall.display();
  bridge.show();
  for(var stone of stones){
    stone.displayBall();
  }
  for(var i = 0; i <= 8; i++){
    var x = random(width/2-200, width/2+300);
    var y = random(-10,140);
    var stone = new Stone(x,y,80);
    stones.push(stone);
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
