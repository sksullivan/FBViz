window.onload = function(){
	L.mapbox.accessToken = 'pk.eyJ1IjoiYndhbmcxOSIsImEiOiIyMXFLVW1VIn0.qrzAS2lCItHR6CaqxqY3pA';
	var map = L.mapbox.map('map', 'bwang19.je7fg9i6');

	var runLayer = omnivore.kml('/assets/history.kml')
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);
}