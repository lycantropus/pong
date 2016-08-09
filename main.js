var canvas;
var stage;
var context;
function init() {
	
stage = new createjs.Stage("myCanvas");

var ball = new createjs.Shape();
ball.addEventListener("click", handleClick);
ball.graphics.beginFill("#000000").drawCircle(0,0,50);
ball.x=50;
ball.y=50;

//createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000)

stage.addChild(ball);


}



function handleClick(event){
	console.log("clicked");
}