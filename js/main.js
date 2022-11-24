let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
let num = 0;
let randomimg = $('<img id="RandomImage">');
let randomimages = [];
let randomimageid;
let savedimages;

$(".submit-btn").on("click",function(e){
    e.preventDefault();
    let $email = $("#Email");
    let $emailfield = $email.val().trim();
    console.log("button pressed");
    if(!emailReg.test($emailfield) || $emailfield === ""){
        console.log("invalid email");
        $email.addClass("email-error");
    } else{
        $email.removeClass("email-error");
        let foundemail = false;
        if(!savedimages){
            savedimages = [{
                emailaddress: $emailfield,
                images: [randomimages[randomimageid].download_url]
            }];
            console.log(`no previous data stored, first data stored is:${savedimages[0].emailaddress}  ${savedimages[0].images}`);
        } else {
            for(var i=0; i < savedimages.length;i++){
                if(savedimages[i].emailaddress === $emailfield){
                    savedimages[i].images.push(randomimages[randomimageid].download_url)
                    console.log(savedimages[i].images);
                    foundemail = true;
                } else {
  
                }
            }
            if(!foundemail){
                savedimages.push({emailaddress: $emailfield,images: [randomimages[randomimageid].download_url]});
                console.log(`${savedimages[savedimages.length-1].emailaddress}  ${savedimages[savedimages.length-1].images}`);
            }
        }
        displayRandomImage(randomimages.length);
        displaySavedImages();
    }
});

function displaySavedImages(){
    let $displaydiv = $("#Display-Images");
    let htmltobedisplayed = "";
    $displaydiv.html("");
    for(var x = 0;x < savedimages.length ;x++){
        console.log(savedimages[x].emailaddress)
        htmltobedisplayed +=`<div class="display-images"> <h2 class='saved-header'>${savedimages[x].emailaddress}</h2>`;
        for(var y = 0;y < savedimages[x].images.length ;y++){
            console.log(`displaying saved image: ${savedimages[x].images[y]}`);
            htmltobedisplayed += `<img class="saved-images" src="${savedimages[x].images[y]}">`;
        }
        htmltobedisplayed += `</div>`;
    }
    $displaydiv.html(htmltobedisplayed);
}

$(".refresh-btn").on("click",function(){
    displayRandomImage(randomimages.length);
});

function displayRandomImage(randomnumberlimit){
    randomimageid = randomNumber(randomnumberlimit)
    console.log(`displaying image ID:${randomimageid}`);
    randomimg.attr('src', randomimages[randomimageid].download_url);
    randomimg.appendTo('#img-div');
}
function randomNumber(maxnum){
    maxnum++;
    num = Math.random()*maxnum;
    return parseInt(num);
}

function loadImages(){
    getImages(1);
    for(var i = 2; i<34;i++){
        getImages(i);
    }
    
}
function getImages(pagenum){
    let url = `https://picsum.photos/v2/list?page=${pagenum}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        for(var i=0;i<data.length;i++){
            randomimages.push(data[i]);
        }
        if(pagenum === 1){
            displayRandomImage(30);
        }
    })
    .catch(err=>{
        console.log("error occured");
    })
}