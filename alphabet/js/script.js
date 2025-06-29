 // Bubble Background Animation
  const canvas = document.getElementById("backgroundCanvas");
  const ctx = canvas.getContext("2d");

  let bubbles = [];
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Bubble {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.radius = Math.random() * 8 + 2;
      this.speed = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.y -= this.speed;
      if (this.y < -this.radius) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) {
    bubbles.push(new Bubble());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach(bubble => {
      bubble.update();
      bubble.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Quiz Logic
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const quizData = [];
  const usedLetters = new Set();

  while (quizData.length < 25) {
    const index = Math.floor(Math.random() * (alphabet.length - 1));
    const current = alphabet[index];
    const next = alphabet[index + 1];

    if (!usedLetters.has(current) && next) {
      usedLetters.add(current);
      const options = shuffle([next, alphabet[(index + 2) % 26], alphabet[(index + 3) % 26]]);
      quizData.push({
        question: `What comes after ${current}?`,
        options,
        answer: next
      });
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  let currentQuestion = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const progressEl = document.getElementById("progress");

  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");

  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";

    current.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => checkAnswer(option);
      optionsEl.appendChild(button);
    });
  }

  function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
      resultEl.textContent = "✅ Correct!";
      resultEl.style.color = "green";
      score++;
      correctSound.play();
    } else {
      resultEl.textContent = "❌ Oops!";
      resultEl.style.color = "red";
      wrongSound.play();
    }

    scoreEl.textContent = `Score: ${score}`;

    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showFinalScore();
      }
    }, 1500);
  }

  function showFinalScore() {
    questionEl.textContent = "🎉 Quiz Complete!";
    optionsEl.innerHTML = "";
    progressEl.textContent = "";
    resultEl.textContent = `Your final score is ${score} out of ${quizData.length}!`;
    resultEl.style.color = "#333";
  }

  loadQuestion();