chrome.commands.onCommand.addListener((command) => {
    console.log("Command received in background: ", command);
    if (command === 'scroll-top' || command === 'scroll-bottom' || command === 'scroll-UpOneMsg') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: command });
      });
    }
  });