var char_data;
var host_data;
var hosts;

window.CCPEVE = {};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request === "eveigb_refresh") {
      chrome.storage.sync.get({'char_data': {}, 'host_data': []}, function(items) {
        char_data = items.char_data;
        host_data = items.host_data;
        hosts = host_data.split(/\n/);
      });
      sendResponse("eveigb_refreshed");
    }
  });

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var parser = document.createElement('a');
    parser.href = details.url
    var match = false;

    for(i in hosts) {
      if(parser.hostname === hosts[i]) {
        match = true;
        break;
      }
    }
    
    if(match) {
      for(name in char_data) {
        var value = char_data[name];
        details.requestHeaders.push({ name: name, value: value });
      }
    }
    
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
  );