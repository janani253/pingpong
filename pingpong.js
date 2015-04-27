var canvas;
var ctx;
var xmax=400;
var ymax=500;
var xymin=0;
var x=xmax/2;
var y=ymax/2;
var xfront=1;
var ydown=1;
var posx, posy;
var clickflag=0;
var score=0;

// Define the canvas and context
function init() {
 canvas=document.getElementById("pingpong");
 ctx=canvas.getContext("2d");
 drawPingPongFrame();
 printStartMsg();
}

// Draw a ball moving inside rectangle
function drawMovingBall()
{
if(clickflag==1)
{
 hidePreviousCircle(x-1,y-1);
 hidePreviousCircle(x+1,y-1);
 hidePreviousCircle(x-1,y+1);
 hidePreviousCircle(x+1,y+1);
// Drawing a moving circle
 ctx.beginPath();
 ctx.fillStyle="white";
 ctx.arc(x,y,10,0,2*Math.PI);
 ctx.stroke();
 ctx.fill();
 if(x>=xmax-5) xfront=0;
 else if(x<=xymin+5) xfront=1;
 if(y>=ymax-15) 
  if ((posx<x-50) || (posx>x+50)) // Game over 
   printGameOver(); 
  else { ydown=0; score++; } 
 else if(y>=ymax-5) ydown=0; 
 else if(y<=xymin+5) ydown=1;

 if(xfront==1) x+=0.8;
 else x-=0.8;
 if(ydown==1) y+=0.8;
 else y-=0.8;
}
}

function hidePreviousCircle(x1,y1)
{
 //Hiding previous circle
 ctx.beginPath();
 ctx.fillStyle="black";
 ctx.arc(x1,y1,10,0,2*Math.PI);
 ctx.stroke();
 ctx.fill();
}

function drawPingPongFrame() {
// Drawing a rectangular enclosure for the ping pong ball
 ctx.beginPath();
 ctx.fillStyle="black";
 ctx.rect(0,0,xmax,ymax);
 ctx.stroke();
 ctx.fill();
}

function printStartMsg() {
 if((clickflag==0) && (score==0))
 {
  ctx.fillStyle="white";
  ctx.font="20px Georgia";
  ctx.fillText("Click to start",120,240);
 }
}

function drawBoard(e) {
 drawPingPongFrame();
 printStartMsg();
// Drawing the board based on cursor position
 posx = e.clientX;
 posy = ymax-10;
 ctx.fillStyle = "white";
 ctx.fillRect (posx-50, posy, 100, 10);
}

function printGameOver() {
 drawPingPongFrame();
 alert("Game Over!\nYour Score: "+score);
 var flashcount = 0;
 var timer = setInterval(function() {
            flashcount++;
            if( flashcount%2 == 1) {
                 ctx.fillStyle="white";
                 ctx.font="20px Georgia";
                 ctx.fillText("Game Over!",120,210);
                 ctx.fillText("Your Score: "+score,110,240);
                 ctx.fillText("Click to start",110,270);
            }
            else {
                drawPingPongFrame();
            }
            if( clickflag == 1) clearInterval(timer);
        },500);
 clickflag=0;
 x=xmax/2;
 y=ymax/2;
}
