document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');
    let currentQuestionIndex = 0;
   
    startQuizButton.addEventListener('click', function() {
        console.log('Start quiz button clicked');
        startQuizButton.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        feedbackContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        instructionContainer.classList.add('hidden');
        showQuestion(musicQuiz[currentQuestionIndex]);
        updateScoreDisplay(0);
    });

    let nextButton = document.getElementById('next-btn');
    nextButton.addEventListener('click', function() {
        console.log('Next button clicked');
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
    let progress = document.getElementById('progress-bar-fill');
    let progressDiv = document.getElementById('time');
    let messageFinishTime = document.getElementById('time-finish');

    progress.style.display = 'block';
    progressDiv.style.display = 'block';
    messageFinishTime.classList.add('hidden');

    document.getElementById('question').textContent = quizItem.question;
    showOptions(quizItem.options, quizItem.correctAnswer);
    startCountdown(6, progress, progressDiv, messageFinishTime);
}

function showOptions(options, correctAnswer) {
    let optionButtons = document.querySelectorAll('.option');
    let feedback = document.getElementById('feedback');
    let answerSelected = false; // Variável para controlar se a resposta foi selecionada

    // Remover event listeners e desabilitar botões após a seleção
    optionButtons.forEach(button => {
        button.disabled = false;
        button.removeEventListener('click', checkAnswer); // Remova isso se não for necessário
    });

    for (let i = 0; i < options.length; i++) {
        optionButtons[i].textContent = options[i];
        optionButtons[i].addEventListener('click', function(event) {
            if (!answerSelected) { // Verificar se a resposta já foi selecionada
                clearInterval(intervalId);
                checkAnswer(event, correctAnswer, optionButtons, feedback); // Passar feedback para a função checkAnswer
                answerSelected = true; // Atualizar a variável para indicar que a resposta foi selecionada
            }
        });
    }
}


function checkAnswer(event, correctAnswer, optionButtons, feedback) {
    console.log("checkAnswer called");
    let selectedOption = event.target.textContent;
    if (selectedOption === correctAnswer) {
        incrementScore();
        console.log("Score incremented");
        updateScoreDisplay();
        feedback.innerText = "Correct Answer";
    } else {
        feedback.innerText = "Incorrect Answer";
    }
    feedback.classList.remove('hidden');
    
    // Desativar todos os botões após a seleção
    optionButtons.forEach(button => {
        button.disabled = true;
    });
}

let score = 0; // Declara a variável score aqui

function incrementScore() {
    score++;
}

function updateScoreDisplay() {
    let totalQuestions = musicQuiz.length;
    document.getElementById("score").innerText = `${score}/${totalQuestions}`;
}

let intervalId; // Variável para armazenar o intervalo do countdown
let optionSelected = false; // Variável para controlar se uma opção foi selecionada

function startCountdown(durationSeconds, progress, progressDiv, messageFinishTime) {
    let totalTime = durationSeconds * 1000;
    let audioDuration = 11000; // Duração do áudio em milissegundos
    let intervalMs = 500;
    let currentTime = 0;

    progress.style.width = '0%';

    intervalId = setInterval(function() {
        currentTime += intervalMs;
        if (currentTime <= totalTime) {
            let widthPercentage = (currentTime / totalTime) * 100;
            progress.style.width = widthPercentage + '%';
        } else {
            clearInterval(intervalId);
            progress.style.display = 'none';
            progressDiv.style.display = 'none';
            messageFinishTime.classList.remove('hidden');
            messageFinishTime.classList.add('shaking');
            let clockAudio = document.getElementById('clock-audio');
            if (clockAudio) {
                clockAudio.play();
            }
            setTimeout(function() {
                messageFinishTime.classList.add('hidden');
                if (clockAudio) {
                    clockAudio.pause();
                }
            }, audioDuration); // Tempo de duração do áudio
        }
    }, intervalMs);
}
