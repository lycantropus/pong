var stage;
var canvas;
var bg;

var stagewidth= 1300;
var stageheight=800;

var main;
var startB;
var creditsB;
var credits;


var player;
var ball;
var cpu;
var win;
var lose;

var playerScore;
var cpuScore;
var cpuSpeed=6;

var xSpeed = 5;
var ySpeed = 5;

//var tkr = new Object;

var queue;
var manifest;
var totalLoaded=0;

//var TitleView = new Container();

function setupManifest(){
manifest = [
            {src:"assets/bg.png", id:"bg"}
            ];
}

function startPreload(){
	queue = new createjs.LoadQueue(true);
    queue.installPlugin(createjs.Sound);          
    queue.on("fileload", handleFileLoad);
    queue.on("complete", loadComplete);
    queue.on("error", loadError);
    queue.loadManifest(manifest);
}


function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
    if(event.item.id == "bg"){
        console.log("bg is loaded");
        //create bitmap here
    }

}
 
 
function loadError(evt) {
    console.log("Error!",evt.text);
}
 
 

 
function loadComplete(event) {
    console.log("Finished Loading Assets");
}


function drawBackground() {
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#000").drawRect(0, 0, 600, 600);
    stage.addChild(rect);

    for (var i = 0; i < 180; i++) {
        var randNumX = Math.floor(Math.random() * stagewidth);
        var randNumY = Math.floor(Math.random() * stageheight);
        var circle = new createjs.Shape();
   
        circle.graphics.beginFill("#FFF").drawCircle(randNumX, randNumY, 2);
        stage.addChild(circle);
    }

}


function init() {

canvas = document.getElementById("myCanvas");
stage = new createjs.Stage(canvas);
  queue = new createjs.LoadQueue(true);
  //queue.installPlugin(createjs.Sound);
  drawBackground();
var progressText = new createjs.Text("", "20px Arial", "#000000");
progressText.x = 300 - progressText.getMeasuredWidth() / 2;
progressText.y = 20;
stage.addChild(progressText);

setupManifest();
startPreload();
stage.update();



  //queue.load();
  //console.log(manifest);


/*var ball = new createjs.Shape();
ball.addEventListener("click", handleClick);
ball.graphics.beginFill("#000000").drawCircle(0,0,25);
ball.x=50;
ball.y=50;

var rectLeft = new createjs.Shape();

rectLeft.graphics.beginFill("#000000").drawRect(0, 0, 20, 100);
rectLeft.x= 20;
rectLeft.y= 20;*/




//createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
createjs.Ticker.addEventListener("tick", tick);

//stage.addChild(ball);
//stage.addChild(rectLeft);


}



function addTitleView(){
	startB.x = 240 - 31.5;
    startB.y = 160;
    startB.name = 'startB';
     
    creditsB.x = 241 - 42;
    creditsB.y = 200;
     
    TitleView.addChild(main, startB, creditsB);
    stage.addChild(bg, TitleView);
    stage.update();
     
    // Button Listeners
     
    startB.onPress = tweenTitleView;
    creditsB.onPress = showCredits;
}



function handleClick(event){
	console.log("clicked");
}

function tick(event){
	/*stage.getChildAt(0).x+=5;
	if(stage.getChildAt(0).x >=1300){
		stage.getChildAt(0).x=0;
	}*/
	stage.update();
}