
var topics = ["happy", "nature", "monkey", "music", "movies", "money"];

/*From the topics create buttons in HTML page.
have a form that allows users to append buttons to the intial array of buttons 
When clicking on the buttons display 10 related static images to the webpage that are gathered from the giphy API
After the images have been displayed the images have a onclick function or event that pauses and plays the images/gifs.
*/

function displaygiff() {

    $("#GIFS").empty();
    var giff = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ giff +"&api_key=rvbw8ECD5uJEVw0x3OMwPCIjSD77gAm1&limit=10";

    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(response){
        
        console.log(response);
       
        for(i=0;i<10;i++){
            var gifDiv = $("<div>");

            var rating = response.data[i].rating;
            
            var gif = response.data[i].images.fixed_height_still.url;
            
            var pOne = $("<p>").text("Rating: " + rating);
           
            var image = $("<img>").attr("src", gif);
            
            image.attr("class","giff");

            image.attr("data-state", "still");

            image.attr("data-animate", response.data[i].images.fixed_height.url);
           
            image.attr("data-still", response.data[i].images.fixed_height_still.url);

            image.css("border","4px solid black");

            gifDiv.css("float", "left");

            gifDiv.css("margin", "4px");

            gifDiv.append(image).append(pOne);
            
            $("#GIFS").append(gifDiv);

            console.log(image);
        }
    });
}

$(document).ready(function(){
    $(document).on('click', '.giff',function(){
        var state = $(this).attr("data-state");
        console.log(state);
        if(state ==="still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

function AddButton(){
    $("#Button-View").empty();
    $("#topic").css("border","2px solid black");
    $("#topic").css("height","200px");
    $("#topic").css("padding-top","30px");
    $("#topic").css("padding-left","30px");
    $("#topic").css("float","center");
    for(i=0; i<topics.length;i++){
        var bttn = $("<button>");
        bttn.addClass("btn-danger");
        bttn.addClass("btn");
        bttn.attr("data-name", topics[i]);
        bttn.text(topics[i]);
        bttn.css("margin", "5px");
        $("#Button-View").append(bttn);
    }
}

$(document).on("click",".btn-danger", displaygiff);

AddButton();

$("#add-button").on('click', function(event){
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    AddButton();
});

