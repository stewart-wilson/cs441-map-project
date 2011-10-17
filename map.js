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
    

        // Create the polygon that outlines zipcode 98177
        // Call the function constructZipCodeArray() to 
        // get the path of geopgraphical points.
        for(i = 0; i < 961; i++)
        {
        zipdata(washZipCodes[i]);	
			zipCodeAreas[i] = new google.maps.Polygon({
        paths: zips[i+1],
        strokeColor: "#a020f0",
        strokeOpacity: 0.35,
        strokeWeight: 2,
        fillColor: "#a020f0",
        fillOpacity: 0.35});
		
		j = i;
		//adds an event listener to each of the zip codes that have been created         
        google.maps.event.addListener(zipCodeAreas[i], 'click', function(event) {       
                        console.log("Hi " + washZipCodes[j] + ' ' + "!"); 
                        
        }); 
		//sets the zip code polygons to the map
		zipCodeAreas[i].setMap(map);
		
		}
    
}

function zipdata(zipcode){
	var percent;
	d3.csv("auto/" + zipcode + "/percentage.csv", function(data) {
		data.percent = d3.round(data.percent,3);
		percent = data.percent;
		
	});
}
