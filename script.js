document.addEventListener("DOMContentLoaded", function() {
    let startQuiz = document.getElementById('start-quiz')
    let instructionContainer = document.getElementById('instruction-container');
    startQuiz.addEventListener('click',function(){
        instructionContainer.style.display ="none"
        startQuiz.classList.remove('hidden');
        startQuiz.classList.add('display')
        startQuiz.style.display="none"
    })
})