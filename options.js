function fillVals() {
    var store = localStorage['popupcolor'];
    for (var i = 0; i < document.optform.popupcolor.length; ++i) {
        if (document.optform.popupcolor[i].value == store) {
            document.optform.popupcolor[i].selected = true;
            break;
        }
    }
    // Display language
    var lang = localStorage['language'];
    if (typeof lang == 'undefined') {
        lang = chrome.extension.getBackgroundPage().rcxMain.config.language
    }
    for (var i = 0; i < document.optform.languageOptions.length; ++i) {
        if (document.optform.languageOptions[i].value == lang) {
            document.optform.languageOptions[i].selected = true;
            break;
        }
    }
    if (localStorage['highlight'] == 'true')
        document.optform.highlighttext.checked = true;
    else
        document.optform.highlighttext.checked = false;

    if (localStorage['textboxhl'] == 'true')
        document.optform.textboxhl.checked = true;
    else
        document.optform.textboxhl.checked = false;

    if (localStorage['onlyreading'] == 'true')
        document.optform.onlyreading.checked = true;
    else
        document.optform.onlyreading.checked = false;

    if (localStorage['minihelp'] == 'true')
        document.optform.minihelp.checked = true;
    else
        document.optform.minihelp.checked = false;

    if (localStorage['disablekeys'] == 'true')
        document.optform.disablekeys.checked = true;
    else
        document.optform.disablekeys.checked = false;

    if (localStorage['kanjicomponents'] == 'true')
        document.optform.kanjicomponents.checked = true;
    else
        document.optform.kanjicomponents.checked = false;

    numList = chrome.extension.getBackgroundPage().rcxDict.prototype.numList;

    for (i = 0; i * 2 < numList.length; i++) {
        document.getElementById(numList[i * 2]).checked = localStorage[numList[i * 2]] == 'true' ? true : false;
    }

    store = localStorage['lineEnding'];
    for (var i = 0; i < document.optform.lineEnding.length; ++i) {
        if (document.optform.lineEnding[i].value == store) {
            document.optform.lineEnding[i].selected = true;
            break;
        }
    }

    store = localStorage['copySeparator'];
    for (var i = 0; i < document.optform.copySeparator.length; ++i) {
        if (document.optform.copySeparator[i].value == store) {
            document.optform.copySeparator[i].selected = true;
            break;
        }
    }

    document.optform.maxClipCopyEntries.value = parseInt(localStorage['maxClipCopyEntries']);

}

function getVals() {
    localStorage['language'] = document.optform.languageOptions.value;
    localStorage['popupcolor'] = document.optform.popupcolor.value;
    localStorage['highlight'] = document.optform.highlighttext.checked;
    localStorage['textboxhl'] = document.optform.textboxhl.checked;
    localStorage['onlyreading'] = document.optform.onlyreading.checked;
    localStorage['minihelp'] = document.optform.minihelp.checked;
    localStorage['disablekeys'] = document.optform.disablekeys.checked;
    localStorage['kanjicomponents'] = document.optform.kanjicomponents.checked;

    var kanjiinfoarray = new Array(chrome.extension.getBackgroundPage().rcxDict.prototype.numList.length / 2);
    numList = chrome.extension.getBackgroundPage().rcxDict.prototype.numList;
    for (i = 0; i * 2 < numList.length; i++) {
        localStorage[numList[i * 2]] = document.getElementById(numList[i * 2]).checked;
        kanjiinfoarray[i] = localStorage[numList[i * 2]];
    }

    localStorage['lineEnding'] = document.optform.lineEnding.value;
    localStorage['copySeparator'] = document.optform.copySeparator.value;
    localStorage['maxClipCopyEntries'] = document.optform.maxClipCopyEntries.value;

    chrome.extension.getBackgroundPage().rcxMain.config.language = localStorage["language"];
    chrome.extension.getBackgroundPage().rcxMain.config.css = localStorage["popupcolor"];
    chrome.extension.getBackgroundPage().rcxMain.config.highlight = localStorage["highlight"];
    chrome.extension.getBackgroundPage().rcxMain.config.textboxhl = localStorage["textboxhl"];
    chrome.extension.getBackgroundPage().rcxMain.config.onlyreading = localStorage["onlyreading"];
    chrome.extension.getBackgroundPage().rcxMain.config.minihelp = localStorage["minihelp"];
    chrome.extension.getBackgroundPage().rcxMain.config.disablekeys = localStorage["disablekeys"];
    chrome.extension.getBackgroundPage().rcxMain.config.kanjicomponents = localStorage["kanjicomponents"];
    chrome.extension.getBackgroundPage().rcxMain.config.kanjiinfo = kanjiinfoarray;
    chrome.extension.getBackgroundPage().rcxMain.config.lineEnding = localStorage["lineEnding"];
    chrome.extension.getBackgroundPage().rcxMain.config.copySeparator = localStorage["copySeparator"];
    chrome.extension.getBackgroundPage().rcxMain.config.maxClipCopyEntries = localStorage["maxClipCopyEntries"];

}
window.onload = fillVals;

