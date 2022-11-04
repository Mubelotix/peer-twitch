console.log("Background script loaded");

if (typeof browser === "undefined") {
    var browser = chrome;
}

let dummy_sw_url = browser.runtime.getURL("dummy-sw.js");

browser.declarativeNetRequest.updateSessionRules({
    addRules:[{
        "id": 1337,
        "priority": 1,
        "action": {
            "type": "redirect",
            "redirect": { "regexSubstitution": dummy_sw_url + "?url=\\0" }
        },
        "condition": { "regexFilter": "^https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-(.*)" }
    }],
    removeRuleIds: []
});

browser.declarativeNetRequest.onRuleMatchedDebug.addListener(
    (e) => {
        if (e.request.url.startsWith("https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-")) {
            browser.declarativeNetRequest.updateSessionRules({
                addRules:[],
                removeRuleIds: [1337]
            });
        }
    }
);
