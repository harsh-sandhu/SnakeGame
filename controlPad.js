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