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