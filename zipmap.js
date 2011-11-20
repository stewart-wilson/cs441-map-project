// Name: map.js
// Description: A script to construct a google map centered
// in Washington state in the map_canvas container of an html
// document.
// Written by: Stewart Wilson

function initialize(enroll,reload){
	var zipName = (self.location.search.split('?')[1]);	

	document.getElementById("title").innerHTML = '<h3>'+washZipCodes[zipName-1]+'<h3>';
	zipLoc = zips[zipName];
	var zip = washZipCodes[zipName-1];
    // The center point of the map is the first point of the boundary array
    console.log(zipLoc[0]);
    var latlng = new google.maps.LatLng(zipLoc[0].Pa,zipLoc[0].Qa);
	if(dataZips.indexOf(zip) == -1)
	{
		//if there is no csv file for the zip set the opacity to 0
		p = 0;
	}
	// if there is a data file for the zip use it to make the map
	else{
		//creates the bar graph
		drawCityData(zip,reload)
		d3.csv("auto/" +zip+ "/percentage.csv", function(data) {
					
		 			data.map(function(d) {
		 				var latlng = new google.maps.LatLng(zipLoc[0].Pa,zipLoc[0].Qa);

    					var myOptions = {
    						zoom: 9,
    						center: latlng,
    						mapTypeId: google.maps.MapTypeId.ROADMAP
    					};
           
        					// Draw the map using the options defined above.
    					var map = new google.maps.Map(document.getElementById("map_canvas"),
        					myOptions);
        					var percent = d.applyPercent;
		 				if(enroll)
		 					var percent = d.enrollPercent;
		 				var zipCodeAreas = new google.maps.Polygon({
        					paths: zipLoc,
        					strokeColor: "#a020f0",
        					strokeOpacity: 1,
        					strokeWeight: 2,
        					fillColor: "#a020f0",
        					fillOpacity: percent});
	
					//sets the zip code polygons to the map
					zipCodeAreas.setMap(map);
		 			});
		 			
		 	});
		}
		
		
}


// Description: A function to import data from auto/*.csv and
// render it as a barchart in an svg container.
// Written by:  Tanya L. Crenshaw.  Adapted from the "stacked bars" example
// Editted by Stewart Wilson.
// at http://mbostock.github.com/d3/ex/stack.html.
function drawCityData(cityname,reload)
{
	if(!reload)	{
        // Some prelimiaries on the dimensions of the svg container.
        var m = 20,    // margin between the bottom of the bars and the bottom of the container.
                w = 250,   // width of container
                h = 100,   // height of container
                s = 5;     // space between the bars in barchart.

           
        // Import the data from the .csv file, applying the callback
        // function to the data array, data, produced by the file.
        d3.csv("auto/" + cityname + "/percentage.csv", function(data) {

                // Hereth begin the body of the callback function for
                // the .csv() call.  It contains all that will be done
                // to the data in order to transform it and render
                // it on the browser.

           
            // In the existing #info container, append an svg
            // container in which the data will be rendered
            // as svg rectangles.  The width and height of
            // the svg container are specified here, rather
            // than some .css file.
            var vis = d3.select("#data_wrap")
                  .append("svg:svg")
                  .attr("width", w)
                  .attr("height", h);    


                // Apply the forEach() callback function to the
                // data array.  Convert each entry in the meanGpa
                // column to a number.
                //
                // Note that Array object callbacks are not
                // standard and may not work in IE8
                data.forEach(function(d) {
           d.gpa = +d.gpa;
           d.gpa = d3.round(d.gpa,3);
           d.years = +d.years;
           d.item = +d.item;
           
            });

                // DETERMINE SIZE OF BARS:          

                // Each bar in the bar graph is an svg rectangle.  To
                // draw a rectangle, one needs the x and y position of
                // the corner of the rectangle.  The size and location
                // of the bars is a function of the size of the svg
                // container as well as the data itself.  
               
                // In svg, a rectangle is defined by the x, y of the
                // top-left corner of the rectangle, and the "height"
                // of the rectangle as it grows down the screen.
               
                // Get the maximum value in the "meanGpa" column of
            // the .csv file that was loaded.
            maxy = d3.max(data, function(d) {
                return d.gpa;
            });
           
            // Round up the maximum value to the next integer
            maxy = Math.ceil(maxy);
               
                // The y-position of the rectangle's topside is a
                // function of the meanGpa value of the data and the
                // height of the svg container.
        var y = function(d) { return (h - (d.gpa * h / maxy)); };

            // The width of the rectangle is a function of
            // the number of data minus the desired space
            // between the bars.
            var rw = w / d3.max(data, function(d) { return d.item; }) - s;
                   
            // The x-position of the rectangle is a function of the
            // item number of the data, rectangle's width, and
            // the desired space between the bars.
        var x = function(d, i) { return ((d.item - 1) * (rw + s)); };

                // The height of the rectangle is a function of the
                // meanGpa value of the data and the height of the svg
                // container.
            var rh = function(d) { return (d.gpa * h / maxy); };
           
           // CREATE CONTAINERS FOR BARS:
           // For each datum, create a g container and a rectangle in that container
           // something like:
           //   <g class="bar" style="fill: #7592D3 ...;"      
           //      <rect width = ...            
       var bars = vis.selectAll("g.bar")
         .data(data)
         .enter().append("svg:g")
         .attr("class", "bar")
         .style("fill", "#a020f0")
         .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });
         
         
       // For each bar in the barchart:
       // - the width of the bar is a function of the number of data.
       // - the y-position of the bar is the top-left corner.
       bars.append("svg:rect")
         .attr("width", rw )
         .attr("x", 0)
         .attr("y", 10)
         .attr("height", function(d) {return (d.gpa * h / maxy);})
         
       // Done drawing bars.
       
       // Now for the labels.  
           var labels = vis.selectAll("text.label")
        .data(data)
      .enter().append("svg:text")
        .attr("class", "label")
        .attr("x", function(d) { return ((d.item - 1) * (rw + s)); } )
        .attr("y", function(d) { return (h - (d.gpa * h / maxy)); })
        .attr("dx", 55)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d3.round(d.gpa,3); } );      
        //create labels for the years
        var labels = vis.selectAll("text.year")
        .data(data)
      .enter().append("svg:text")
        .attr("class", "year")
        .attr("x", function(d) { return ((d.item - 1) * (rw + s)); } )
        .attr("y", function(d) { return h-20; })
        .attr("dx", 55)
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.years; } )
   });
  }

}




