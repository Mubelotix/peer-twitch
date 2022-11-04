console.log("Hello world");

let default_fetch = self.fetch;
self.fetch = function() {
    console.log("fetch", arguments);
    
    return default_fetch.apply(this, arguments)
        .then((res) => {
            console.log("fetch ended");
            return res;
        })
}

importScripts(location.href);
