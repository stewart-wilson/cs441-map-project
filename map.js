// Name: map.js
// Description: A script to construct a google map centered
// in Washington state in the map_canvas container of an html
// document.
// Written by: Stewart Wilson

function initialize(){

        // The center point of the map is Seattle, WA
    var latlng = new google.maps.LatLng(0.477436023333333E+02,-0.122369343004934E+03);
	
    var myOptions = {
      zoom: 7,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
        // Draw the map using the options defined above.
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
           
    var zipCodeAreas = new Array();
    

        // Create the polygon that outlines all the zipcodes in washington
        for(i = 1; i < 962; i++)
        {
        	//remove zip codes that map out bodies of water and disrupt the rest of the map
        	if(i != 263 && i != 683 && i != 84 && i != 24 && i != 509 && i != 506 && i != 717 && i != 821){
        		var percent = .35;
        		p = []
        		d3.csv("auto/98001/percentage.csv", function(data) {
		 			data.map(function(d) {
		 				let percent = d.percent;
           				p.push(d.percent);
            		});
		 		});	
				console.log(percent)
				zipCodeAreas[i] = new google.maps.Polygon({
        	paths: zips[i],
        	strokeColor: "#a020f0",
        	strokeOpacity: 1,
        	strokeWeight: 2,
        	fillColor: "#a020f0",
        	fillOpacity: percent});

			let j = i;
			//adds an event listener to each of the zip codes that have been created         
	        google.maps.event.addListener(zipCodeAreas[j], 'click', function(event) {       
                        location.href = "zipmap.html?" + j;
   						console.log(location.href+":"+ j);
                        
        	}); 
			//sets the zip code polygons to the map
			zipCodeAreas[i].setMap(map);
			}
		}
		
    
}

function clickzip(zip) { 
   	location.href = "zipmap.html?" + zip;
   	console.log(location.href+":"+ zip);
}