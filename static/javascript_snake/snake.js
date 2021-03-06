const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "static/img_snake/ground.png";

const foodImg = new Image();
foodImg.src = "static/img_snake/food.png";

// load sounds
let gameover = new Audio();
gameover.src = "static/audio/gameover.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
};

// collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
};

// draw to the canvas

function draw(){

    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "blue" : "red";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over

    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
        gameover.play()
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("Score " + score, box, 2*box);
};

// draw function every 150 ms

let game = setInterval(draw,150);