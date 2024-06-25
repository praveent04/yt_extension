document.addEventListener('DOMContentLoaded', () => {
    const enableToggle = document.getElementById('enableToggle');
  
    // Load the saved setting from storage
    chrome.storage.sync.get(['enabled'], (result) => {
      enableToggle.checked = result.enabled;
    });
  
    // Save the setting when the checkbox is changed
    enableToggle.addEventListener('change', () => {
      chrome.storage.sync.set({ enabled: enableToggle.checked });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle', enabled: enableToggle.checked });
      });
    });
  });
  