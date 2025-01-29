chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'scroll-top') {
      scrollToFirstMessage();
    } else if (request.action === 'scroll-bottom') {
      scrollToLastMessage();
    } else if (request.action === 'scroll-UpOneMsg') {
        scrollUpOneMessage();
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
    console.log("abc");
    const promptDivs = document.querySelectorAll('.ds-markdown.ds-markdown--block');
    const responseDivs = document.querySelectorAll('.fbb737a4');
    const allMessages = [...promptDivs, ...responseDivs];
  
    // Sort messages by their top position in the viewport
    allMessages.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  
    // Find the first message that is partially or fully above the viewport top line
    const currentTopIndex = allMessages.findIndex(div => div.getBoundingClientRect().top >= 0);
    if (currentTopIndex > 0) {
      console.log("1");
      // There is at least one message above the current top message
      const targetMessage = allMessages[currentTopIndex - 1];
      targetMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightMessage(targetMessage);
    } else if (currentTopIndex === 0) {
        console.log("2");
        // The very first message is already at the top, scroll to it if not fully visible
      allMessages[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightMessage(allMessages[0]);
    } else {
        console.log("3");
        // No messages are visible or all are below the viewport, scroll to the very first
      allMessages[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      highlightMessage(allMessages[0]);
    }
  }
  
  
  
  
  
  
  
  function highlightMessage(message) {
    message.style.boxShadow = '0 0 10px rgba(75,105,251,1)';
    setTimeout(() => {
      message.style.boxShadow = '';
    }, 500);
  }
  


