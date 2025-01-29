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