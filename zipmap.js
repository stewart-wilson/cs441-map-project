// Name: map.js
// Description: A script to construct a google map centered
// in Washington state in the map_canvas container of an html
// document.
// Written by: Stewart Wilson

function initialize(){
	var zipName = (self.location.search.split('?')[1]);	
	console.log(washZipCodes.length);
	
	document.getElementById("title").innerHTML = '<h3>'+washZipCodes[zipName-1]+'<h3>';
	zipLoc = zips[zipName];

	console.log(zipLoc[0]);
    // The center point of the map is the first point of the boundary array
    var latlng = new google.maps.LatLng(zipLoc[0].Na,zipLoc[0].Oa);

    var myOptions = {
    	zoom: 10,
    	center: latlng,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
        // Draw the map using the options defined above.
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
           
    var zipCodeAreas = new Array();
    

        // Create the polygon that outlines all the zipcodes in washington
        
    var percent = .35;
    //d3.csv("auto/" + washZipCodes[i] + "/percentage.csv", function(csv) {
	//percent = d3.nest()
	//.key(function(d) { return d.percent; })
	//.map(csv);
	//});	
	zipCodeAreas = new google.maps.Polygon({
        paths: zipLoc,
        strokeColor: "#a020f0",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#a020f0",
        fillOpacity: percent});

		//sets the zip code polygons to the map
	zipCodeAreas.setMap(map);

}


