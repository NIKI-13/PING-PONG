const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const reset = document.querySelector("#reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const bckgrnd = "darkgreen";
const racket1Color = "#0000CD";
const racket2Color = "#FF4500";
const racketBorder = "black";
const ball = "#ADFF2F";
const ballBorder = "black";
const ballRadius = 12.5;
const racketSpeed = 75;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let racket1 ={
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let racket2 ={
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();


function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() =>{
        clearBoard();
        drawRackets();
        drawBall(ballX, ballY);
        moveBall();
        collision();
        nextTick();
    }, 10) 
};
function clearBoard(){
    ctx.fillStyle = bckgrnd;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawRackets(){
    ctx.strokeStyle = racketBorder;
    
    ctx.fillStyle = racket1Color;
    ctx.fillRect(racket1.x, racket1.y, racket1.width, racket1.height);
    ctx.strokeRect(racket1.x, racket1.y, racket1.width, racket1.height);

    ctx.fillStyle = racket2Color;
    ctx.fillRect(racket2.x, racket2.y, racket2.width, racket2.height);
    ctx.strokeRect(racket2.x, racket2.y, racket2.width, racket2.height);
};
function createBall(){ 
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1)
        ballXDirection = 1;
    else
        ballXDirection = -1;

    if(Math.round(Math.random()) == 1)
        ballYDirection = 1;
    else
        ballYDirection = -1;
       
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;   
    drawBall(ballX, ballY);

};

function moveBall(){
    ballX = ballX + (ballSpeed * ballXDirection);
    ballY = ballY + (ballSpeed * ballYDirection); 
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ball;
    ctx.strokeStyle = ballBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function collision(){
    if (ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius)
        ballYDirection = ballYDirection * -1; 

    if(ballX <= 0){
        player2Score = player2Score + 1;
        updateScore();
        createBall();
        return;
    }

    if(ballX >= gameWidth){
        player1Score = player1Score + 1;
        updateScore();
        createBall();
        return;
    } 

    if(ballX <= (racket1.x + racket1.width + ballRadius)){
        if(ballY > racket1.y && ballY < racket1.y + racket1.height){
            ballX = (racket1.x + racket1.width) + ballRadius;
            ballXDirection = ballXDirection * -1;
            ballSpeed ++;
        }
    }
    if(ballX >= (racket2.x - ballRadius)){
        if(ballY > racket2.y && ballY < racket2.y + racket2.height){
            ballX = racket2.x - ballRadius;
            ballXDirection = ballXDirection * -1;
            ballSpeed ++;
        }
    }

};
function changeDirection(event){
    const keyPress = event.keyCode;
    const racket1UP = 87;
    const racket1Down = 83;
    const racket2UP = 38;
    const racket2Down = 40;

    switch(keyPress){
        case(racket1UP):
            if(racket1.y > 0){
                racket1.y = racket1.y - racketSpeed;
            }
            break;
        case(racket1Down):
            if(racket1.y < gameHeight - racket1.height){
                racket1.y = racket1.y + racketSpeed;
            }   
            break;

        case(racket2UP):
            if(racket2.y > 0){
                racket2.y = racket2.y - racketSpeed;
            }
            break;

        case(racket2Down):
            if(racket2.y < gameHeight - racket2.height){
                racket2.y = racket2.y + racketSpeed;
            }   
            break;
    };
    
};
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;

    racket1 ={
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    racket2 ={
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};


