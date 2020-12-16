var PLAY = 1,fc=150;
var END = 0;
var gameState = 1;
var mon,mon_img;
var survivalTime=0;
var monkey , monkey_running;
var banana ,bananaImage, rocks, rocksImage;
var FoodGroup, rocksGroup;
var score =0;
var gravity;
var end,end_img;
var bac_1,bac0_12,bac0_2,bac0_22;
var roof,run,ping,bac_music;
function preload(){
  end_img = loadImage ("Arcade_Sona_Game_Over_icon.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bac0_12 = loadImage("forest1.jpg");
  bananaImage = loadImage("banana.png");
  rocksImage = loadImage("bullet.png");
  mon_img = loadImage("sprite_1.png");
  run = loadSound("Cinematic Trailer Transition (Whoosh) - Sound Effect HD.mp3")
  ping = loadSound("PING - Sound effect.mp3")
  bac_music = loadSound("monkey.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  bac_music.play();   
  bac_music.loop();  
  bac0_1 = createSprite(windowWidth/2,windowHeight/2,10,10);
  bac0_1.addImage(bac0_12);
  bac0_1.velocityX=-3;
  bac0_1.scale = 1.5
  //bac0_2 =     createSprite(windowWidth/2,windowHeight/2,10,10);
  //bac0_2.addImage(bac0_12);
  monkey=createSprite(77,316,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.velocityY=12;
  ground=createSprite(400,350,900,10);
  ground.visible = false;
  end = createSprite(windowWidth/2,windowHeight/2,10,10);
  end.addImage(end_img);
  end.visible = false;
  mon = createSprite(77,316,10,10);
  mon.scale=0.1;
  mon.addImage(mon_img);
  mon.visible = false;
  roof = createSprite(windowWidth/2,100,20000,10);
  roof.visible = false;
  foodGroup = createGroup();
  rocksGroup = createGroup();
}


function draw() {
  background("white");
  drawSprites();
 
  if (gameState === PLAY)
  {
    rocks(); 
    bananas();
    bac0_1.velocityX=-3;
    monkey.visible=true;
    mon.visible=false;
    end.visible=false;

  if (foodGroup.isTouching(monkey))
  {
    foodGroup.destroyEach();
    score=score+1;
    ping.play();
  }
    
  if(touches.length >0 ||keyWentDown("space"))
  {
    monkey.velocityY=-7;   
    run.play();
  }  
    
  if (touches.length <0|| keyWentUp("space"))
  {
  monkey.velocityY=7; 
  touches = [];
  } 
    
  if(monkey.y>=340){
    monkey.velocityY=10
  }         
             
  
    fill("red");
    textSize(20);
    survivalTime=survivalTime+1;
//  survivalTime = Math.ceil(frameCount/frameRate())
  text ("Survival Time:"+ survivalTime,240,20);
 //   text ("s"+framecount,240,50);
  } 
  
  if(rocksGroup.isTouching(monkey)){
    rocksGroup.destroyEach();  
     monkey.visible=false;
     foodGroup.destroyEach();
    gameState=END;
  }
  if (survivalTime % 100 == 0){
  fc=fc-1; 
  }
  
  bac0_1.velocityX=-3;
  
  if (gameState === END)
  {
  textSize(30);
  fill("red");
  text("Press R To Restart Or Touch The Screen",windowWidth/14,150); 
  bac_music.stop();
  bac0_1.velocityX=-0;
 
//  survivalTime=0;
     textSize(20);
     text ("Survival Time:"+ survivalTime,240,20);
 
  if (touches.length >0 ||keyDown("r"))
  {
  gameState = PLAY; 
  touches = [];
  bac_music.play();
    survivalTime=0;
     score=0;
  }  
    
  mon.visible = true;  
  end.visible = true;
  }
  if(bac0_1.x <0)
  {
  bac0_1.x = bac0_1.width/2;
  }  
  textSize(19); 
  fill("red");
  text ("Banana Collected:"+score,10,20);
  monkey.collide(ground);
  monkey.bounceOff(roof);
  
}


function rocks()
{
 if (frameCount % fc === 0)
 {
 rock = createSprite(390,330,10,10);
 rock.setCollider("rectangle",10,10,7,7);
 rock.y = Math.round(random(100,300))
 rock.addImage(rocksImage);
 rock.scale = 0.1;
 rock.velocityX = -4;
 rocksGroup.add(rock);
 }
}

function bananas(){
 if (frameCount % 100 === 0)
 {
 banana = createSprite(200,200,10,10);
 banana.addImage(bananaImage);
 banana.scale=0.1;
 banana.velocityX=-4;
 banana.y = Math.round(random(250,100))
 foodGroup.add(banana);
 }
}


