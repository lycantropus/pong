var stage;
function init() {
	
stage = new createjs.Stage("myCanvas");

var ball = new createjs.Shape();
ball.addEventListener("click", handleClick);
ball.graphics.beginFill("#000000").drawCircle(0,0,25);
ball.x=50;
ball.y=50;

var rectLeft = new createjs.Shape();

rectLeft.graphics.beginFill("#000000").drawRect(0, 0, 20, 100);
rectLeft.x= 20;
rectLeft.y= 20;




//createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
createjs.Ticker.addEventListener("tick", tick);

stage.addChild(ball);
stage.addChild(rectLeft);


}



function handleClick(event){
	console.log("clicked");
}

function tick(event){
	stage.getChildAt(0).x+=5;
	if(stage.getChildAt(0).x >=1300){
		stage.getChildAt(0).x=0;
	}
	stage.update();
}