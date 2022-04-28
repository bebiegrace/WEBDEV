

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
function reOffset(){
  var BB=canvas.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;        
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }

var isDown=false;
var startX,startY;

var paths=[];
paths.push([
  {x:400,y:95},
  {x:386,y:95},
  {x:386,y:98},
  {x:364,y:98},
  {x:364,y:115},
  {x:386,y:115},
  {x:386,y:107},
  {x:400,y:107}
]);

ctx.fillStyle='skyblue';

draw();

$("#canvas").mousemove(function(e){handleMouseMove(e);});

function draw(highlight){
  ctx.clearRect(0,0,cw,ch);
  for(var i=0;i<paths.length;i++){
    var path=paths[i];
    define(path);
    ctx.stroke();
    if(i==highlight){
      ctx.fill();
    }
  }
}

function define(p){
  ctx.beginPath();
  ctx.moveTo(p[0].x,p[0].y);
  for(var i=0; i<p.length;i++){
    ctx.lineTo(p[i].x,p[i].y);
  }
  ctx.closePath();
}

function handleMouseMove(e){

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  var highlight=-1;
  for(var i=0;i<paths.length;i++){
    var path=paths[i];
    define(path);
    if(ctx.isPointInPath(mouseX,mouseY)){
      highlight=i;
    }
  }
  draw(highlight);

}
body{ background-color: ivory; }
#canvas{border:1px solid red; margin:0 auto; }
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<h4>Move the mouse over the shape to highlight the shape</h4>
<canvas id="canvas" width=450 height=450></canvas>

