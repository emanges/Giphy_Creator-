$(document).ready(function (){

var animals = ["bear", "mouse","fish"];


function displayImg(){

    
     var animal = $(this).attr("data-name");
     
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
     animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing an AJAX request with the queryURL 
      $.ajax({
      url: queryURL,
      method: "GET"
                  
//       // After data comes back from the request
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
     
      var results =response.data;

      for (var i=0; i<results.length; i++){

        var animalDiv = $("<div>");

        var p =$("<p>").text("Rating: "+ results[i].rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.original_still.url);
        animalImage.attr("data-still", results[i].images.original_still.url);
        animalImage.attr("data-animate",results[i].images.original.url )
        animalImage.attr("data-state", "still");
        animalImage.attr("class","gif");
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $("#container").append(animalDiv);
        }
    
   });
}

    function renderButtons(){

    $("#buttons-view").empty();

    for (var i=0; i < animals.length; i++) {
            var b = $("<button>");
            b.addClass("animal-btn btn-info");
            b.attr("data-name", animals[i]);
            b.text(animals[i]);
            $("#buttons-view").append(b);
       }
    }

    function imageChange(){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if(state==="still"){
            $(this).attr("src", animate);
            $(this).attr("data-state","animate");
        }

        else if(state=== "animate"){
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    }

    $("#add-animal").on("click", function(event){
           event.preventDefault();
           var animal= $("#animal-input").val().trim();
           animals.push(animal);
           renderButtons();

   });


           $(document).on("click", ".animal-btn", displayImg );
           $(document).on("click", ".gif", imageChange);

           renderButtons();

});

