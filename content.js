//alert("Hello from your Chrome extension!")

var FILTER_LESS_THAN_KM = undefined;
var FILTER_VIRTUAL_RIDES = false;
var FILTER_COMMUTE_RIDES = false;
var FILTER_RACE_RIDES = false;
var FILTER_CLUB_CARDS = false;
var FILTER_CHALLENGES_CARDS = false;


var RACE_STR = "Race";
var VIRTUAL_STR = "Virtual";
var COMMUTE_STR = "Commute";

var HIDDEN_ELEMENTS_SET = new Set();


chrome.storage.sync.get(['filterKm'], function (result) {
    var filterKm = result.filterKm;
    var filterKmValue = 30;
    if (filterKm != undefined) {
        filterKmValue = filterKm;
    }
    FILTER_LESS_THAN_KM = filterKmValue;
});
chrome.storage.sync.get(['filterClub'], function (result) {
    FILTER_CLUB_CARDS = result.filterClub;
});
chrome.storage.sync.get(['filterChallenges'], function (result) {
    FILTER_CHALLENGES_CARDS = result.filterChallenges;
});
chrome.storage.sync.get(['filterCommute'], function (result) {
    FILTER_COMMUTE_RIDES = result.filterCommute;
});
chrome.storage.sync.get(['filterVirtual'], function (result) {
    FILTER_VIRTUAL_RIDES = result.filterVirtual;
});
chrome.storage.sync.get(['filterRace'], function (result) {
    FILTER_RACE_RIDES = result.filterRace;
});




function hideElement(someElement) {
    var prevDisplay = someElement.style.display;
    HIDDEN_ELEMENTS_SET.add([someElement, prevDisplay]);
    someElement.style.display = "none";
}

function showAllElements() {
    for (let e of HIDDEN_ELEMENTS_SET) {
        e[0].style.display = e[1];
    }
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
        if (activityMapTags && activityMapTags.length != 0) {
            var activityTag = activityMapTags[0].innerText;
            activityTag = activityTag.replace(/(\r\n|\n|\r)/gm, "");

            if (activityTag == VIRTUAL_STR && FILTER_VIRTUAL_RIDES) {
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
    }
}

function doFilter() {




    if (FILTER_CLUB_CARDS) {
        filterClubCards();
    }
    if (FILTER_CHALLENGES_CARDS) {
        filterChallenges();
    }

    if (FILTER_LESS_THAN_KM != undefined) {
        filterActivities();
    }
}

window.onscroll = function () {
    doFilter();
    // filterActivities();
    // filterChallenges();
};

