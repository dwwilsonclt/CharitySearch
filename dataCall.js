define(function(require) {
  var $ = require("jquery");
  var q = require("q");

  return {
    getFirebase: function () {
      var deferred = q.defer();
      $.ajax({
        url:"https://chanceofrain.firebaseio.com/"
      }).done(function(fireWeather) {
        deferred.resolve(fireWeather);
        // console.log("fireWeather = ", fireWeather);
      })// End of ajax call
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
        console.log("Weather Promise", deferred.promise);
        return deferred.promise;
    }// End of loadProfiles function
  }; // End of return
}); //