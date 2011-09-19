// Name: map.js
// Description: A script to construct a google map centered
// at Salem, Oregon in the map_canvas container of an html
// document.
// Written by: Tanya L. Crenshaw

function initialize(){

        // Initialize map information

        // The center point of the map is Salem, OR
    var latlng = new google.maps.LatLng(0.477436023333333E+02,-0.122369343004934E+03);

    var myOptions = {
      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
        // Draw the map using the options defined above.
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
            
    // Create a marker at the initial center position of the map.
    // The "title" is what is displayed when the user hovers over 
    // the marker.  This is called a Google Maps "tooltip".
        var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Seattle, WA"
   });

        // Create the polygon that outlines zipcode 98177
        // Call the function constructZipCodeArray() to 
        // get the path of geopgraphical points.
        zipCodeArea = new google.maps.Polygon({
        paths: constructZipCodeArray(),
        strokeColor: "#a020f0",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#a020f0",
        fillOpacity: 0.35
    });

  // Draw the polygon on the map.
  zipCodeArea.setMap(map);
    
}