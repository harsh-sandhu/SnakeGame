//MAIN GAME FRAME
let NO_OF_FRAME_PER_SEC=4;
function increseSpeed(){
    let incre=Math.floor(snake.length/3);
    return NO_OF_FRAME_PER_SEC+incre;
}
let lastTimeStamp=0,gameOver=false;
const grid=document.getElementById('game-board');
function main(currentTime){
    document.getElementById('highscore').innerHTML=localStorage.getItem("harsh-sandhu-snake-game");
    if(gameOver){
        const over=document.createElement('div');
        const heading=document.createElement('h1');
        heading.innerHTML="GAME<br>OVER";
        const restart=document.createElement('button');
        restart.innerHTML="Restart"
        restart.classList.add("restartButton");
        restart.setAttribute("onclick","restart()");
        over.appendChild(heading);
        over.classList.add('gameOver');
        let prevChilds = Array.from(grid.childNodes);
        prevChilds.map(ele=>{
            ele.style.display='none';
        })
        
        let score=document.getElementById('score').innerHTML;
        if(parseInt(localStorage.getItem("harsh-sandhu-snake-game"))<parseInt(score)){
            localStorage.setItem("harsh-sandhu-snake-game", score);
            const newHighScore=document.createElement('h3');
            newHighScore.classList.add("newHightScore");
            newHighScore.innerHTML='New HighScore!!';
            over.appendChild(newHighScore);

        }
        over.appendChild(restart);
        grid.appendChild(over);
        document.getElementById('highscore').innerHTML=localStorage.getItem("harsh-sandhu-snake-game");
        return;
    }
    window.requestAnimationFrame(main);
    const previousRender=currentTime-lastTimeStamp;
    if(previousRender < 1000/increseSpeed()){
        return;
    }
    update();
    draw();
    lastTimeStamp=currentTime;
}
window.requestAnimationFrame(main);

function draw(){
    drawSnake(grid);
    drawFood(grid);
}
function update(){
    grid.innerHTML='';
    updateSnake();
    updateFood();
    checkGameOver()
}
function checkGameOver(){
    gameOver= smackWalls(snakeHead())||selfBite();
}
function smackWalls(position){
    if(position.x>25||position.y>25||position.x<1||position.y<1){
        return true;
    }
}