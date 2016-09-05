//game elements
var stage;
var canvas;
var backgroundImage;
var background;
var ball;
var playerHuman;
var playerBot;
var ballImage;
var playerImage;
var win;
var lose;
var playerScore;
var botScore;
var botSpeed;
var ballSpeedX;
var ballSpeedY;
var initialBallX;
var initialBallY;

//loading screen
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



function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    if(background!=null)
    background.setTransform(0,0,canvas.width/backgroundImage.width , (canvas.height/backgroundImage.height ));

    if(playerHuman!=null)
    playerHuman.setTransform(10, canvas.height/2 - playerImage.height, 1, 1);

    if(playerBot!=null)
    playerBot.setTransform(canvas.width - 35, canvas.height/2 - playerImage.height, 1, 1);

    if(ball!=null)
    ball.setTransform(canvas.width/2 - ballImage.width, canvas.height/2 - ballImage.height, 1, 1);

    if(playerScore!=null)
    playerScore.setTransform(canvas.width/2 - canvas.width/20 -10, canvas.height/20);

    if(botScore!=null)
    botScore.setTransform(canvas.width/2 + canvas.width/20 - 10, canvas.height/20);

    stage.update();
}


function init() {

    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);

    window.addEventListener('resize', resize, false);

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
    preload.installPlugin(createjs.Sound);
    //preload.loadFile({id: "background", src:"images/background.png"});
    preload.loadManifest([
        {id: "background", src:"images/background.png"},
        {id: "ball", src:"images/ball.png"},
        {id: "player", src:"images/player.png"},
        {id:"bounce", src:"sounds/ping_pong_8bit_plop.ogg"},
        {id:"hit", src:"sounds/ping_pong_8bit_beeep.ogg"},
        {id:"fall", src:"sounds/ping_pong_8bit_peeeeeep.ogg"}

        ]);



    resize();

    //TODO aumentar velocidade a cada toque e relativizar ao tamanho da janela
    ballSpeedX=14;
    ballSpeedY=-14;




    stage.update();


    createjs.Ticker.addEventListener("tick", tick);

}

function start() {

    background = new createjs.Bitmap(backgroundImage);

    background.setTransform(0,0,canvas.width/backgroundImage.width , (canvas.height/backgroundImage.height ));
    stage.addChild(background);

 
    ball = new createjs.Bitmap(ballImage);
    ball.setTransform(canvas.width/2 - ballImage.width, canvas.height/2 - ballImage.height, 1, 1);
    stage.addChild(ball);
 

    playerHuman = new createjs.Bitmap(playerImage);
    playerBot = new createjs.Bitmap(playerImage);
    //console.log(playerHuman.height);
    playerHuman.setTransform(10, canvas.height/2 - playerImage.height, 1, 1);
    playerBot.setTransform(canvas.width-35, canvas.height/2 - playerImage.height, 1, 1);
    stage.addChild(playerHuman, playerBot);

    playerScore = new createjs.Text("0"," bold 30px Verdana",LoadingBarColor  );
    botScore = new createjs.Text("0"," bold 30px Verdana",LoadingBarColor  );

    playerScore.setTransform(canvas.width/2 - canvas.width/20 -10, canvas.height/20);
    botScore.setTransform(canvas.width/2 + canvas.width/20 - 10, canvas.height/20);
    stage.addChild(playerScore, botScore);

    ball.x=canvas.width/2;
    ball.y=canvas.height/2;

    //updating the stage
    stage.update();


}

function handleProgress(event) {
 
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

    resize();
    stage.update();
}

//repositions all props to initial state;
function reset(){
    //ball.x= initialBall.x;
    //ball.y= initialBall.y;
    ball.setTransform(canvas.width/2 - ballImage.width, canvas.height/2 - ballImage.height, 1, 1);

}

function update(){

    //ball
    ball.x+=ballSpeedX;
    ball.y+=ballSpeedY;


    //bot
    //veloc 15
    if(playerBot.y+30 < ball.y &&
       playerBot.y <= canvas.height - (canvas.height/18 + playerImage.height)) {
       playerBot.y = playerBot.y + 15;
    }
    else if(playerBot.y+30 > ball.y &&
            playerBot.y >= canvas.height/18) {
            playerBot.y = playerBot.y - 15;
    }

    //vertical inversion
    if(ball.y <= canvas.height/18)
    {
        ballSpeedY = -ballSpeedY;
        console.log("top invertion at: " + ball.y);
        createjs.Sound.play('bounce');
    }
    else if(ball.y >= canvas.height -  (canvas.height/18 + 16)){
        ballSpeedY = -ballSpeedY;
        console.log("bottom invertion at: " + canvas.height/18);
        createjs.Sound.play('bounce');
    }

    //bot score
    if((ball.x) <= 0)
    {
        ballSpeedX= -ballSpeedX;
        botScore.text = parseInt(botScore.text + 1);
        reset();
        createjs.Sound.play('fall');
    }

    //player score
    if(ball.x > canvas.width)
    {
        ballSpeedX= -ballSpeedX;
        playerScore.text = parseInt(playerScore.text + 1);
        reset();
        createjs.Sound.play('fall');
    }

    //bot collision

    if( ball.x + playerImage.width >= playerBot.x &&
        ball.x + playerImage.width < playerBot.x + 14 &&
        ball.y >= playerBot.y &&
        ball.y < playerBot.y + 60
        )
    {
        ballSpeedX *= -1;
        createjs.Sound.play('hit');
    }

    //Player collision

    if(ball.x <= playerHuman.x + playerImage.width &&
       ball.x > playerHuman.x &&
       ball.y >= playerHuman.y &&
       ball.y < playerHuman.y + 60)
    {
        ballSpeedX *= -1;
        createjs.Sound.play('hit');
    }


    if(playerScore.text== '5'){
        alert("You Win");
        start();
    }

    if(botScore.text== '5'){
        alert("CPU Wins");
        start();
    }

}



function tick(){

    if(key.isPressed('up')|| key.isPressed('w'))
    {
        if(playerHuman.y>=canvas.height/18)
        {
        playerHuman.y-=15;
        }
    }
    if(key.isPressed('down') || key.isPressed('d'))
    {
        if(playerHuman.y<=canvas.height - (canvas.height/18 + playerImage.height))
        {
            playerHuman.y+=15;
        }
    }

    update();

	stage.update();
}