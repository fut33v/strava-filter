//alert("Hello from your Chrome extension!")

var FILTER_LESS_THAN_KM = 30;
var FILTER_VIRTUAL_RIDES = true;
var FILTER_COMMUTE_RIDES = true;
var FILTER_RACE_RIDES = true;
var FILTER_CLUB_CARDS = true;
var FILTER_CHALLENGES_CARDS = true;



var RACE_STR = "Race";
var VIRTUAL_STR = "Virtual";
var COMMUTE_STR = "Commute";

function hideElement(someElement) {
    someElement.style.display = "none";
}

function filterChallenges() {
    var challenges = document.getElementsByClassName("challenge feed-entry");
    if (!challenges) {
        return;
    }
    for (let c of challenges) {
        hideElement(c);
    }
}

function filterClubCards() {
    var clubs = document.getElementsByClassName("club feed-entry");
    if (!clubs) {
        return;
    }
    for (let c of clubs) {
        hideElement(c);
    }
}

function filterActivities() {

    var activities = document.getElementsByClassName("activity");

    for (let a of activities) {

        var stat = a.getElementsByClassName("stat");

        if (!stat) {
            console.log("Cant find 'stat'");
            continue;
        }
        if (stat.length == 0) {
            console.log("'stat' array is empty");
            continue;
        }

        var activityMapTags = a.getElementsByClassName("activity-map-tag");
        if (activityMapTags && activityMapTags.length !=0){
            var activityTag = activityMapTags[0].innerText;
            activityTag = activityTag.replace(/(\r\n|\n|\r)/gm,"");

            if (activityTag == VIRTUAL_STR && FILTER_VIRTUAL_RIDES){
                hideElement(a);
            } 
            else 
            if (activityTag == COMMUTE_STR && FILTER_COMMUTE_RIDES) {
                hideElement(a);
            }
            else 
            if (activityTag == RACE_STR && FILTER_RACE_RIDES) {
                hideElement(a);
            }
        }

        var distanceDiv = stat[0];
        var distancePlusValue = distanceDiv.innerText.split("\n");

        if (distancePlusValue.length < 2) {
            console.log("'distancePlusValue' array length < 2");
            continue;
        }

        var distancePlusUnit = String(distancePlusValue[1]);

        var distanceUnitArray = distancePlusUnit.split(" ");
        if (distanceUnitArray.length != 2) {
            //console.log("'distanceUnitArray' array length != 2", distanceUnitArray, distancePlusUnit, distanceDiv, a);
            continue;
        }

        var unitStr = distanceUnitArray[1];
        var distanceStr = distanceUnitArray[0];

        var distance = parseFloat(distanceStr);


        if (unitStr == "m" || distance < FILTER_LESS_THAN_KM) {
            //console.log("need to filter", distance, unitStr, a);
            hideElement(a);
        }

        // console.log(typeof distancePlusUnit);
        // console.log(distancePlusUnit);
        // console.log(distanceUnitArray);

    }
}

function doFilter() {
    if (FILTER_CLUB_CARDS) {
        filterClubCards();
    }
    if (FILTER_CHALLENGES_CARDS){
        filterChallenges();
    }

    filterActivities();
}

window.onscroll = function () {
    doFilter();
    // filterActivities();
    // filterChallenges();
};