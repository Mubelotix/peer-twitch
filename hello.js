console.log("Hello world");

let old_fetch = self.fetch;
self.fetch = function() {
    console.log("fetch", arguments);
    return old_fetch.apply(this, arguments)
    .then((res) => {
        console.log("fetch ended");
        return res;
    })
}

importScripts("https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-75a2c99f45ecb5aa3225.js");