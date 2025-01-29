// Action map connecting JSON actions to functions
const actionMap = {
  scroll_UpOneMsg: () => scrollUpOneMessage(),
  scroll_DownOneMsg: () => scrollDownOneMessage(),
  scroll_Top: () => scrollToFirstMessage(),
  scroll_Bottom: () => scrollToLastMessage(),
  copy_Prompt: () => copyLatestDivText("prompt"),
  copy_Response: () => copyLatestDivText("response")
};

// Load shortcuts.json
async function loadShortcuts() {
  try {
    const response = await fetch(chrome.runtime.getURL('shortcuts.json'));
    return await response.json();
  } catch (error) {
    console.error('Error loading shortcuts:', error);
    return [];
  }
}

// Initialize shortcut listener
loadShortcuts().then(shortcuts => {
  document.addEventListener("keydown", (event) => {
    shortcuts.forEach(shortcut => {
      if (validateShortcut(event, shortcut)) {
        event.preventDefault();
        const action = actionMap[shortcut.action];
        if (action) {
          console.log(shortcut.description);
          action();
        }
      }
    });
  });
});

// Validate shortcut match
function validateShortcut(event, shortcut) {
  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    event.altKey === (shortcut.altKey || false) &&
    event.ctrlKey === (shortcut.ctrlKey || false) &&
    event.shiftKey === (shortcut.shiftKey || false) &&
    event.metaKey === (shortcut.metaKey || false)
  );
}




chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'scroll-top') {
      scrollToFirstMessage();
    } else if (request.action === 'scroll-bottom') {
      scrollToLastMessage();
    } else if (request.action === 'scroll-UpOneMsg') {
      scrollUpOneMessage();
    } else if (request.action === 'prompt-copy') {
      copyLatestDivText('prompt')
    } else if (request.action === 'response-copy') {
      copyLatestDivText('response')
    }
  });  
  
  // Scroll to Top
  function scrollToFirstMessage() {
    const messages = document.querySelectorAll('.fbb737a4');
    if (messages.length > 0) {
      messages[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      highlightMessage(messages[0]);
      setTimeout(() => {
        messages[0].style.boxShadow = '';
      }, 500);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Scroll to Bottom
  function scrollToLastMessage() {
  const messages = document.querySelectorAll('.ds-markdown.ds-markdown--block');
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    lastMessage.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
    highlightMessage(lastMessage);
    setTimeout(() => {
      lastMessage.style.boxShadow = '';
    }, 500);
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  // Scroll Up One Message
    function scrollUpOneMessage() {
        // Collect all response and prompt divs
        const promptDivs = document.querySelectorAll('.ds-markdown.ds-markdown--block');
        const responseDivs = document.querySelectorAll('.fbb737a4, .f9bf7997.d7dc56a8.c05b5566, .edb250b1, .f9bf7997.c05b5566');
        const allMessages = [...promptDivs, ...responseDivs];
    
        if (allMessages.length === 0) {
        console.log("No messages found on the page.");
        return;
        }
    
        allMessages.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    
        let currentTopIndex = allMessages.findIndex(div => div.getBoundingClientRect().top >= 0);
    
        if (currentTopIndex > 0) {
        const targetMessage = allMessages[currentTopIndex - 1];
        targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightMessage(targetMessage);
        console.log("Scrolling to previous message:", targetMessage);
        } else if (currentTopIndex === 0) {
        allMessages[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightMessage(allMessages[0]);
        console.log("Already at the first message, adjusting view.");
        } else {
        allMessages[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightMessage(allMessages[0]);
        console.log("No message fully visible, scrolling to the first one.");
        }
    }

    // Scroll Down One Message
    function scrollDownOneMessage() {
        const messageSelectors = ['.ds-markdown.ds-markdown--block', '.fbb737a4', '.edb250b1', '.f9bf7997', '.d7dc56a8.c05b5566'];
        const allMessages = Array.from(document.querySelectorAll(messageSelectors.join(',')));
        
        if (allMessages.length === 0) return; 
        
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        let nextMessage = null;
        
        for (let i = 0; i < allMessages.length; i++) {
            const rect = allMessages[i].getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            
            if (elementTop > scrollPosition + viewportHeight * 0.1) {
                nextMessage = allMessages[i];
                break;
            }
        }
        
        if (nextMessage) {
            nextMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Highlight the last message instead
            const lastMessage = allMessages[allMessages.length - 1];
            highlightMessage(lastMessage);
        }
    }  

  
    // Find Last Div 
    function copyLatestDivText(type) {
    var classname = '';
    const block_classname = '.cbcaa82c';

    if (type === 'prompt') {
        classname = '.fbb737a4';
    } else {
        classname = '[class="ds-markdown ds-markdown--block"]';
    }

    const allDivs = document.querySelectorAll(classname);
    
    if (allDivs.length === 0) {
        return;
    }

    let latestDiv = null;
    const viewportTop = window.scrollY;
    const viewportBottom = window.scrollY + window.innerHeight; 

    let lastVisibleDiv = null; 
    const blockingComponent = document.querySelector(block_classname);
    const blockingTop = blockingComponent.getBoundingClientRect().top;

    for (let i = allDivs.length - 1; i >= 0; i--) {
        const divTop = allDivs[i].getBoundingClientRect().top + window.scrollY;
        const divBottom = allDivs[i].getBoundingClientRect().bottom + window.scrollY;

        if (divBottom >= viewportTop && divTop <= viewportBottom) {
            if (divBottom <= blockingTop) {
                lastVisibleDiv = allDivs[i]; 
                break;
            }
        }
    }

    for (let i = allDivs.length - 1; i >= 0; i--) {
        const divTop = allDivs[i].getBoundingClientRect().top + window.scrollY;

        if (divTop <= viewportTop) {
            latestDiv = allDivs[i];
            break;
        }
    }

    if (lastVisibleDiv) {
        latestDiv = lastVisibleDiv;
    }

    const textToCopy = latestDiv.innerText.trim();
        
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
        }

    // copyDivText(latestDiv);
    highlightMessage(latestDiv);

    }
  
    // Helper Functions
    function highlightMessage(message) {
    message.style.boxShadow = '0 0 20px rgba(75,105,251,1)';
    setTimeout(() => {
        message.style.boxShadow = '';
    }, 2000);
    }

    function copyDivText(div) {
    const textToCopy = div.innerText.trim();

    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
    }
    }



