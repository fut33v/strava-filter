function applyButtonHandler() {
    var filterCommute = document.getElementById("filter-commute").checked;
    var filterVirtual = document.getElementById("filter-virtual").checked;
    var filterRace = document.getElementById("filter-race").checked;
    var filterClub = document.getElementById("filter-club").checked;
    var filterChallenges = document.getElementById("filter-challenges").checked;

    var filterKmBicycle = document.getElementById("bicycle-filter-km").value;
    var filterKmRun = document.getElementById("run-filter-km").value;

    chrome.storage.sync.set({ "filterCommute": filterCommute }, function () {
        console.log('filterCommute is set to ' + filterCommute);
    });
    chrome.storage.sync.set({ "filterVirtual": filterVirtual }, function () {
        console.log('filterVirtual is set to ' + filterVirtual);
    });
    chrome.storage.sync.set({ "filterRace": filterRace }, function () {
        console.log('filterRace is set to ' + filterRace);
    });
    chrome.storage.sync.set({ "filterClub": filterClub }, function () {
        console.log('filterClub is set to ' + filterClub);
    });
    chrome.storage.sync.set({ "filterChallenges": filterChallenges }, function () {
        console.log('filterChallenges is set to ' + filterChallenges);
    });
    chrome.storage.sync.set({ "filterKmBicycle": filterKmBicycle }, function () {
        console.log('filterKmBicycle is set to ' + filterKmBicycle);
    });
    chrome.storage.sync.set({ "filterKmRun": filterKmRun }, function () {
        console.log('filterKmRun is set to ' + filterKmRun);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    var applyButton = document.getElementById("apply");
    applyButton.addEventListener('click', applyButtonHandler);

    var filterCommute = document.getElementById("filter-commute");
    var filterVirtual = document.getElementById("filter-virtual");
    var filterRace = document.getElementById("filter-race");
    var filterClub = document.getElementById("filter-club");
    var filterChallenges = document.getElementById("filter-challenges");

    var filterKmSliderBicycle = document.getElementById("bicycle-filter-km");
    var filterKmInputBicycle = document.getElementById("bicycle-filter-km-label");

    var filterKmSliderRun = document.getElementById("run-filter-km");
    var filterKmInputRun = document.getElementById("run-filter-km-label");

    filterKmSliderBicycle.oninput = function(){
        filterKmInputBicycle.value = this.value;
    };
    filterKmInputBicycle.oninput = function(){
        filterKmSliderBicycle.value = filterKmInputBicycle.value;
    };

    filterKmSliderRun.oninput = function(){
        filterKmInputRun.value = this.value;
    };
    filterKmInputRun.oninput = function(){
        filterKmSliderRun.value = filterKmInputRun.value;
    };

    chrome.storage.sync.get(['filterCommute'], function (result) {
        filterCommute.checked = result.filterCommute;
    });
    chrome.storage.sync.get(['filterVirtual'], function (result) {
        filterVirtual.checked = result.filterVirtual;
    });
    chrome.storage.sync.get(['filterRace'], function (result) {
        filterRace.checked = result.filterRace;
    });
    chrome.storage.sync.get(['filterClub'], function (result) {
        filterClub.checked = result.filterClub;
    });
    chrome.storage.sync.get(['filterChallenges'], function (result) {
        filterChallenges.checked = result.filterChallenges;
    });
    
    // TODO: carrying or bind ? these two invokes
    chrome.storage.sync.get(['filterKmBicycle'], function(result) {
        console.log(result);
        var filterKm = result.filterKmBicycle;
        var filterKmValue = 30;
        if (filterKm != undefined) {
            filterKmValue = filterKm;
        }
        filterKmSliderBicycle.value = filterKmValue;
        filterKmInputBicycle.value = filterKmValue;

    });
    chrome.storage.sync.get(['filterKmRun'], function(result) {
        console.log(result);
        var filterKm = result.filterKmRun;
        var filterKmValue = 30;
        if (filterKm != undefined) {
            filterKmValue = filterKm;
        }
        filterKmSliderRun.value = filterKmValue;
        filterKmInputRun.value = filterKmValue;

    });
});


var applyButton = document.getElementById("apply");

function applyButtonClick() {
    var filterClub = document.getElementById("filter-club").checked;
    var filterChallenges = document.getElementById("filter-challenges").checked;
    console.log(filterClub, filterChallenges);
}
