// Name: population.js
// Description: A script to import data from education.csv and 
// render it as a barchart.
// Written by:  Tanya L. Crenshaw


        // From the html body, select the .info container to be the 
        // parent of the new container whose class is "chart".  
        // The class attribute allows the .css style information
        // to be applied to the container.
        var bar = d3.select("body")
           .select(".info")
           .select(".rightSide")
           .append("div")
           .attr("class", "bar") 

          
        // Import the data from the .csv file, applying the callback
        // function to the data in the file.
        d3.csv("education.csv", function(data) {

                // Convert strings to numbers.
                data.forEach(function(d) {
           d.percentage = +d.percentage;
            });
            
           // Each datum is a container of class type "bar".  
           // For each datum, append a container, bind the data to the container
           // using the .data() function and apply the style and text attributes.
           bar.selectAll("div")
         .data(data)
             .enter().append("div")
         .style("width", function(d) { return d.percentage * 10 + "px"; })
         .text(function(d) { return d.percentage; })

           // Apply a similar operation to the labels.
           var label = d3.select("body")
              .select(".info")
              .select(".leftSide")
              .append("div")
              .attr("class","label")
          
             label.selectAll("div")
                   .data(data)
                   .enter().append("div")
              .text(function(d) {return d.label})
                
});