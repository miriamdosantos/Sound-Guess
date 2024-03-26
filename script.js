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
function showQuestion (quizItem){
    document.getElementById('question').textContent = quizItem.question;
    showOptions(quizItem.options)
    
}

function showOptions (options){
    let optionButtons = document.querySelectorAll('.option');
    for (let i = 0; i<options.lenght; i++){
        optionButtons[i].textContent = options[i];
    }
}