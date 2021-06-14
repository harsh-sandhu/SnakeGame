let food=randomFood();
let score="0";
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
        score=(parseInt(score)+1).toString();
        expandSnake(EXPANTION_RATE);
        food=randomFood();
        document.getElementById('score').innerHTML=score;
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