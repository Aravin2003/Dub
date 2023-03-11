chrome.runtime.onInstalled.addListener(() =>{
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                  pageUrl: {hostContains: 'youtube'}
              })
          ],
          actions: [new chrome.declarativeContent.ShowPageAction() ]
      }])
  })
});
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});
chrome.runtime.onMessage.addListener((message) =>{
  var url = 'http://localhost:4000/download?'
  var queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&')
  url += queryString
  chrome.downloads.download({
      url: url,
      filename: "YoutubeDownloader/" + message.filename + '.' + message.format}, function(downloadID){
        chrome.downloads.onChanged.addListener(function(downloadDelta){
          if (downloadDelta.state && downloadDelta.state.current === "complete" && downloadDelta.id === downloadID){
            console.log("done");
          }
        });
          chrome.downloads.show(downloadID)
  })
})