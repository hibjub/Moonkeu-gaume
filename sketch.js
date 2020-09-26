var banana,bananaImg

var back,backImg

var monkey,monkeyImg

var ground

var rocks,rock1,rock2

var bananas,bananaImg

function preload() {
  backImg = loadImage("jungle.png");
  monkeyImg = loadAnimation("monkey_run_1.png","monkey_run_2.png");
  bananaImg = loadImage("banana.png");
  rock1 = loadImage("rock_a.png");
  rock2 = loadImage("rock_b.png");
}

function setup() {
  createCanvas(400, 360);
  
  monkey = createSprite(50,310,50,50);
  monkey.addAnimation("ape", monkeyImg)
  monkey.scale = 0.4;
  monkey.depth = 3;
  
  ground = createSprite(200,345,400,10);
  ground.visible = false;
  
  back = createSprite(200,180,400,400);
  back.addImage("background", backImg);
  back.x = back.width /2;
  back.velocityX = -6;
  back.depth = 1;
  back.visible = true;
  
  score = 0;
  
  rocks = new Group();
  
  bananas = new Group();
}

function draw() {
  
  background(205,153,0);
  
  if(keyDown("space")) {
    monkey.velocityY = -14;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (back.x < 0) {
   back.x = back.width /2;
  }
  
  if (monkey.isTouching(bananas)) {
   bananas.removeSprites();
   score = score + 2;
  }
  
  switch(score) {
    case 30: monkey.scale = 0.5;
      break;
    case 60: monkey.scale = 0.6;
      break;
    case 90: monkey.scale = 0.7;
      break;
    default: break;
  }
  
  if (monkey.isTouching(rocks)) {
   monkey.scale = 0.4;
   score = 0;
  }
  
  monkey.collide(ground);
  
  Banana();
  
  Rock();
  
  drawSprites();
  
  stroke("yellow");
  textSize(20);
  fill("yellow");
  text("Score:"+ score,300,50);
  
}


function Banana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,150,30,30);
    banana.addImage(bananaImg);
    banana.velocityX = -6;
    banana.y =random(150,310);
    banana.depth = 2;
    banana.scale = 0.5;
    
    banana.lifetime = 300;
    
    bananas.add (banana);
  }
}


function Rock() {
  if (frameCount % 120 === 0) {
    var rock = createSprite(400,310,40,40);
    rock.velocityX = -6;
    rock.depth = 2
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: rock.addImage(rock1);
          break
      case 2: rock.addImage(rock2);
          break;
      default: break;    
    }
    
    rock.scale = 0.5;
    rock.debug = true;
    rock.setCollider("rectangle", 0,0,70,70,0);
    rock.lifetime = 300;
    
    rocks.add (rock);
  }   
}