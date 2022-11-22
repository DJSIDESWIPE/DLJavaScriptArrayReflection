let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
let num = 0;
let img = $('<img id="RandomImage">');
$(".submit-btn").on("click",function(e){
    e.preventDefault();
    console.log("button pressed");
    if(!emailReg.test()){}
});

function randomNumber(maxnum){
    maxnum++;
    num = Math.random()*maxnum;
    console.log(num);
    return parseInt(num);
}
function temp1(arr){
    
    img.attr('src', arr[randomNumber()].download_url);
    img.appendTo('#img-div');
}
function loadImage(){
    let images = [];
    const url = "https://picsum.photos/v2/list?page=1";
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        for(var i=0;i<data.length;i++){
            images.push(data[i]);
        }
        console.log(images.length);
        img.attr('src', images[randomNumber(30)].download_url);
        img.appendTo('#img-div');
    })
    .catch(err=>{
        console.log(JSON.stringify(err, null, 2));
    })
}
function getImages(){
    
}