let progressDiv; // Declarar a variável global progressDiv

document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');
    let currentQuestionIndex = 0;
    let optionSelected = false; // Variável para controlar se uma opção foi selecionada

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
    nextButton.disabled = true; // Desabilitar o botão "Next" inicialmente

    nextButton.addEventListener('click', function() {
        console.log('Next button clicked');
        currentQuestionIndex++;
        if (currentQuestionIndex < musicQuiz.length) {
            let feedbackAudio = document.getElementById('feedback-audio');
            feedbackAudio.pause(); // Pausar o áudio de feedback atual
            feedbackAudio.currentTime = 0; // Reiniciar o áudio de feedback
            showQuestion(musicQuiz[currentQuestionIndex]);
            nextButton.disabled = true; // Desabilitar o botão "Next" após avançar
        } else {
            alert('Quiz completed!');
        }
    });
});
const musicQuiz = [
    {
        question: "Who is often referred to as the 'King of Pop'?",
        options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
        correctAnswer: "Michael Jackson",
        image:"./assets/images/michael.jpg"
    },
    {
        question: "Which band performed the hit song 'Bohemian Rhapsody'?",
        options: ["The Beatles", "Queen", "Led Zeppelin", "The Rolling Stones"],
        correctAnswer: "Queen",
        image:"./assets/images/queen.jpg"
    },
    {
        question: "Which artist released the album 'Thriller' in 1982?",
        options: ["Madonna", "Elton John", "Michael Jackson", "David Bowie"],
        correctAnswer: "Michael Jackson",
        image:
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
    progressDiv = document.getElementById('time'); //
    let messageFinishTime = document.getElementById('time-finish');

    // Ocultar a imagem
    document.getElementById('image-container').classList.add('hidden');
    progressDiv.style.display = 'block';
    
    // Exibir o question container
    let questionContainer = document.getElementById('question-container');
    questionContainer.classList.remove('hidden');

    // Exibir a barra de progresso e resetar para 0%
    progress.style.display = 'block';
    progress.style.width = '0%';

    // Ocultar a mensagem de tempo esgotado
    messageFinishTime.classList.add('hidden');

    // Exibir a pergunta e as opções
    document.getElementById('question').textContent = quizItem.question;
    showOptions(quizItem.options, quizItem.correctAnswer);

    // Iniciar a contagem regressiva
    startCountdown(6, progress, messageFinishTime);
}

function showOptions(options, correctAnswer) {
    let optionButtons = document.querySelectorAll('.option');
    let feedback = document.getElementById('feedback');
    let nextButton = document.getElementById('next-btn');

    optionSelected = false; // Reiniciar a variável de controle de seleção de opção

    for (let i = 0; i < options.length; i++) {
        optionButtons[i].textContent = options[i];
        optionButtons[i].disabled = false; // Habilitar todas as opções
        optionButtons[i].addEventListener('click', function(event) {
            clearInterval(intervalId);
            checkAnswer(event, correctAnswer, optionButtons, feedback);
            optionSelected = true; // Atualizar a variável para indicar que uma opção foi selecionada
            nextButton.disabled = false; // Habilitar o botão "Next" após selecionar uma opção
        });
    }

    // Ocultar o feedback após mostrar as opções
    feedback.classList.add('hidden');
}

function checkAnswer(event, correctAnswer, optionButtons, feedback) {
    console.log("checkAnswer called");
    let selectedOption = event.target.textContent;
    let feedbackAudio = document.getElementById('feedback-audio');
    let artistImage = document.getElementById('artist-image');
    let questionContainer = document.getElementById('question-container');
    let progressDiv = document.getElementById('time');
    let messageFinishTime = document.getElementById('time-finish');

    if (selectedOption === correctAnswer) {
        incrementScore();
        console.log("Score incremented");
        updateScoreDisplay();
        feedback.innerText = "Correct Answer";
        feedbackAudio.src = "correct-sound.mp3"; // Definir o arquivo de áudio correto
        showImage(correctAnswer); // Exibir a imagem do artista
        // Ocultar o container de perguntas
        questionContainer.classList.add('hidden');
    } else {
        feedback.innerText = "Incorrect Answer";
        feedbackAudio.src = "incorrect-sound.mp3"; // Definir o arquivo de áudio incorreto
    }
    feedback.classList.remove('hidden'); // Mostrar o feedback após a seleção

    // Desativar todos os botões após a seleção
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Reproduzir o áudio de feedback
    feedbackAudio.play();

    // Ocultar a barra de progresso e resetar para 0%
    let progress = document.getElementById('progress-bar-fill');
    progress.style.display = 'none';
    progress.style.width = '0%';

    // Ocultar o contador de tempo
    progressDiv.style.display = 'none';

    // Ocultar a mensagem de tempo esgotado
    messageFinishTime.classList.add('hidden');
}

function showImage(correctAnswer) {
    let imageContainer = document.getElementById('image-container');
    let artistImage = document.getElementById('artist-image');
    for (let i = 0; i < musicQuiz.length; i++) {
        let quizItem = musicQuiz[i];
        if (quizItem.correctAnswer === correctAnswer && quizItem.image) {
            artistImage.src = quizItem.image;
            imageContainer.classList.remove('hidden');
        }
    }
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

function startCountdown(durationSeconds, progress, progressDiv, messageFinishTime) {
    let totalTime = durationSeconds * 1000;
    let intervalMs = 500;
    let currentTime = 0;
    let audioPlayed = false; // Variável para controlar se o áudio já foi reproduzido

    progress.style.width = '0%';

    let optionButtons = document.querySelectorAll('.option');
    let clockAudio = document.getElementById('clock-audio');

    // Ajustar a duração do áudio com base na duração total da contagem
    let audioDuration = totalTime < 11000 ? totalTime : 11000; // Limite de 11 segundos para o áudio

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
            if (!audioPlayed && clockAudio) {
                clockAudio.currentTime = 0; // Reiniciar a reprodução do áudio
                clockAudio.play();
                audioPlayed = true; // Marcar que o áudio foi reproduzido
            }
            setTimeout(function() {
                messageFinishTime.classList.add('hidden');
                if (clockAudio) {
                    clockAudio.pause();
                }
                let nextButton = document.getElementById('next-btn');
                nextButton.disabled = false;
            }, 2000); // Tempo reduzido para 2 segundos para a imagem "times up"
            optionButtons.forEach(button => {
                button.disabled = true;
            });
        }
    }, intervalMs);
}