/*function clicktab(tab) {
	selectedtab = document.getElementById(tab);
	// change format of all tabs to deselected
	// change format of selected tab to selected
	// hide all tab contents
	// show selected tab contents
}*/


document.querySelector('#submit').addEventListener('click', getVals);

// Alias kanjiInfoLabelList for convenience.
var kanjiInfoLabelList = chrome.extension.getBackgroundPage().rcxDict.prototype.kanjiInfoLabelList;

/**
 * Retrieves saved options from chrome.storage.sync and populates form
 * elements.
 * TODO: Perhaps using form map data, we can set these directly.
 */
function populateFormFromCloudStorage() {
    chrome.storage.sync.get(chrome.extension.getBackgroundPage().optionsList,
        function (cloudStorage) {

            // Simple values
            document.optform.disablekeys.checked = cloudStorage.disablekeys;
            document.optform.highlighttext.checked = cloudStorage.highlight;
            document.optform.kanjicomponents.checked = cloudStorage.kanjicomponents;
            document.optform.maxClipCopyEntries.value = cloudStorage.maxClipCopyEntries;
            document.optform.minihelp.checked = cloudStorage.minihelp;
            document.optform.onlyreading.checked = cloudStorage.onlyreading;
            document.optform.popupDelay.value = cloudStorage.popupDelay;
            document.optform.popupLocation.selectedIndex = cloudStorage.popupLocation;
            document.optform.textboxhl.checked = cloudStorage.textboxhl;
            document.optform.ttsEnabled.checked = cloudStorage.ttsEnabled;

            // Single select option groups
            for (var i = 0; i < document.optform.copySeparator.length; ++i) {
                if (document.optform.copySeparator[i].value === cloudStorage.copySeparator) {
                    document.optform.copySeparator[i].selected = true;
                    break;
                }
            }

            for (var i = 0; i < document.optform.lineEnding.length; ++i) {
                if (document.optform.lineEnding[i].value === cloudStorage.lineEnding) {
                    document.optform.lineEnding[i].selected = true;
                    break;
                }
            }

            for (var i = 0; i < document.optform.popupcolor.length; ++i) {
                if (document.optform.popupcolor[i].value == cloudStorage['popupcolor']) {
                    document.optform.popupcolor[i].selected = true;
                    break;
                }
            }

            for (var i = 0; i < document.optform.showOnKey.length; ++i) {
                if (document.optform.showOnKey[i].value === cloudStorage.showOnKey) {
                    document.optform.showOnKey[i].checked = true;
                    break;
                }
            }

            // Kanji Info check boxes created dynamically from whatever info is available.
            for (var i = 0; i < kanjiInfoLabelList.length; i += 2) {
                // Need to get every other element in the storage, so increment by 2.
                // We have abbreviation and full names. We use the abbrevations as form IDs.
                document.getElementById(kanjiInfoLabelList[i]).checked =
                    cloudStorage.kanjiInfo[kanjiInfoLabelList[i]];
            }

        });
}

/**
 * Collects all options from form fields and updates in memory
 * config object as well as saves to cloud storage.
 * String values from form are converted to number/boolean if appropriate.
 */
