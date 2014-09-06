window.onload = function(){
	var map = L.map('map').setView([ 42.2924634,-83.716433], 13);

	L.tileLayer('http://{s}.tiles.mapbox.com/v3/bwang19.je7fg9i6/{z}/{x}/{y}.png', {
   		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);

	omnivore.kml('../public/js/history.kml').addTo(map);
}