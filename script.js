const questions = [
  {
    category: "General",
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    category: "General",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  },
  {
    category: "General",
    question: "Who wrote 'To kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee"
  },
  {
    category: "General",
    question: "What is the Largest Ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    category: "General",
    question: "What is the smallest country in the world?",
    options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
    answer: "Vatican City"
  },
  {
    category: "General",
    question: "What is the Largest Desert in the World?",
    options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"],
    answer: "Sahara Desert"
  },
  {
    category: "Sports",
    question: "How many players are on a soccer team?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    category: "Sports",
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Germany", "Brazil", "France", "Argentina"],
    answer: "France"
  },
  {
    category: "Sports",
    questions: "What is the national sport of Japan?",
    options: ["Baseball", "Sumo Wrestling", "Soccer", "Martial Arts"],
    answer: "Sumo Wrestling"
  },
  {
    category: "Sports",
    question: "Which sport is known as  the 'king of sports'?",
    options: ["Basketball", "Cricket", "Soccer", "Tennis"],
    answer: "Soccer"
  },
  {
    category: "Sports",
    question: "What is the most popular sport in the world?",
    options: ["Basketball", "Cricket", "Soccer", "Tennis"],
    answer: "Soccer"
  },
  {
    category: "Sports",
    question: "Which country has won the most Olympic gold medals?",
    options: ["USA", "China", "Russia", "Great Britain"],
    answer: "USA"
  },
  {
    category: "Sports",
    question: "What is the higest governing body of soccer?",
    options: ["FIFA", "UEFA", "CONCACAF", "AFC"],
    answer: "FIFA"
  },
  {
    category: "Coding",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "Hyperlinking Textual Machine Logic"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    category: "Coding",
    question: "What does CSS stand for?",
    options: [
        "cascading style sheets",
        "cascading style system",
        "cascading style script",
        "cascading style syntax"
    ],
    answer: "cascading style sheets"
  },
  {
    category: "Coding",
    question: "What is the purpose of JavaScript?",
    options: [
        "To style web pages",
        "To structure web pages",
        "To add interactivity to web pages",
        "To manage databases"
    ],
    answer: "To add interactivity to web pages"
  },
  {
    category: "Coding",
    question: "Which of the following is a JavaScript framework?",
    options: [
        "React",
        "Django",
        "Flask",
        "Ruby on Rails"
    ],
    answer: "React"
  },
  {
    category: "Coding",
    question: "What is the purpose of a database?",
    options: [
        "To store data",
        "To style web pages",
        "To structure web pages",
        "To add interactivity to web pages"
    ],
    answer: "To store data"
  },
  {
    category: "Coding",
    question: "What is the purpose of a server?",
    options: [
        "To store data",
        "To process requests and serve web pages",
        "To style web pages",
        "To add interactivity to web pages"
    ],
    answer: "To process requests and serve web pages"
  },
  {
    category: "Coding",
    question: "What is the purpose of an API?",
    options: [
        "To style web pages",
        "To structure web pages",
        "To allow diffrferent software applications to communicate with each other",
        "To manage databases"
    ],
    answer: "To allow different software applications to communicate with each other"
  },
  {
    category: "Coding",
    question: "What is the purpose of a version control system?",
    options: [
        "To manage databases",
        "To track changes in code and collaborate with others",
        "To style web pages",
        "To structure web pages"
    ],
    answer: "To track changes in code and collaborate with others"
  },
  {
    category: "Coding",
    question: "What is the purpose of a web framework?",
    options: [
        "To style web pages",
        "To structure web pages and provide tools for building web applications",
        "To manage databases",
        "To add interactivity to web pages"
    ],
    answer: "To structure web pages and provide tools for building web applications"
  },
  {
    category: "Coding",
    question: "What is the purpose of a content management system (CMS)?",
    options: [
        "To manage databases",
        "To allow users to create, manage, and publish digital content",
        "To style web pages",
        "To structure web pages"
    ],
    answer: "To allow users to create, manage, and publish digital content"
  }
];

let currentQuestionIndex = 0;
let filteredQuestions = [];
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const quizBox = document.getElementById('quiz-box');
const categorySelect = document.getElementById('category');
const scoreBox = document.getElementById('score-box');
const timeDisplay = document.getElementById('time');

function startQuiz() {
  const selectedCategory = categorySelect.value;
  filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  if (filteredQuestions.length === 0) {
    alert("No questions in this category.");
    return;
  }

  currentQuestionIndex = 0;
  score = 0;
  scoreBox.textContent = "";
  startBtn.style.display = "none";
  quizBox.style.display = "block";

  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = filteredQuestions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.addEventListener('click', () => selectAnswer(btn, currentQuestion.answer));
    optionsEl.appendChild(btn);
  });

  startTimer();
  updateProgressBar(); 
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timeDisplay.innerText = timeLeft;
  optionsEl.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  if (button.innerText === correctAnswer) {
    score++;
    button.style.backgroundColor = "#2ecc71";
  } else {
    button.style.backgroundColor = "#e74c3c";
  }
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < filteredQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const percent = ((currentQuestionIndex) / filteredQuestions.length) * 100;
  progressBar.style.width = `${percent}%`;
}


function showScore() {
  quizBox.style.display = "none";
  startBtn.style.display = "block";
  const selectedCategory = categorySelect.value;
  const scoreKey = `score-${selectedCategory}`;
  localStorage.setItem(scoreKey, score);
  scoreBox.textContent = `🎉 You scored ${score} out of ${filteredQuestions.length}`;
  updateProgressBar(); // Show full progress
  triggerConfetti();   // 🎉 Play confetti
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});


function triggerConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            velocity: Math.random() * 5 + 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
    }

    function update() {
        pieces.forEach(p => {
            p.y += p.velocity;
            if (p.y > canvas.height) p.y = -p.size;
        });
    }

    function animate() {
        draw();
        update();
        requestAnimationFrame(animate);
    }

    animate();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        canvas.width = 0;
        canvas.height = 0;
    }, 5000);
}

