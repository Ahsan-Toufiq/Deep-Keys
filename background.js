// async function loadShortcuts() {
//   try {
//       const response = await fetch(chrome.runtime.getURL("shortcuts.json"));
//       const shortcuts = await response.json();

//       for (const [command, shortcut] of Object.entries(shortcuts)) {
//           chrome.commands.update({
//               name: command,
//               shortcut: shortcut
//           });
//       }
//   } catch (error) {
//       console.error("Failed to load shortcuts:", error);
//   }
// }


chrome.commands.onCommand.addListener((command) => {
    console.log("Command received in background: ", command);
    if (command === 'scroll-top' || command === 'scroll-bottom' || command === 'scroll-UpOneMsg' || command === 'scroll-DownOneMsg' || command === 'response-copy') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: command });
      });
    }
  });