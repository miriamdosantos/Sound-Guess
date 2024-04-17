import { musicQuiz } from "./musicQuiz.js";
//variables
// Declare variables
let currentQuestionIndex = 0;
let optionSelected = false;
let totalQuestions = musicQuiz.length;
let scoreContainer = document.getElementById('score-container');
let feedbackAudio;
let audioQueue=[];
// Function to play audio in queue, code suggest by Chrome for Developers

/**
 * Adds the provided audio element to the queue and starts playing if no audio is currently playing.
 * @param {HTMLAudioElement} audioElement - The audio element to be played.
 */
function playAudio(audioElement) {
    // Add the audio to the queue
    audioQueue.push(audioElement);

    // If there's no audio currently being played, start playing
    if (audioQueue.length === 1) {
        playNextAudio();
    }
}
// DOMException - The play() request was interrupted 
// Function to play the next audio in the queue
/**
 * Plays the next audio element in the queue. If the queue is not empty, it loads the audio, adjusts the volume, and starts playback.
 */
function playNextAudio() {
    if (audioQueue.length > 0) {
        let audioElement = audioQueue[0];

        // Add a 'loadeddata' event listener to the audio element
        audioElement.addEventListener('loadeddata', function() {
            // When the audio is fully loaded, play it
            audioElement.volume = 0.5; // Adjust volume as needed
            audioElement.play()
                .then(() => {
                    // Remove the audio from the queue and recursively call to play the next audio
                    audioQueue.shift();
                    playNextAudio();
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        });

        // Load the audio
        audioElement.load();
    }
}

//Add event listener to execute the following code when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    //get the elements in the DOM that will be referred later on in the code
    let startQuizButton = document.getElementById('start-quiz');
    let instructionContainer = document.getElementById('instruction-container');
    let questionContainer = document.getElementById('question-container');
    let feedbackContainer = document.getElementById('feedback-container');
    feedbackAudio = document.getElementById('feedback-audio');
    let userName = document.getElementById('username')
    let formUserRegister = document.getElementById('user-register');
    let labelContainer = document.getElementById('label-container'); 
    let wrapper = document.getElementById('content');
    let userLabel = document.getElementById('user-label'); 
    let nextButton = document.getElementById('next-btn');
    userName.focus();
    nextButton.addEventListener('click', function() {
        console.log('Next button clicked');
 // Increment the index of the current question
currentQuestionIndex++;
// If there are more questions remaining
if (currentQuestionIndex < musicQuiz.length) {
    // Pause the current feedback audio, if any
    if (audioQueue.length > 0) {
        audioQueue[0].pause();
        audioQueue.shift();
    }
    // Display the next question
    showQuestion(musicQuiz[currentQuestionIndex]);
    // Disable the 'Next' button after advancing to the next question
    nextButton.disabled = true;
} else {
    // Define feedback messages based on the user's score
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
    // Update the HTML of the wrapper to display the quiz results and feedback
    wrapper.innerHTML =
        `
        <div class="quiz-result">
            <h1>Well done, <span>${userName.value}</span>, you got to the end of the quiz!</h1>
            <p>Your final score: <span class ="flashing"><u>${score}/${totalQuestions}</u></span></p>
            <p>${scoreFeedback}</p>
        </div>
        <div class="restart-quiz ">
            <button class="button" onclick="window.location.reload()">Play Again</button>
        </div>
    `;
}

}); 
// Add event listener to the user registration form submission
formUserRegister.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    // Check if the user's input is valid
    if (validateUser()) {
        // Add the user's name to the user label element
        userLabel.innerText += `${userName.value}`;
            
            startQuiz(); // Iniciar o quiz
        }
    });
   
/**
 * Start the quiz
 * Hide the start button and display quiz elements
*/
    function startQuiz() {
        console.log('Start quiz button clicked');
        startQuizButton.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        feedbackContainer.classList.remove('hidden');
        scoreContainer.classList.remove('hidden');
        instructionContainer.classList.add('hidden');
        userName.classList.add('hidden');
        labelContainer.classList.remove('hidden'); 
        showQuestion(musicQuiz[currentQuestionIndex]);
        updateScoreDisplay(0);
    }
