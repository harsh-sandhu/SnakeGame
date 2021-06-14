let food=randomFood();
let score="0";
const EXPANTION_RATE=1;
let foodSound=new sound('./sounds/food.mp3');
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
        if(!mute){
            foodSound.play();
        }
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
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}