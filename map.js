// Name: map.js
// Description: A script to construct a google map centered
// in Washington state in the map_canvas container of an html
// document.
// Written by: Stewart Wilson

function initialize(){

        // The center point of the map is Seattle, WA
    var latlng = new google.maps.LatLng(0.477436023333333E+02,-0.122369343004934E+03);

    var myOptions = {
      zoom: 5,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
        // Draw the map using the options defined above.
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
           
    var zipCodeAreas = new Array();
    

        // Create the polygon that outlines all the zipcodes in washington
        for(i = 0; i < 961; i++)
        {
        	var percent = .35;
        	//d3.csv("auto/" + washZipCodes[i] + "/percentage.csv", function(csv) {
		 	//percent = d3.nest()
			//.key(function(d) { return d.percent; })
			//.map(csv);
			//});	
			zipCodeAreas[i] = new google.maps.Polygon({
        paths: zips[i+1],
        strokeColor: "#a020f0",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#a020f0",
        fillOpacity: percent});
		
		
		//adds an event listener to each of the zip codes that have been created         
        google.maps.event.addListener(zipCodeAreas[i], 'click', function(event) {       
                        console.log("Hi!"); 
                        
        }); 
		//sets the zip code polygons to the map
		zipCodeAreas[i].setMap(map);
		
		}
    
}