/**
 * landing page user validation
 * @returns true of false on validation of user
*/
    //  code inspiration : https://github.com/tmarkec/Get-it-right/blob/main/assets/js/script.js
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

/**
 * Display the question and options
 * @param {Object} quizItem - The current quiz item containing question and options
 */
function showQuestion(quizItem) {
    // Get the progress bar and progress div elements
    let progress = document.getElementById('progress-bar-fill');
    let progressDiv = document.getElementById('time'); 
    // Get the message element for displaying finish time
    let messageFinishTime = document.getElementById('time-finish');
    // Hide the image container
    document.getElementById('image-container').classList.add('hidden');
    // Display the progress div
    progressDiv.style.display = 'block';
    
    // Show the question container
    let questionContainer = document.getElementById('question-container');
    questionContainer.classList.remove('hidden');
    // Show the progress bar and reset it to 0%
    progress.style.display = 'block';
    progress.style.width = '0%';
     // Hide the finish time message
    messageFinishTime.classList.add('hidden');
    // Display the question and options
    document.getElementById('question').textContent = quizItem.question;
    showOptions(quizItem.options, quizItem.correctAnswer, feedbackAudio); // Pass feedbackAudio to showOptions
    // Start the countdown
    startCountdown(6.5, progress, progressDiv, messageFinishTime, scoreContainer, feedbackAudio); // Pass feedbackAudio to startCountdown
}
/**
 * Display the options for the current question
 * @param {Array} options - The options for the question
 * @param {string} correctAnswer - The correct answer for the question
 */
function showOptions(options, correctAnswer, feedbackAudio) {
    let optionButtons = document.querySelectorAll('.option');
    let feedback = document.getElementById('feedback');
    optionSelected = false;

    // Remove previous click event listeners for option buttons
    optionButtons.forEach(button => {
        button.removeEventListener('click', handleOptionClick);
    });

    for (let i = 0; i < options.length; i++) {
        optionButtons[i].textContent = options[i];
        optionButtons[i].disabled = false;

        // Add new click event listener for each option button
        optionButtons[i].addEventListener('click', handleOptionClick);
    }

    let audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    feedback.classList.add('hidden');
}

/**
 * Event handler for option button clicks.
 * Checks the selected answer against the correct answer, updates feedback, and enables the 'Next' button.
 * @param {Event} event - The click event object.
 */
function handleOptionClick(event) {
    // Get the correct answer for the current question
    let correctAnswer = musicQuiz[currentQuestionIndex].correctAnswer;
    // Get the feedback element
    let feedback = document.getElementById('feedback');
    // Get all option buttons
    let optionButtons = document.querySelectorAll('.option');
    // Get the 'Next' button
    let nextButton = document.getElementById('next-btn');
    // Clear the countdown interval
    clearInterval(intervalId);
    // Check the selected answer and update feedback
    checkAnswer(event, correctAnswer, optionButtons, feedback, feedbackAudio);
    // Indicate that an option has been selected
    optionSelected = true;
    // Enable the 'Next' button
    nextButton.disabled = false;
}


/**
 * Check the selected answer against the correct answer
 * @param {Event} event - The click event object
 * @param {string} correctAnswer - The correct answer for the question
 * @param {NodeList} optionButtons - The list of option buttons
 * @param {HTMLElement} feedback - The feedback element
 */
