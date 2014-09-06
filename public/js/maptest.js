window.onload = function(){
	//var map = L.map('map').setView([ 42.2924634,-83.716433], 13);

	/*L.tileLayer('http://{s}.tiles.mapbox.com/v3/bwang19.je7fg9i6/{z}/{x}/{y}.png', {
   		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);*/

	L.mapbox.accessToken = 'pk.eyJ1IjoiYndhbmcxOSIsImEiOiIyMXFLVW1VIn0.qrzAS2lCItHR6CaqxqY3pA';
	var map = L.mapbox.map('map', 'bwang19.je7fg9i6');

// omnivore will AJAX-request this file behind the scenes and parse it:
// note that there are considerations:
// - The file must either be on the same domain as the page that requests it,
//   or both the server it is requested from and the user's browser must
//   support CORS.

// Internally this uses the toGeoJSON library to decode the KML file
// into GeoJSON
	var runLayer = omnivore.kml('/js/history.kml')
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);
}