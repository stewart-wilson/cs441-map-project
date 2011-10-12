// Name: map.js
// Description: A script to construct a google map centered
// at Salem, Oregon in the map_canvas container of an html
// document.
// Written by: Tanya L. Crenshaw

function initialize(){

        // Initialize map information
	var washZipCodes = ['98295', '98177'];
        // The center point of the map is Salem, OR
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
    // Create a marker at the initial center position of the map.
    // The "title" is what is displayed when the user hovers over 
    // the marker.  This is called a Google Maps "tooltip".
        var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Washington"
   });

        // Create the polygon that outlines zipcode 98177
        // Call the function constructZipCodeArray() to 
        // get the path of geopgraphical points.
        for(i = 0; i < 2; i++)
        {
			zipCodeAreas[i] = new google.maps.Polygon({
        paths: zips[washZipCodes[i]],
        strokeColor: "#a020f0",
        strokeOpacity: 0.35,
        strokeWeight: 2,
        fillColor: "#a020f0",
        fillOpacity: 0.35});
		
		                  
        google.maps.event.addListener(zipCodeAreas[i], 'click', function(event) {       
                        console.log("Hi " + washZipCodes[i] + ' ' + "!"); 
                        
        }); 
		
		zipCodeAreas[i].setMap(map);
		
		}
    
}