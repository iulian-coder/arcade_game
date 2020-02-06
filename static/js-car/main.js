const speedDash = document.querySelector('.speed-dash');
const scoreDash = document.querySelector('.score-dash');
const lifeDash = document.querySelector('.life-dash');
const container = document.querySelector('#container');
const btnStart = document.querySelector('.btn-start');
let gameOver = document.querySelector('.game-over')


btnStart.addEventListener('click', startGame);
document.addEventListener('keydown', pressKeyOn);
document.addEventListener('keyup', pressKeyOff);

let animationGame = requestAnimationFrame(playGame);
let gamePlay = false;
let player;


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let endGame = document.createElement('div');
endGame.setAttribute('class', '.end-game')
endGame.innerHTML = "GAME OVER";
endGame.style.fontSize = "100px";
endGame.style.textAlign = "center";
endGame.style.color = "color";
endGame.style.position = 'relative';
endGame.style.padding = '50px';
endGame.style.zIndex = 931;
endGame.style.backgroundColor = 'white';




function startGame(){
    container.innerHTML = "";
    btnStart.style.display='none';
    let div = document.createElement('div');
    div.setAttribute('class', 'playerCar');
    div.x = 350;
    div.y = 500;
    container.appendChild(div);
    gamePlay = true;
    animationGame = requestAnimationFrame(playGame);
    

    // player default values
    player = {
        ele: div,
        speed: 1,
        lives: 3,
        gameScore: 0,
        carsToPass: 0,
        score: 1,
        roadwidth: 250,
        gameEndCounter: 0
    }

    // generate road
    startBoard();

    // create and start enemies
    startEnemies(10);


}


function startBoard() {
    for(let x = 0;x < 13;x++) {
        let div = document.createElement('div');
        div.setAttribute('class', 'road');
        div.style.top = (x * 50) + 'px';
        div.style.width = player.roadwidth + 'px';
        container.appendChild(div)
    } 

    

}


function startEnemies(num){
    // enemies = ['enemy1', 'enemy2', 'enemy3', 'enemy4'];
    for(let x = 0; x < num; x++){
        // let randomCar = enemies[Math.floor(Math.random() * enemies.length)];
        let temp = "enemy" + (x + 1);
        let div = document.createElement('div');
        // div.innerHTML = (x + 1);
        div.setAttribute('class', 'enemy');
        div.setAttribute('id', temp);
        // div.style.backgroundColor = randomColor();
        makeBad(div);
        container.appendChild(div);
    }
}



function makeBad(enemy) {
    let tempRoad = document.querySelector('.road');
    enemy.style.left = tempRoad.offsetLeft + Math.ceil(Math.random() * tempRoad.offsetWidth) - 30 + "px";
    enemy.style.top = Math.ceil(Math.random() * -1100) + "px"
    enemy.speed = Math.ceil(Math.random() * 17) + 2;

}


function pressKeyOn(event){
    event.preventDefault();
    keys[event.key] = true;

}

function pressKeyOff(event){
    event.preventDefault();
    keys[event.key] = false;
    
}

function updateDash(){
    scoreDash.innerHTML = player.score;
    lifeDash.innerHTML = player.lives;
    speedDash.innerHTML = Math.round(player.speed * 10); 
}


function moveRoad() {
    let tempRoad = document.querySelectorAll('.road');
    let previousRoadPosition = tempRoad[0].offsetLeft;
    let previousWidth = tempRoad[0].width;
    for(let x = 0; x < tempRoad.length;x++){
        let num = tempRoad[x].offsetTop + player.speed;
        if(num > 600){
            num -= 660;

        }
        tempRoad[x].style.top = num + 'px';
    }
}


function isCollide(a, b) {
    let aRectangle = a.getBoundingClientRect();
    let bRectangle = b.getBoundingClientRect();
    return !(
        
        (aRectangle.bottom < bRectangle.top) || (aRectangle.top > bRectangle.bottom) ||
        (aRectangle.right < bRectangle.left) || (aRectangle.left > bRectangle.right)
    )
}


function moveEnemies(){
    let tempEnemy = document.querySelectorAll('.enemy');
    // console.log(tempEnemy)
    for(let i = 0; i < tempEnemy.length;i++){
        let y = tempEnemy[i].offsetTop + player.speed - tempEnemy[i].speed;
        if(y > 4000 || y < -4000){
             //reset car
        if(y > 4000){
            player.score++;
        }             
             makeBad(tempEnemy[i]);
        } else {
            tempEnemy[i].style.top = y + 'px';
            let hitCar = isCollide(tempEnemy[i],player.ele);
            // console.log(hitCar);
            if(hitCar){
                player.speed = 0;
                player.lives -= 1;
                if(player.lives < 1){
                    player.gameEndCounter = 1;
                    // gameOver.style.display = 'block';
                    // document.querySelectorAll('.playerCar').style.display = 'none';
                    container.appendChild(endGame);

                }

                makeBad(tempEnemy[i]);
            } 
        }
    }
 }

function playGame(){
    if(player.gameEndCounter > 0) {
      player.gameEndCounter--;
      player.y = (player.y > 60) ? player.y - 30 : 60;   
      if(player.gameEndCounter == 0) {
        gamePlay = false;
        document.querySelector('.playerCar').style.display = 'none';
        btnStart.style.display = 'block';
      }  
    }
    if (gamePlay){
        updateDash();
        // movement
        moveRoad();
        moveEnemies();
        if (keys.ArrowUp) {
            player.ele.y -= 1;
            player.speed = player.speed < 20 ? (player.speed + 0.15) : 20
        }
        if (keys.ArrowDown) {
            player.ele.y += 1;
            player.speed = player.speed > 0 ? (player.speed - 0.10) : 0
        }
        if (keys.ArrowRight) {
            player.ele.x += (player.speed / 4);
        }
        if (keys.ArrowLeft) {
            player.ele.x -= (player.speed / 4);
        }
        player.ele.style.top = player.ele.y + 'px';
        player.ele.style.left = player.ele.x + 'px';
        animationGame = requestAnimationFrame(playGame)
    }
    
}