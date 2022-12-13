let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
let randomnumber = 0;
let randomimageurl;
let randomimg = $('<img id="RandomImage">');
let savedimages;

$(".submit-btn").on("click",function(e){
    e.preventDefault();
    let $email = $("#Email");
    let $emailfield = $email.val().trim();
    //tests if email is in a correct format or not
    if(!emailReg.test($emailfield) || $emailfield === ""){
        console.log("invalid email");
        $email.addClass("email-error");
        $(".form-error-message").html("Please enter a valid email").show();
    } else{
        $(".form-error-message").hide();
        $email.removeClass("email-error");
        let foundemail = false;
        var imagefound = false;
        //checks if saved images array has preivious data stored if not then it will add data to savedimages array
        if(!savedimages){
            savedimages = [{
                emailaddress: $emailfield,
                images: [randomimageurl]
            }];
            //console.log(`no previous data stored, first data stored is:${savedimages[0].emailaddress}  ${savedimages[0].images}`);
        } else {
            //runs a loop to check if the email exists in the array or not, if found then the image url is added to the image array 
            for(var i=0; i < savedimages.length;i++){
                if(savedimages[i].emailaddress === $emailfield){
                    
                    //console.log(savedimages[i].images);
                    for(var j=0; j<savedimages[i].images.length;j++){
                        if (savedimages[i].images[j] === randomimageurl){
                            imagefound = true;
                            $email.addClass("email-error");
                            $(".form-error-message").html("This image is already asigned to the email").show();
                        }
                    }
                    foundemail = true;
                    if (foundemail && !imagefound){
                        savedimages[i].images.push(randomimageurl)
                    }
                }
            }
            
            //if no email has been found then adds a new array element to savedimages array
            if(!foundemail){
                savedimages.push({emailaddress: $emailfield,images: [randomimageurl]});
                //console.log(`${savedimages[savedimages.length-1].emailaddress}  ${savedimages[savedimages.length-1].images}`);
            }
        }
        
        //displays all images in savedimages array
        displaySavedImages();
    }
});

//function runs a loop that creates a div containing a header of the email address and all images saved in saveimages array
function displaySavedImages(){
    let $displaydiv = $("#Display-Images");
    let htmltobedisplayed = "";
    $displaydiv.html("");
    for(var x = 0;x < savedimages.length ;x++){
        //console.log(savedimages[x].emailaddress)
        //console.log(`displaying saved images: ${savedimages[x].images}`);
        htmltobedisplayed +=`<div class="display-images"> <h2 class='saved-header'>${savedimages[x].emailaddress}</h2>`;
        for(var y = 0;y < savedimages[x].images.length ;y++){
            //console.log(`displaying saved image: ${savedimages[x].images[y]}`);
            htmltobedisplayed += `<img class="saved-images" src="${savedimages[x].images[y]}">`;
        }
        htmltobedisplayed += `</div>`;
    }
    $displaydiv.html(htmltobedisplayed);
}
//function gets a new random image on each button press 
$(".refresh-btn").on("click",function(){
    randomimage();
});

//function generates a random number then calls function to get the image with that id
function randomimage(){
    randomnumber = parseInt(Math.random()*1085);
    getrandomimage(randomnumber)
}
//function fetches image info as json and then checks for error messages
function getrandomimage(imagenumber){
    fetch(`https://picsum.photos/id/${imagenumber}/200`)
    .then(data=>{
        //console.log(data.status);
        //if the image is not found then generates a new random image as some images have been removed for example image with id 854
        if(data.status >= 400){
            //console.log("error occured: trying again")
            randomimage();
        } else if(data.status >= 200){
            //if successful then it stores the url for the random image and displays it to the page
            randomimageurl = data.url;
            randomimg.attr('src', randomimageurl);
            randomimg.appendTo('#img-div');
        } else {
            //console.log("error occured");
        }
        
    })
}

