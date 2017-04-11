// SETUP VARIABLES 
// ==========================================================

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
var queryURLBase = "https://rome2rio12.p.mashape.com/Search?currency=USD";
var queryOrigin = "&oKind=City&oName="
var queryDestination = "&dKind=City&dName="
var routeCounter = 0;
var resultsRoutes = [];
var resultsStops = [];
var routeCounter = 0;
var list=[];  //holds long and lat. 

function runQuery(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-Mashape-Key": "wTjluRLWTZmshgzkfKtemOWxihc3p1pNnK7jsnmwuDknpCJ8Sc",
            "Accept": "application/json"
        }
    }).done(function(travelData) {


        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");
        console.log(travelData);
        console.log("------------------------------------");
        resultsRoutes = travelData.routes;
        console.log("resultsStops " + resultsStops)

        for (var i = 0; i < resultsRoutes.length; i++) {
            routeCounter++;
            resultsStops = resultsRoutes[i].stops;
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "route-well-" + routeCounter);
            $("#well-section").append(wellSection);
            $("#route-well-" + routeCounter).append("<h3 class='articleHeadline'><span class='label label-primary'>" +
                routeCounter + "</span><strong> " +
                resultsRoutes[i].name + "</strong></h3>"
            );
            console.log(resultsRoutes[i].name);
            var distanceMiles = Math.round(resultsRoutes[i].distance * .62137119)
            $("#route-well-" + routeCounter).append("<h5> Distance this route: " + distanceMiles + " miles </h5>");
            var routePrice = resultsRoutes[i].indicativePrice.price;
            if (routePrice === undefined) {
                routePrice = "NOT AVAILABLE"
            } else {
                if (resultsRoutes[i].indicativePrice.currency = "USD") {
                    routePrice = "$ " + routePrice
                } else {
                    routePrice = routePrice + " " + resultsRoutes[i].indicativePrice.currency
                }
            }
            $("#route-well-" + routeCounter).append("<h5> Estimated price: " + routePrice + "</h5>");
            var duration = resultsRoutes[i].duration
            var durationHHMM = Math.round(duration / 60);
            durationHHMM = durationHHMM + ":" + ("0" + duration % 60).slice(-2)
            $("#route-well-" + routeCounter).append("<h5>Duration: " + durationHHMM + "</h5>");
           
            var tableDef = "<h4><strong><i>Stops & Route Information</i></strong></h4>" +
                '<table class="table">' +
                '<thead>' +
                '<tr>' +
                '<th>Type</th>' +
                '<th>Place</th>' +
                '<th>LL</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'

            for (var j = 0; j < resultsStops.length; j++) {
                tableDef = tableDef + (`   
                      <tr>
                        <td>${resultsStops[j].kind}</td>
                        <td>${resultsStops[j].name}</td>
                        <td>${resultsStops[j].pos}</td>
                      </tr>
                `)
            }
            tableDef = tableDef + (`
                </tbody>
                </table>
            `);
            $("#route-well-" + routeCounter).append(tableDef);

            //**Google Map Code **// 
            //Inserting long and lat in list[]

            if(list.length > 0 )
                list= []; 

            for (var j = 0; j < resultsStops.length; j++) {
                    var SplitString= resultsStops[j].pos.split(",");   
                    list.push(SplitString);             
                    console.log(SplitString); 
            }

            /*For debuggung
            console.log(":::::list::::"); 
            for(var i=0; i<list.length; i++)
                console.log(list[i][0] + list[i][1]); */ 

               initMap(); 
        }//end first for loop 

            
    });
}

 function initMap() {

        var uluru = {lat: 39.11417, lng: -94.62746};

        var uluru2 = {lat: 32.783, lng: -96.806};

        var number= "32.783"; 

        var number1= "-96.806"; 

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
      
        });

        for(var i=0; i< list.length; i++){

          var marker = new google.maps.Marker({
          position: {lat: Number(list[i][0]), lng: Number(list[i][1])},
          map: map
        })
      
      }
    }
    
$("#run-search").on("click", function(event) {
    event.preventDefault();
    $("#well-section").empty();
    routeCounter = 0;
    searchTermOrigin = $("#search-term-origin").val().trim();
    searchTermDstination = $("#search-term-destination").val().trim();
    var queryURL = queryURLBase + queryOrigin + searchTermOrigin + queryDestination + searchTermDstination;
    runQuery(queryURL);
});
$("#clear-all").on("click", function() {
    routeCounter = 0;
    $("#well-section").empty();
});
