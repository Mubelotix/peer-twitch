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
        "condition": { "urlFilter": "https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-75a2c99f45ecb5aa3225.js" },
    }],
    removeRuleIds: []
});

browser.declarativeNetRequest.onRuleMatchedDebug.addListener(
    (e) => {
        console.log("onRuleMatchedDebug" + JSON.stringify(e));
        if (e.request.url.startsWith("https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min")) {
            browser.declarativeNetRequest.updateSessionRules({
                addRules:[],
                removeRuleIds: [1337]
            });
        }
    }
);

browser.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        let url = details.url;
        console.log("onBeforeSendHeaders", details.url);
    },
    {urls: ["https://*/v1/playlist/*.m3u8"]},
    ["requestHeaders"]
);

browser.webRequest.onHeadersReceived.addListener(
    function(details) {
        let url = details.url;
        console.log("onBeforeSendHeaders", details.url);
    },
    {urls: ["https://*/v1/playlist/*.m3u8"]},
    ["responseHeaders"]
);