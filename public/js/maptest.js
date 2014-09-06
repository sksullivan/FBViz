window.onload = function(){
	var map = L.map('map').setView([ 42.2924634,-83.716433], 13);

	L.tileLayer('http://{s}.tiles.mapbox.com/v3/bwang19.je7fg9i6/{z}/{x}/{y}.png', {
   		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);

	var runLayer = omnivore.kml('/js/history.kml')
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());

        // After the 'ready' event fires, the GeoJSON contents are accessible
        // and you can iterate through layers to bind custom popups.
        runLayer.eachLayer(function(layer) {
            // See the `.bindPopup` documentation for full details. This
            // dataset has a property called `name`: your dataset might not,
            // so inspect it and customize to taste.
            layer.bindPopup(layer.feature.properties.name);
        });
    })
    .addTo(map);
}