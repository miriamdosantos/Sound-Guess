document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');
    let currentQuestionIndex = 0;
    let score =0;
    let timeCountdown = document.getElementById('time');
    

    startQuizButton.addEventListener('click', function() {
        startQuizButton.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        feedbackContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        instructionContainer.classList.add('hidden');
        showQuestion(musicQuiz[currentQuestionIndex]);
        updateScoreDisplay(0);
        timeCountdown.classList.remove('hidden');
        startCountdown(6); // Inicia uma contagem regressiva de 10 segundos
        
    });

    let nextButton = document.getElementById('next-btn');
    nextButton.addEventListener('click', function() {
        currentQuestionIndex++;
        if (currentQuestionIndex < musicQuiz.length) {
            showQuestion(musicQuiz[currentQuestionIndex]);
        } else {
            alert('Quiz completed!');
        }
    });
});

const musicQuiz = [
    {
        question: "Who is often referred to as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
        correctAnswer: "Michael Jackson"
    },
    {
        question: "Which band performed the hit song 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Queen", "Led Zeppelin", "The Rolling Stones"],
        correctAnswer: "Queen"
    },
    {
        question: "Which artist released the album 'Thriller' in 1982?",
        options: ["Madonna", "Elton John", "Michael Jackson", "David Bowie"],
        correctAnswer: "Michael Jackson"
    },
    {
        question: "What is the name of Beyoncé's fanbase?",
        options: ["BeyHive", "Queen Bees", "BeyArmy", "BeyFanatics"],
        correctAnswer: "BeyHive"
    },
    {
        question: "Who is the lead vocalist of the band Coldplay?",
        options: ["Chris Martin", "Thom Yorke", "Eddie Vedder", "Brandon Flowers"],
        correctAnswer: "Chris Martin"
    },
    {question: "Who is the lead vocalist and founder of the Foo Fighters?",
        options: ["Dave Grohl", "Kurt Cobain", "Chris Cornell", "Eddie Vedder"],
        correctAnswer: "Dave Grohl"
    },
    {
        question: "Who is known as the 'Queen of Pop'?",
        options: ["Madonna", "Beyoncé", "Taylor Swift", "Adele"],
        correctAnswer: "Madonna"
    },
    {
        question: "Which iconic guitarist was known for playing with his teeth and behind his head?",
        options: ["Jimi Hendrix", "Eric Clapton", "Jimmy Page", "Stevie Ray Vaughan"],
        correctAnswer: "Jimi Hendrix"
    },
    {
        question: "Which British band released the album 'The Dark Side of the Moon'?",
        options: ["Pink Floyd", "The Beatles", "Led Zeppelin", "Queen"],
        correctAnswer: "Pink Floyd"
    },
    {
        question: "Who is the lead singer of the band U2?",
        options: ["Bono", "Chris Martin", "Thom Yorke", "Eddie Vedder"],
        correctAnswer: "Bono"
    },
    {
        question: "Which artist released the hit single 'Shape of You'?",
        options: ["Ed Sheeran", "Sam Smith", "Justin Bieber", "Shawn Mendes"],
        correctAnswer: "Ed Sheeran"
    }
]
function showQuestion(quizItem) {
    document.getElementById('question').textContent = quizItem.question;
    showOptions(quizItem.options, quizItem.correctAnswer);
   
}

function showOptions(options, correctAnswer) {
    let optionButtons = document.querySelectorAll('.option');
    let feedback = document.getElementById('feedback');

    // Remove os ouvintes de eventos anteriores
    optionButtons.forEach(button => {
        button.removeEventListener('click', checkAnswer);
    });

    for (let i = 0; i < options.length; i++) {
        optionButtons[i].textContent = options[i];
        optionButtons[i].addEventListener('click', checkAnswer);
    }
    function checkAnswer(event) {
        let selectedOption = event.target.textContent;
        if (selectedOption === correctAnswer) {
            incrementScore();
            updateScoreDisplay(score);
            feedback.innerText = "Correct Answer";
        } else {
            feedback.innerText = "Incorrect Answer";
        }
        feedback.classList.remove('hidden');
    }
}

let score = 0; // Declara a variável score aqui

    function incrementScore() {
        score++;
    }

    function updateScoreDisplay(score) {
        let totalQuestions = musicQuiz.length;
        document.getElementById("score").innerText = `${score}/${totalQuestions}`;
    }


    // Função para iniciar o countdown
function startCountdown(durationSeconds) {
    // Seleciona a barra de progresso
    let progress = document.getElementById('progress-bar-fill');
    
    // Converte a duração em segundos para milissegundos
    let totalTime = durationSeconds * 1000;
  
    // Define o intervalo de tempo entre cada atualização da barra de progresso
    let intervalMs = 100; // Atualização a cada 100 milissegundos
  
    // Inicializa o tempo atual como zero
    let currentTime = 0;
  
    // Define um intervalo que será executado a cada intervalo de tempo especificado
    let intervalId = setInterval(function() {
      // Atualiza o tempo atual adicionando o intervalo de tempo
      currentTime += intervalMs;
  
      // Verifica se o tempo atual não ultrapassou o tempo total
      if (currentTime <= totalTime) {
        // Calcula a largura da barra de progresso em porcentagem
        let widthPercentage = (currentTime / totalTime) * 100;
  
        // Define a largura da barra de progresso na interface do usuário
        progress.style.width = widthPercentage + '%';

      } else {
        // Se o countdown estiver completo, limpa o intervalo e executa ações adicionais
        clearInterval(intervalId);
        let progressDiv = document.getElementById('time');
        progressDiv.style.display= 'none';
       let messageFinishTime = document.getElementById('time-finish');
       messageFinishTime.classList.remove('hidden');
       messageFinishTime.classList.add('shaking');
       let clockAudio = document.getElementById('clock-audio');
       clockAudio.play();
      }
    }, intervalMs);
  }
  
  // Exemplo de uso:
  
  