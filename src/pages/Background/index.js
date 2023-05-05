console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'seekTo') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const player = tabs[0].querySelector('video');
      if (player) {
        player.currentTime = message.time;
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, message: 'Video player not found' });
      }
    });
    return true;
  }
});
