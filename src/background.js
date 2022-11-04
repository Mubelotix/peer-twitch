console.log("Background script loaded");

if (typeof browser === "undefined") {
    var browser = chrome;
}

browser.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        let url = details.url;
        console.log("onBeforeSendHeaders", details.url);
    },
    {urls: ["https://*/v1/playlist/*.m3u8"]},
    ["requestHeaders"]
);
