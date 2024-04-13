import { musicQuiz } from "./musicQuiz.js";
let currentQuestionIndex = 0;
let optionSelected = false; // Variável para controlar se uma opção foi selecionada
let totalQuestions = musicQuiz.length;
document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');
    let restartQuizButton = document.getElementById('restart-quiz'); // Adicione o botão de reinício
    let userName = document.getElementById('username');
    let formUserRegister = document.getElementById('user-register');
    let labelContainer = document.getElementById('label-container'); // Adicionar a referência ao elemento
    let wrapper = document.getElementById('content');
    let userLabel = document.getElementById('user-label'); // Corrigir o ID aqui
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
            let scoreFeedback = "Oh no! It seems like you struggled a bit. Don't worry, there's always room for improvement!";
            if (score > 4) {
                scoreFeedback = "Not bad at all! You're on the right track. Keep it up!";
            }
            if (score > 6) {
                scoreFeedback = "Great job! You're doing pretty well. Keep practicing to reach even higher!";
            }
            if (score > 9) {
                scoreFeedback = "Incredible performance! Are you secretly a radio DJ? Keep shining!";
            }
            wrapper.innerHTML = `
                <div class="quiz-result">
                    <h1>Well done, ${userName.value}, you got to the end of the quiz!</h1>
                    <p>Your final score: <span class ="flashing"><u>${score}/${totalQuestions}</u></span></p>
                    <p>${scoreFeedback}</p>
                </div>
                <div class="restart-quiz">
                    <button onclick="window.location.reload()">Play Again</button>
                </div>
            `;
        }
    });
    formUserRegister.addEventListener('submit', function(event){
        event.preventDefault(); // Impedir o envio padrão do formulário
        if(validateUser()){ // Verificar se o nome do usuário é válido
            userLabel.innerText += `${userName.value}` // Adicionar o nome do usuário ao elemento
            
            startQuiz(); // Iniciar o quiz
        }
    });
    // Adicione o evento de clique para o botão de reinício
    restartQuizButton.addEventListener('click', function() {
        restartQuiz();
    });
    function startQuiz() {
        console.log('Start quiz button clicked');
        startQuizButton.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        feedbackContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        instructionContainer.classList.add('hidden');
        userName.classList.add('hidden');
        labelContainer.classList.remove('hidden'); // Remover a classe hidden da div
        showQuestion(musicQuiz[currentQuestionIndex]);
        updateScoreDisplay(0);
    }
    /**
     * landing page user validation
     * @returns true of false on validation of user
     */
    function validateUser() {
        let reg = /^[A-Za-z]+$/;
        if (userName.value == "" || !userName.value.match(reg)) {
            alert("Please type in letters, no empty space or numbers!!!")
            userName.focus();
            return false;
        } else {
            return true;
        }
    }
});
function showQuestion(quizItem) {
    let progress = document.getElementById('progress-bar-fill');
    let progressDiv = document.getElementById('time'); //
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
    startCountdown(6, progress, progressDiv, messageFinishTime);
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
    // Pausar qualquer áudio em andamento antes de reproduzir um novo áudio
    let audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
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
        // Encontrar o objeto quizItem correspondente à pergunta atual
        let currentQuestion = musicQuiz[currentQuestionIndex];
        // Chamada corrigida para a função showImage()
        showImage(currentQuestion); // Passar o objeto quizItem correspondente à pergunta atual
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
    feedbackAudio.volume = 0.5;// for a better userExperience
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
function showImage(quizItem) {
    let imageContainer = document.getElementById('image-container');
    let artistImage = document.getElementById('artist-image');
    if (quizItem.image) {
        artistImage.src = quizItem.image;
        imageContainer.classList.remove('hidden');
    } else {
        imageContainer.classList.add('hidden'); // Ocultar container se não houver imagem
    }
}
let score = 0; // Declara a variável score aqui
function incrementScore() {
    score++;
}
function updateScoreDisplay() {
    
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