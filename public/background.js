
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    chrome.storage.local.set(data);
    console.log('saved', data);
});