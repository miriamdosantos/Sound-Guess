document.addEventListener("DOMContentLoaded", function() {
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    let scoreContainer = document.getElementById('score-container');

    startQuizButton.addEventListener('click', function() {
        // Oculta o botão "START QUIZ"
        startQuizButton.style.display = 'none';

        // Mostra os elementos de pergunta, feedback e pontuação
        questionContainer.style.display = 'block';
        feedbackContainer.style.display = 'block';
        scoreContainer.style.display = 'block';

        // Oculta a instrução inicial
        instructionContainer.style.display = 'none';
    });
});
