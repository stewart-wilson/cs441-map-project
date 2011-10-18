applyAdmit <- function(state){

#initialize result vectors

totalApplicants = NULL; #number of students applied 
totalInquire = NULL; #number of students accepted 
applicantsToAccepted = NULL; #ratio of inquiry to apply

allzips = NULL; #initialize all zip codes to be null. 

#list all the .csv files
filenames <- list.files(pattern=".csv$")

#determine how many files were listed
n <- length(filenames);

admissionsData <- c();

for (i in filenames) {
# load the .csv file
u <- read.csv(i, header = TRUE, stringsAsFactors=FALSE);
u$dataset <- i;

# obtain the year
#years <- c(years, u$EntryYear[1]);

admissionsData <- rbind(admissionsData, u);
}

#Get Zip Codes for state provided. 
zips <- admissionsData$Zip[admissionsData$State == state, drop=TRUE];
zips <- as.numeric(as.character(zips)); 
allzips <- c(zips, allzips);


# remove duplicates from allzips. The variable allzips now contains the set of
# zipcodes that applied to the university of portland from the target city for
# all .csv files located in the current directory. 
allzips <- unique(allzips);

# for each zipcode, calculate the average GPA for each year.
for (j in allzips) {

#goes through all id's and gets the amount of inquries for each zip code and stores it in totalInquire.
studentIDs <- admissionsData$UP_ID[admissionsData$Zip == j, drop=TRUE];
studentIDs <- as.numeric(as.character(studentIDs));
totalInquire <- c(totalInquire, length(studentIDs));

#goes through all the id's and get all the inquries who also applied to the school and stores it in total Applicants. 
appliedStudents <- admissionsData$UP_ID[admissionsData$Zip == j & admissionsData$Applied=="Y", drop=TRUE];
appliedStudents <- as.numeric(as.character(appliedStudents));
appliedStudents <- appliedStudents[!is.na(appliedStudents)];
totalApplicants <- c(totalApplicants, length(appliedStudents));

#calculates the total applicant over total inquiry ratio. 
applicantsToAccepted <- c(applicantsToAccepted, (totalApplicants/totalInquire));

#creates a data frame to store the results in
result <- (data.frame(item = c(1:n), Applications = totalApplicants, Inquiries=totalInquire,percent=    applicantsToAccepted));

# construct the pathname in which to store the results
path <- paste("auto/", j, sep="");

# create a sub-directory in "auto" to store the results
dir.create(path);

filename <- paste(path, "/percentage.csv", sep="");
write.csv(result,filename);

length(applicantsToAccepted) <- 0;
length(totalApplicants) <- 0;
length(totalInquire) <- 0;
length(result) <- 0;

}
return(result);
}


















