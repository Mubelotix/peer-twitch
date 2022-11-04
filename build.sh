#!/bin/sh

rm -rf pkg
wasm-pack build --target=no-modules || exit 1
cp manifest.json pkg/manifest.json
cp src/background.js pkg/background.js
cp src/dummy-sw.js pkg/dummy-sw.js

printf "
const runtime = chrome.runtime || browser.runtime;

async function run() {
  await wasm_bindgen(runtime.getURL('peer_twitch_bg.wasm'));
}

run();
" >> pkg/run_wasm.js
