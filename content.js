document.addEventListener("keydown", function (event) {
  if (event.altKey && event.code === "KeyA") {
      event.preventDefault(); // Prevent default browser behavior
      scrollUpOneMessage();
  } else if (event.altKey && event.code === "KeyS") {
      event.preventDefault();
      scrollDownOneMessage();
  } else if (event.altKey && event.code === "KeyT") {
    event.preventDefault();
    scrollToFirstMessage();
  } else if (event.altKey && event.code === "KeyB") {
    event.preventDefault();
    scrollToLastMessage();
  } else if (event.altKey && event.code === "KeyR") {
    event.preventDefault();
    copyLatestDivText('response');
  } else if (event.altKey && event.code === "KeyC") {
    event.preventDefault();
    copyLatestDivText('prompt');
  } else if (event.altKey && event.code === "KeyF") {
    event.preventDefault();
    focusChatBox();
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
            allMessages[allMessages.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            highlightMessage(allMessages[allMessages.length - 1]);
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
            highlightMessage(nextMessage);
        } else {
            // Highlight the last message instead
            const lastMessage = allMessages[allMessages.length - 1];
            highlightMessage(lastMessage);
        }
    }
    
    
    // Focus chat box
    function focusChatBox() {
        const chatBox = document.getElementById('chat-input');
        
        if (chatBox) {
            chatBox.focus();
        } else {
            console.log('Chat box not found!');
        }
    }
    
    // Call the function to focus the chat box
    focusChatBox();
    

  
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



