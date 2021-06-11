//SNAKE FUNCTIONS
let snake=[{x:13,y:13}]
let newBlock=0;
function drawSnake(grid){
    snake.forEach(block=>{
        const snakeSegment=document.createElement('div');
        snakeSegment.style.gridColumnStart=block.x;
        snakeSegment.style.gridRowStart=block.y;
        snakeSegment.classList.add('snake');
        grid.appendChild(snakeSegment);
    })
}
function updateSnake(){
    for(let i=0;i<newBlock;i++){
        snake.push({...snake[snake.length-1]});
    }
    newBlock=0
    const direction=getDirection();
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]};
    }
    snake[0].x+=direction.x;
    snake[0].y+=direction.y;
}

function expandSnake(amount){
    newBlock+=amount;
}

function onSnake(food,check=false){
    return snake.some((block,index)=>{
        if(check&&index===0){
            return false;
        }
        return block.x===food.x&&block.y===food.y;
    })
}
function snakeHead(){
    return snake[0];
}

function selfBite(){
    return onSnake(snake[0],true);
}
//FOOD FUNCTION
let food=randomFood();
const EXPANTION_RATE=1;
function drawFood(grid){
    const foodBlock=document.createElement('div');
    foodBlock.style.gridColumnStart=food.x;
    foodBlock.style.gridRowStart=food.y;
    foodBlock.classList.add('food');
    grid.appendChild(foodBlock);
}
function updateFood(){
    if(onSnake(food)){
        expandSnake(EXPANTION_RATE);
        food=randomFood();
    }
}
function randomFood(){
    let newFood;
    while(newFood==null||onSnake(newFood)){
        newFood=randomPos();
    }
    return newFood;
}
function randomPos(){
    return(
        {
            x : Math.floor(Math.random()*25)+1,
            y : Math.floor(Math.random()*25)+1
        }
    )
}
//MAIN GAME FRAME
let NO_OF_FRAME_PER_SEC=4;
function increseSpeed(){
    let incre=Math.floor(snake.length/3);
    return NO_OF_FRAME_PER_SEC+incre;
}
let lastTimeStamp=0,gameOver=false;
const grid=document.getElementById('game-board');
function main(currentTime){
    if(gameOver){
        const over=document.createElement('div');
        const heading=document.createElement('h1');
        heading.innerHTML="GAME<br>OVER";
        const restart=document.createElement('button');
        restart.innerHTML="Restart"
        restart.classList.add("restartButton");
        restart.setAttribute("onclick","restart()");
        over.appendChild(heading);
        over.appendChild(restart);
        over.classList.add('gameOver');
        grid.appendChild(over);
        return;
    }
    window.requestAnimationFrame(main);
    const previousRender=currentTime-lastTimeStamp;
    if(previousRender < 1000/increseSpeed()){
        return;
    }
    console.log('render');
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
//CONTROLS
let direction={x:0,y:0};
window.addEventListener('keydown', e=>{
    if(e.key=='ArrowUp'&& direction.y==0){
        direction= {x:0,y:-1};
    }
    if(e.key=='ArrowDown'&& direction.y==0){
        direction= {x:0,y:1};
    }
    if(e.key=='ArrowLeft'&& direction.x==0){
        direction= {x:-1,y:0};
    }
    if(e.key=='ArrowRight'&& direction.x==0){
        direction= {x:1,y:0};
    }
})
function getDirection(){
    return direction;
}
const up=document.getElementById("up")
up.addEventListener('click',()=>{
    if(direction.y==0){
        direction= {x:0,y:-1};
    }
})
const down=document.getElementById("down")
down.addEventListener('click',()=>{
    if(direction.y==0){
        direction= {x:0,y:1};
    }
})
const left=document.getElementById("left")
left.addEventListener('click',()=>{
    if(direction.x==0){
        direction= {x:-1,y:0};
    }
})
const right=document.getElementById("right")
right.addEventListener('click',()=>{
    if(direction.x==0){
        direction= {x:1,y:0};
    }
})
//CONTROL PAD
function getScreenControls(){
    const ctrls=document.getElementById("controls");
    ctrls.style.display="block"
    const button=document.getElementById("ctrlbutton");
    button.style.display="none";
    const rbutton=document.getElementById("rctrlbutton");
    rbutton.style.display="block";
}
function removeScreenControls(){
    const ctrls=document.getElementById("controls");
    ctrls.style.display="none"
    const button=document.getElementById("ctrlbutton");
    button.style.display="block";
    const rbutton=document.getElementById("rctrlbutton");
    rbutton.style.display="none";
}
function restart(){
    location.reload();
}