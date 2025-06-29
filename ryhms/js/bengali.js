 // Bubble animation
    const bubbleContainer = document.getElementById('bubble-container');
    for (let i = 0; i < 50; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.width = `${10 + Math.random() * 40}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.animationDuration = `${10 + Math.random() * 10}s`;
      bubbleContainer.appendChild(bubble);
    }

    // Page fade out transition
    function navigateTo(url) {
      document.body.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    }