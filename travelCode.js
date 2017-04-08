// SETUP VARIABLES 
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
var authKey = "&apikey=787ec693778269cc743d18b62c1bd55a";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
// var queryURLBase = "https://gateway.marvel.com:443/v1/public/characters?name=3-D%20Man&apikey=787ec693778269cc743d18b62c1bd55a";
var queryURLBase = "https://gateway.marvel.com:443/v1/public/characters" + authKey


// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// FUNCTIONSs
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(queryURL) {

    // The AJAX function uses the queryURL and GETS the JSON data associated with it.
    // The data then gets stored in the variable called: "NYTData"

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {"X-Mashape-Key": "wTjluRLWTZmshgzkfKtemOWxihc3p1pNnK7jsnmwuDknpCJ8Sc",
                    "Accept" : "application/json"}
    }).done(function(propublicaData) {

        // Logging the URL so we have access to it for troubleshooting
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log(propublicaData);
        console.log("------------------------------------");
        return
        // Loop through and provide the correct number of articles
        for (var i = 0; i < numArticles; i++) {

            // Add to the Article Counter (to make sure we 'Accept: application/json'show the right number)
            articleCounter++;

            // Create the HTML well (section) and add the article content for each
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "article-well-" + articleCounter);
            $("#well-section").append(wellSection);

            // Confirm that the specific JSON for the article isn't missing any details
            // If the article has a headline include the headline in the HTML
            if (NYTData.response.docs[i].headline !== "null") {
                $("#article-well-" + articleCounter)
                    .append(
                        "<h3 class='articleHeadline'><span class='label label-primary'>" +
                        articleCounter + "</span><strong> " +
                        NYTData.response.docs[i].headline.main + "</strong></h3>"
                    );

                // Log the first article's headline to console
                console.log(NYTData.response.docs[i].headline.main);
            }

            // If the article has a byline include the headline in the HTML
            if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
                $("#article-well-" + articleCounter)
                    .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

                // Log the first article's Author to console.
                console.log(NYTData.response.docs[i].byline.original);
            }

            // Then display the remaining fields in the HTML (Section Name, Date, URL)
            $("#articleWell-" + articleCounter)
                .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
            $("#articleWell-" + articleCounter)
                .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
            $("#articleWell-" + articleCounter)
                .append(
                    "<a href='" + NYTData.response.docs[i].web_url + "'>" +
                    NYTData.response.docs[i].web_url + "</a>"
                );

            // Log the remaining fields to console as well
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].web_url);
        }
    });

}

// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks).
    event.preventDefault();

    // Empties the region associated with the articles
    $("#well-section").empty();

    // Grabbing text the user typed into the search input
    // searchTerm = $("#search-term").val().trim();
    // searchTerm = "%22Delta%20Dental%22"
    // searchTerm = "delta%20alpha%20%2Bevanston"
    // searchTerm = "Delta%2BDental"
    searchTerm  = "?name=3-D%20Man";
    // searchTerm = searchTerm + "?state%5BNY%5D"
    // searchTerm = searchTerm + "?state%5Bid%5D=NY"
    // searchTerm = searchTerm + "?state%5Bid%5D=NY?ntee%5Bid%5D=7?c_code%5Bid%5D=3"
// searchTerm = "Delta+Dental"
    // searchTerm = searchTerm + "?state[NY]?c_code=3"
    // var queryURL = queryURLBase + searchTerm;
    // var queryURL = "https://rome2rio12.p.mashape.com/Search?currency=AUD&dKind=City&dName=Berne&dPos=46.94926%2C7.43883&oKind=City&oName=Z%C3%BCrich+HB&oPos=47.37819%2C8.54019";
    var queryURL = "http://free.rome2rio.com/api/1.4/json/Search?key=&oName=Bern&dName=Zurich&noRideshare"

    runQuery(queryURL);
    console.log("button clicked")
});

// This button clears the top articles section
$("#clear-all").on("click", function() {
    articleCounter = 0;
    $("#well-section").empty();
});
