let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
let randomnumber = 0;
let randomimageurl;
let randomimg = $('<img id="RandomImage">');
let savedimages;

$(".submit-btn").on("click",function(e){
    e.preventDefault();
    let $email = $("#Email");
    let $emailfield = $email.val().trim();
    console.log("button pressed");
    if(!emailReg.test($emailfield) || $emailfield === ""){
        console.log("invalid email");
        $email.addClass("email-error");
        $(".form-error-message").html("Please enter a valid email").show();
    } else{
        $(".form-error-message").hide();
        $email.removeClass("email-error");
        let foundemail = false;
        if(!savedimages){
            savedimages = [{
                emailaddress: $emailfield,
                images: [randomimageurl]
            }];
            console.log(`no previous data stored, first data stored is:${savedimages[0].emailaddress}  ${savedimages[0].images}`);
        } else {
            for(var i=0; i < savedimages.length;i++){
                if(savedimages[i].emailaddress === $emailfield){
                    savedimages[i].images.push(randomimageurl)
                    console.log(savedimages[i].images);
                    foundemail = true;
                } else {
  
                }
            }
            if(!foundemail){
                savedimages.push({emailaddress: $emailfield,images: [randomimageurl]});
                console.log(`${savedimages[savedimages.length-1].emailaddress}  ${savedimages[savedimages.length-1].images}`);
            }
        }
        randomimage();
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
    randomimage();
});

function randomimage(){
    randomnumber = parseInt(Math.random()*1085);
    getrandomimage(randomnumber)
}
function getrandomimage(imagenumber){
    fetch(`https://picsum.photos/id/${imagenumber}/200`)
    .then(response => response)
    .then(data=>{
        console.log(data.status);
        if(data.status === 404){
            randomimage();
        } else if(data.status === 200){
            console.log(data.url);
            randomimageurl = data.url;
            randomimg.attr('src', randomimageurl);
            randomimg.appendTo('#img-div');
        } else {
            console.log("error occured");
        }
        
    })
}

function loadImages(){
    randomimage();
}
