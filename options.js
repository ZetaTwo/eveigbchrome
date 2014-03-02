var host_field;
var char_field;

function init() {
  host_field = document.getElementById("form_host");
  char_field = document.getElementById("form_char");

  document.getElementById("loc_title").innerHTML = chrome.i18n.getMessage("options_title");
  document.getElementById("loc_host").innerHTML = chrome.i18n.getMessage("options_host") + ":";
  document.getElementById("loc_char").innerHTML = chrome.i18n.getMessage("options_char");
  document.getElementById("loc_save").innerHTML = chrome.i18n.getMessage("gen_save");
  
  chrome.storage.sync.get({"char_data": {}, 'host_data': ""}, function(items) {
    char_field.value = JSON.stringify(items.char_data);
    host_field.value = items.host_data;
  });
}

function save_data(evt) {
  evt.preventDefault();
  
  try {
    var char_data = JSON.parse(char_field.value);
  } catch(err) {
    return;
  }
  
  try {
    var host_data = host_field.value;
  } catch(err) {
    return;
  }
  
  chrome.storage.sync.set({'char_data': char_data, 'host_data': host_data}, function() {
  });
}

document.addEventListener('DOMContentLoaded', init);
document.querySelector('form#options_form').addEventListener('submit', save_data);