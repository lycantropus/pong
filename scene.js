var bg, titleLabel, descriptionLabel, fpsLabel;
var assets = [];

function createSceneElements() {

	var ball = new createjs.Shape();
	
	ball.graphics.beginFill("#000000").drawCircle(0,0,50);
	ball.x= 50;
	ball.y=50;
	assets.push(ball);


}

function updateSceneElements(){

	for( var i=0; i< assets.length; i++)
	{
		assets[i].draw();
	}

}