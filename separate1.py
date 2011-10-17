# Name: separate.py
# Description: Parses the US zip code file into a .js file containing an array of the data.
# Written by:  Stewart Wilson

import csv
import re

# Read in Longitude and Latitude Information
reader = csv.reader(open('zt53_d00.txt'), delimiter = ',')

# Open the .js file that will be generated.  Note that if the
# file already exists, it will be over-written.
output = open('zips/allzips.js', 'w')


output.write("// DO NOT EDIT. Use separate1.py to generate. \n\n\n")

first = True
# Begin the array of geographical points
output.write("var zips = { \n")
print "outside of the for loop"
for row in reader:
    try:
        # if a new zip code has been reached create a new file
        matchObj = re.search('(\s([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\s)',row[0], re.M)
        if(matchObj):
            if(first):
                first = False
            else:
                output.write("],\n")
            title = matchObj.group().strip()
            output.write("'")
            output.write(title)
            output.write("':[")
            output.write("\n")
            


        else:
            
            lat = row[1]
            lon = row[0]
        
            # Construct the call to make a new geographical point using the
            # longitude and latitude read from the ZCTA information.        
            output.write("         new google.maps.LatLng(")
            output.write(lat)
            output.write(",")
            output.write(lon)
            output.write("),")

    except:
        pass
    
# Delete that last comma since the last new geographical point written
# out to the file was the last one in the array of points.
print "after for"
output.seek(-2, 2)
output.write("}")
