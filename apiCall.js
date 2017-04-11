define(function(require) {
  var $ = require("jquery");
  var q = require("q");
  var firebase = require("firebase");

  return {
    getWeather: function (zipCode) {
      var zip = zipCode
      var deferred = q.defer();
      var wapi = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&APPID=9e016cbd27cc632126025c6503ebf608"
      $.ajax({
        url:wapi
      }).done(function(weather) {
        deferred.resolve(weather);
        console.log("Weather = ", weather);
      })// End of ajax call
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
        console.log("Weather Promise", deferred.promise);
        return deferred.promise;
    }// End of loadProfiles function
  }; // End of return
}); //