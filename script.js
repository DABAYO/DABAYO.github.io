var buttonArray = ["Adventure Time", "Hey Arnold", "The Jetsons", "The Fairly OddParents", "Animaniacs"];


function renderButtons() {
  buttonArray.forEach(function (val) {
    var button = $("<button type='button'>");
    button.addClass("btn btn-primary cartButton");
    button.attr("data-cartoon", val);
    button.text(val);
    $("#cartoon-buttons").append(button);
  });
}
renderButtons();

$("#submit").on("click", function () {
  var userInput = $('#cartoonInput').val();
  buttonArray.push(userInput);
  $('#cartoonInput').val("");
  $("#cartoon-buttons").empty();
  renderButtons();
})

$("#cartoon-buttons").on("click", ".cartButton", function () {
  $("#cartoonGifs").empty();
  // var toon = $(this).attr("cartoon");
  var cartoonVal = $(this).attr("data-cartoon");
  var apiKey = "nQe1Lc5ctWi9AXcvYbLPKZbgMxPKwhF9";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cartoonVal + "&api_key=" + apiKey + "&limit=10";
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log(response);

      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var toonGif = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var toonImage = $("<img>");
          toonImage.attr("class", "gifImage");
          toonImage.attr("src", results[i].images.fixed_height.url);
          toonImage.attr("data-still", results[i].images.original_still.url);
          toonImage.attr("data-animate", results[i].images.fixed_height.url);
          toonImage.attr("data-state", "animate");
          
          toonGif.append(p);
          toonGif.append(toonImage);
          $("#cartoonGifs").prepend(toonGif);
        }
      }
    });
});



$("#cartoonGifs").on("click", ".gifImage", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});