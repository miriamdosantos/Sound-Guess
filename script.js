document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');

    startQuizButton.addEventListener('click', function() {
        // Oculta o botão "START QUIZ"
        startQuizButton.classList.add('hidden');

        // Mostra os elementos de pergunta, feedback e pontuação
        questionContainer.classList.remove('hidden');
        feedbackContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');

        // Oculta a instrução inicial
        instructionContainer.classList.add('hidden');
    });
});