function checkAnswer(event, correctAnswer, optionButtons, feedback, feedbackAudio) {
    // Get the selected option text
    let selectedOption = event.target.textContent;
    // Get DOM elements
    let questionContainer = document.getElementById('question-container');
    let progressDiv = document.getElementById('time');
    let messageFinishTime = document.getElementById('time-finish');
    
    // Check if the selected option is correct
    if (selectedOption === correctAnswer) {
        incrementScore(); // Increment the score
        updateScoreDisplay(); // Update the score display
        feedback.innerText = "Correct Answer"; // Display correct feedback message
        let correctAudio = new Audio("./assets/audio/correct-sound.mp3");
        playAudio(correctAudio);
        
        // Find the corresponding quizItem object for the current question
        let currentQuestion = musicQuiz[currentQuestionIndex];
        // Call the showImage() function with the current quizItem object
        showImage(currentQuestion);
        questionContainer.classList.add('hidden');
    } else {
        feedback.innerText = "Incorrect Answer"; // Display incorrect feedback message
 let incorrectAudio = new Audio("./assets/audio/incorrect-sound.mp3");
        playAudio(incorrectAudio);    }

    feedback.classList.remove('hidden');
    // Disable all buttons after selection
    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    
    // Hide progress bar and reset to 0%
    let progress = document.getElementById('progress-bar-fill');
    progress.style.display = 'none';
    progress.style.width = '0%';
    // Hide time counter
    progressDiv.style.display = 'none';
    // Hide time finish message
    messageFinishTime.classList.add('hidden');
}


/**
 * Show the image associated with the quizItem
 * @param {Object} quizItem - The quiz item object containing image information
 */
function showImage(quizItem) {
    let imageContainer = document.getElementById('image-container');
    let artistImage = document.getElementById('artist-image');// Set the image source
    if (quizItem.image) {
        artistImage.src = quizItem.image;
        imageContainer.classList.remove('hidden');// Show the image container
    } else {
        imageContainer.classList.add('hidden');  // Hide container if no image is available
    
    }
}
let score = 0; // Declare the score variable
function incrementScore() {
    score++;
}
/**
 * Update the score display with the current score and total number of questions
 */
function updateScoreDisplay() {
    
    document.getElementById("score").innerText = `${score}/${totalQuestions}`;
}
/**
 * Start a countdown timer with the specified duration in seconds
 * @param {number} durationSeconds - The duration of the countdown timer in seconds
 * @param {HTMLElement} progress - The progress bar element to update during the countdown
 * @param {HTMLElement} progressDiv - The container for the progress bar
 * @param {HTMLElement} messageFinishTime - The message element to display when the countdown finishes
 */
let intervalId; // declare the variable intervalId to store  countdown interval
function startCountdown(durationSeconds, progress, progressDiv, messageFinishTime, scoreContainer) {
    let totalTime = durationSeconds * 1000;
    let intervalMs = 500;
    let currentTime = 0;
    let audioPlayed = false; // Variable to control if the audio has been played
    progress.style.width = '0%';
    let optionButtons = document.querySelectorAll('.option');
    let clockAudio = document.getElementById('clock-audio');
    intervalId = setInterval(function() {
        currentTime += intervalMs;// Increment current time by the interval
        if (currentTime <= totalTime) {
            // Calculate the width percentage of the progress bar
            let widthPercentage = (currentTime / totalTime) * 100;
            progress.style.width = widthPercentage + '%';
        } else {
            clearInterval(intervalId);// Stop the interval timer
            progress.style.display = 'none';
            progressDiv.style.display = 'none';
            messageFinishTime.classList.remove('hidden');
            messageFinishTime.classList.add('shaking');
            scoreContainer.classList.add('hidden');
            if (!audioPlayed && clockAudio) {
                clockAudio.currentTime = 0; // Restart audio playback
                clockAudio.play();
                audioPlayed = true;// Mark that the audio has been played
            }
            setTimeout(function() {
                messageFinishTime.classList.add('hidden');
                if (clockAudio) {
                    clockAudio.pause();
                }
                scoreContainer.classList.remove('hidden');
                let nextButton = document.getElementById('next-btn');
                nextButton.disabled = false;
            }, 2000); // Reduced time to 2 seconds for the "times up" image
              // Disable all option buttons
            optionButtons.forEach(button => {
                button.disabled = true;
            });
        }
    }, intervalMs);// Set the interval for updating the progress bar
}