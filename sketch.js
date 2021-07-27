const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine,world,rand,image,infected,doctor,doctorimg,infectedimg,man1,man2,man3,man4,npcgroup;
var timer=120
var gamestate=2
var Count=0

var infcount=0
var infectedScore=0
var doctorScore=0

function preload(){
    infectedimg=loadImage("corona.png")
    doctorimg=loadImage("doctor.png")
    man1=loadImage("man.png")
    man2=loadImage("man2.png")
    man3=loadImage("man3.png")
    man4=loadImage("man4.png")
}
function setup(){
createCanvas(900,500)

engine=Engine.create()
world=engine.world
edges = createEdgeSprites()

infected=createSprite(700,350,10,10)
infected.addImage(infectedimg)
infected.visible=false

doctor=createSprite(30,50,30,30)
doctor.addImage(doctorimg)
doctor.scale=0.3
doctor.visible=false
infected.scale=0.3
npc1=createSprite(random(20,700),(40,400))
npc2=createSprite(random(20,700),(40,400))
npc3=createSprite(random(20,700),(40,400))
npc4=createSprite(random(20,700),(40,400))
npc1.addImage(man1)
npc2.addImage(man2)
npc3.addImage(man3)
npc4.addImage(man4)
npc1.visible=false
npc2.visible=false
npc3.visible=false
npc4.visible=false
npc1.scale=0.3
npc2.scale=0.4
npc3.scale=0.2
npc4.scale=0.5


if(gamestate===2){
    start = createButton("START")
    start.position(350,420)
    start.mousePressed(()=>{
        start.hide()
        gamestate=0
    form=new Form()
    form.display()
    background("red")
    form.button.mousePressed(()=>{
    if(Count===4){
        gamestate=1
        infected.velocityX=random(-10,10)
        infected.velocityY=random(-10,10)
    }
    })
})
}
  
}

function draw(){
    background("red")
    console.log("gamestate:"+gamestate)
    Engine.update(engine)
    text(mouseX+","+mouseY,mouseX,mouseY)
    if(gamestate===1){
        form.hide()
        timer=timer-0.1
        text("Timer:"+round(timer),750,50)
        doctor.visible=true
        infected.visible=true
//------------------doctor controls---------------
        if(keyDown("w")){
            doctor.position.y-=5
        }
        if(keyDown("a")){
            doctor.position.x-=5
        }   
        if(keyDown("s")){
            doctor.position.y+=5
        }    
        if(keyDown("d")){
            doctor.position.x+=5
        }
//---------------covid controls----------------------
        


        
    
infected.bounceOff(edges,randomvelocity)
//------------------npc--------------------------------------
        npc1.visible=true
        npc2.visible=true
        npc3.visible=true
        npc4.visible=true
        newnpc()
//-----------end state---------
    if(infected.isTouching(npc3)||infected.isTouching(npc4)||infected.isTouching(npc1)||infected.isTouching(npc2)){
        infcount=infcount+0.5
        
    }
    if(doctor.collide(npc1)||doctor.collide(npc3)||doctor.collide(npc2)||doctor.collide(npc4)){
        infectedScore-=0.1
        doctorScore+=0.1
    }

    if(infcount===2){
        infcount=0
        infectedScore+=0.5
        doctorScore-=0.1
    }
    text("Doctor:"+round(doctorScore),200,20)
    text("infected:"+round(infectedScore),400,20)


    }
   if(gamestate ===2){
       background("yellow")
       textSize(25)
       fill("red")
       text("once there was a village named palampur",180,180)
       text("people lived there happily",180,210)
       text("one day infected attacted the village ",180,240)
        text("and now you have to save the people",180,270)
        text("there are two stages in one you have to answer the question",180,300)
        text("and in other you have to fight with infected",180,330)
       text ("the controls for doctor are",180,360)
       text("A=left , S=down , W=up , D=right",180,390)
       text(mouseX+","+mouseY,mouseX,mouseY)
    }

    if(timer<=0){
        gamestate=3
        timer=0
    }
    if(gamestate===3){
        background("green")
        npc1.visible=false
npc2.visible=false
npc3.visible=false
npc4.visible=false
doctor.visible=false
infected.visible=false
      if(doctorScore>infectedScore){
        fill("blue")  
        textSize(35)
          text("YOU WIN",420,230)
      }  
      if(doctorScore<infectedScore){
        fill("blue")  
        textSize(35)
        text("INFECTED WIN",420,230)
      }  
    }

    
        drawSprites()
        doctor.collide(edges)
}

function newnpc(){

 
    if(frameCount%250===0){
        npc1.x=Math.round(random(20,850))
        npc2.x=Math.round(random(20,850))
        npc3.x=Math.round(random(20,850))
        npc4.x=Math.round(random(20,850))
        npc1.y=Math.round(random(75,475))
        npc2.y=Math.round(random(75,475))
        npc3.y=Math.round(random(75,475))
        npc4.y=Math.round(random(75,475))
    }

}
function randomvelocity(){
    infected.velocityX=random(-10,10)
    infected.velocityY=random(-10,10)
}