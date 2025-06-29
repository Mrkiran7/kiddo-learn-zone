
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const container = document.getElementById('letters-container');

    alphabet.forEach((letter, index) => {
      const div = document.createElement('div');
      div.className = 'letter ' + (vowels.includes(letter) ? 'vowel' : 'consonant');
      div.textContent = letter;
      div.style.animationDelay = (index * 0.05) + 's';

      div.addEventListener('click', () => {
        const type = vowels.includes(letter) ? 'Vowel' : 'Consonant';
        const utterance = new SpeechSynthesisUtterance(`${letter} is a ${type}`);
        speechSynthesis.speak(utterance);
      });

      container.appendChild(div);
    });

    function goHome() {
      window.location.href = 'grammar.html';
    }
