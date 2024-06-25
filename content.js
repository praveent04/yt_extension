document.addEventListener('visibilitychange', function () {
    chrome.storage.sync.get(['enabled'], (result) => {
      if (!result.enabled) return;
      const video = document.querySelector('video');
      if (document.visibilityState === 'hidden' && video && !video.paused) {
        video.pause();
      } else if (document.visibilityState === 'visible' && video && video.paused) {
        video.play();
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
      // Update based on the new setting
      if (request.enabled) {
        const video = document.querySelector('video');
        if (document.visibilityState === 'visible' && video && video.paused) {
          video.play();
        }
      }
    }
  });
  