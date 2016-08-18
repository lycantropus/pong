var stage;
var canvas;
var backgroundImage;
var background;
var ball;
var playerHuman;
var playerBot;
var ballImage;
var playerImage;
var startMenuBackground;


var titleLabel;
var loadingBarContainer;
var loadProgressLabel;
var loadingBarHeight;
var loadingBarWidth;
var LoadingBarColor;
var loadingBar;
var frame;
var preload;
var progresPrecentage;



function init() {

canvas = document.getElementById("myCanvas");
stage = new createjs.Stage(canvas);



startMenuBackground = new createjs.Shape();
startMenuBackground.graphics.beginFill('black').drawRect(0, 0, canvas.width, canvas.height);

stage.addChild(startMenuBackground);

LoadingBarColor = createjs.Graphics.getRGB(50,250,60);

titleLabel = new createjs.Text("PONG", "60px Verdana", LoadingBarColor);
titleLabel.lineWidth= 400;
titleLabel.textAlign = "center";
titleLabel.x=canvas.width/2;
titleLabel.y=canvas.height/4;

loadProgressLabel = new createjs.Text("","18px Verdana",LoadingBarColor);
loadProgressLabel.lineWidth = 200;
loadProgressLabel.textAlign = "center";
loadProgressLabel.x = canvas.width/2;
loadProgressLabel.y = canvas.height/2 + 50;
stage.addChild(loadProgressLabel, titleLabel);

loadingBarContainer = new createjs.Container();
loadingBarHeight = 20;
loadingBarWidth = 300;


loadingBar = new createjs.Shape();
loadingBar.graphics.beginFill(LoadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();
frame = new createjs.Shape();
padding = 3;
frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding/2, -padding/2, loadingBarWidth+padding, loadingBarHeight+padding);

loadingBarContainer.addChild(loadingBar, frame);
loadingBarContainer.x = Math.round(canvas.width/2 - loadingBarWidth/2);
loadingBarContainer.y = Math.round(canvas.height/2 - loadingBarHeight/2);
stage.addChild(loadingBarContainer);


preload = new createjs.LoadQueue(false);
preload.addEventListener("complete", handleComplete);
preload.addEventListener("progress", handleProgress);

preload.loadFile({id: "background", src:"images/background.png"});
preload.loadManifest([{id: "ball", src:"images/ball.png"},
        {id: "player", src:"images/player.png"}]);
 
stage.update();


//createjs.Ticker.addEventListener("tick", tick);

}

function start() {

 background = new createjs.Bitmap(backgroundImage);
    console.log("racio width: "+ canvas.width/backgroundImage.width);
    console.log("racio heigth: "+ canvas.height/backgroundImage.height);
    console.log("bg heigth: " + backgroundImage.height);
    background.setTransform(0,0,canvas.width/backgroundImage.width , (canvas.height/backgroundImage.height ));
 stage.addChild(background);

 
 ball = new createjs.Bitmap(ballImage);
    ball.setTransform(canvas.width/2, canvas.height/2, 2, 2);

 stage.addChild(ball);
 

 playerHuman = new createjs.Bitmap(playerImage);
 playerBot = new createjs.Bitmap(playerImage);

    playerHuman.setTransform(10, canvas.height/2, 2, 2);
    playerBot.setTransform(canvas.width-35, canvas.height/2, 2, 2);
 stage.addChild(playerHuman, playerBot);
 
 
 //updating the stage
 stage.update();
}

function handleProgress() {
 
    loadingBar.scaleX = preload.progress * loadingBarWidth;
 
    progresPrecentage = Math.round(preload.progress*100);
    loadProgressLabel.text = progresPrecentage + "% Loaded" ;
     
    stage.update();
 
}

function handleComplete() {
  
 backgroundImage = preload.getResult("background");
 ballImage = preload.getResult("ball");
 playerImage = preload.getResult("player");
 
 loadProgressLabel.text = "Loading complete click to start";
 stage.update();
 
 canvas.addEventListener("click", handleClick);
}

function handleClick() {
 
 start();
  
 stage.removeChild(loadProgressLabel, loadingBarContainer, titleLabel);
 canvas.removeEventListener("click", handleClick);
 stage.update();
}



function tick(event){
	/*stage.getChildAt(0).x+=5;
	if(stage.getChildAt(0).x >=1300){
		stage.getChildAt(0).x=0;
	}*/
	stage.update();
}