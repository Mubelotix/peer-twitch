console.log("Background script loaded");

if (typeof browser === "undefined") {
    var browser = chrome;
}

let dummy_sw_url = browser.runtime.getURL("dummy-sw.js");

browser.declarativeNetRequest.updateSessionRules({
    addRules:[{
        "id": 1337,
        "priority": 1,
        "action": { "type": "redirect", "redirect": { "url": dummy_sw_url } },
        "condition": { "urlFilter": "https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-*.js" },
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
