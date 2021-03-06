

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif);
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */

function fetchAndDisplayGif(event) {
    
    let riddle_check = false;
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    
    // get the user's input text from the DOM
    var searchQuery = $("#tag").val(); // TODO should be e.g. "dance"

    // configure a few parameters to attach to our request
    var params = { 
        api_key: "I7wKAZ1A0c7irVN1F7ebRNaxL1IxLrs7", 
        tag : "Jackson 5" + searchQuery, // TODO should be e.g. "jackson 5 dance"
    };

    //I created this function for the validation check...
    if ($("#riddle-answer").val() !== "5" && $("#error-form").attr("value")== ""){
        $("#riddle-error").text("No...just no.");
    } else { 
    $("#error-form").attr("value","hi");
    $("#error-form").hide();

// make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: {
            api_key: params.api_key,
            tag: params.tag,
        }, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);
            
        
            $("#gif").attr("src",response.data.image_url);
            setGifLoadedStatus(true);
        
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            
            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    $("#feedback").attr("hidden",false);
    $("#feedback").text("Loading...");

    }
}



/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}