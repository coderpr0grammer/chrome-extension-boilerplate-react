console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.commands.onCommand.addListener(function (command) {
    if (command === "Ctrl+L") {
        console.log("Ctrl-L successful.");
    }
    else if (command === "Ctrl+Shift+F") {
        console.log("Ctrl+Shift+F successful.");
        chrome.action.openPopup()
    }
}); 