function saveOptions() {
    var copySeparator = document.optform.copySeparator.value;
    var disablekeys = document.optform.disablekeys.checked;
    var highlight = document.optform.highlighttext.checked;
    var kanjicomponents = document.optform.kanjicomponents.checked;
    var lineEnding = document.optform.lineEnding.value;
    var maxClipCopyEntries = parseInt(document.optform.maxClipCopyEntries.value);
    var minihelp = document.optform.minihelp.checked;
    var onlyreading = document.optform.onlyreading.checked;
    var popupcolor = document.optform.popupcolor.value;
    var popupDelay = getPopUpDelay();
    var popupLocation = document.optform.popupLocation.value;
    var showOnKey = document.optform.showOnKey.value;
    var textboxhl = document.optform.textboxhl.checked;
    var ttsEnabled = document.optform.ttsEnabled.checked;

    var kanjiInfoObject = {};
    // Setting Kanji values
    for (var i = 0; i < kanjiInfoLabelList.length; i += 2) {
        kanjiInfoObject[kanjiInfoLabelList[i]] = document.getElementById(kanjiInfoLabelList[i]).checked;
    }

    chrome.storage.sync.set({
        // Saving General options
        "disablekeys": disablekeys,
        "highlight": highlight,
        "kanjicomponents": kanjicomponents,
        "kanjiInfo": kanjiInfoObject,
        "minihelp": minihelp,
        "onlyreading": onlyreading,
        "popupcolor": popupcolor,
        "popupDelay": popupDelay,
        "popupLocation": popupLocation,
        "showOnKey": showOnKey,
        "textboxhl": textboxhl,
        "ttsEnabled": ttsEnabled,

        // Saving Copy to Clipboard settings
        "copySeparator": copySeparator,
        "lineEnding": lineEnding,
        "maxClipCopyEntries": maxClipCopyEntries
    });

    // TODO: Inline this above and call saveOptionsToCloudStorage.
    chrome.extension.getBackgroundPage().rcxMain.config.copySeparator = copySeparator;
    chrome.extension.getBackgroundPage().rcxMain.config.disablekeys = disablekeys;
    chrome.extension.getBackgroundPage().rcxMain.config.highlight = highlight;
    chrome.extension.getBackgroundPage().rcxMain.config.kanjicomponents = kanjicomponents;
    chrome.extension.getBackgroundPage().rcxMain.config.kanjiInfo = kanjiInfoObject;
    chrome.extension.getBackgroundPage().rcxMain.config.lineEnding = lineEnding;
    chrome.extension.getBackgroundPage().rcxMain.config.maxClipCopyEntries = maxClipCopyEntries;
    chrome.extension.getBackgroundPage().rcxMain.config.minihelp = minihelp;
    chrome.extension.getBackgroundPage().rcxMain.config.onlyreading = onlyreading;
    chrome.extension.getBackgroundPage().rcxMain.config.popupcolor = popupcolor;
    chrome.extension.getBackgroundPage().rcxMain.config.popupDelay = popupDelay;
    chrome.extension.getBackgroundPage().rcxMain.config.popupLocation = popupLocation;
    chrome.extension.getBackgroundPage().rcxMain.config.showOnKey = showOnKey;
    chrome.extension.getBackgroundPage().rcxMain.config.textboxhl = textboxhl;
    chrome.extension.getBackgroundPage().rcxMain.config.ttsEnabled = ttsEnabled;

}

function getPopUpDelay() {
    var popupDelay;
    try {
        popupDelay = parseInt(document.optform.popupDelay.value);
        if (!isFinite(popupDelay)) {
            throw Error('infinite');
        }
    } catch (err) {
        popupDelay = 150;
    }
    return popupDelay;
}

window.onload = populateFormFromCloudStorage;
document.querySelector('#submit').addEventListener('click', saveOptions);


/*function clicktab(tab) {
	selectedtab = document.getElementById(tab);
	// change format of all tabs to deselected
	// change format of selected tab to selected
	// hide all tab contents
	// show selected tab contents
}*/
