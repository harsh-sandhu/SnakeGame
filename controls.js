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
    if(e.keyCode===32){
        playPause();
    }
    if(e.keyCode===77){
        muteFunction();
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