function applyButtonHandler() {
    var filterCommute = document.getElementById("filter-commute").checked;
    var filterVirtual = document.getElementById("filter-virtual").checked;
    var filterRace = document.getElementById("filter-race").checked;
    var filterClub = document.getElementById("filter-club").checked;
    var filterChallenges = document.getElementById("filter-challenges").checked;

    var filterKm = document.getElementById("filter-km").value;

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
    chrome.storage.sync.set({ "filterKm": filterKm }, function () {
        console.log('filterKm is set to ' + filterKm);
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

    var filterKillometersSlider = document.getElementById("filter-km");
    var filterKillometersLabel = document.getElementById("filter-km-label");

    filterKillometersSlider.oninput = function(){
        filterKillometersLabel.innerHTML = this.value;
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
    chrome.storage.sync.get(['filterKm'], function (result) {
        console.log(result);
        var filterKm = result.filterKm;
        var filterKmValue = 30;
        if (filterKm != undefined) {
            filterKmValue = filterKm;
        }
        filterKillometersSlider.value = filterKmValue;
        filterKillometersLabel.innerHTML = filterKmValue;
    });




});


var applyButton = document.getElementById("apply");

function applyButtonClick() {

    var filterClub = document.getElementById("filter-club").checked;
    var filterChallenges = document.getElementById("filter-challenges").checked;

    console.log(filterClub, filterChallenges);

    alert("xyu");
}



//   chrome.storage.sync.get(['key'], function(result) {
//     console.log('Value currently is ' + result.key);
//   });

