const questionContainer = document.getElementById('question-container');
const newQuestionBtn = document.getElementById('new-question-btn');
const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const historyContent = document.getElementById('history-content');
const closeHistoryBtn = document.querySelector('.close');

let allQuestions = [];
let displayedQuestions = [];

// Function to display a random question
function showRandomQuestion() {
    // Check if there are questions that haven't been displayed
    if (allQuestions.length === 0 || displayedQuestions.length === allQuestions.length) {
        questionContainer.textContent = "No more questions available.";
        return;
    }

    // Get a random question that hasn't been displayed yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * allQuestions.length);
    } while (displayedQuestions.includes(randomIndex));

    displayedQuestions.push(randomIndex);
    const modifiedQuestion = allQuestions[randomIndex].replace(/_/g, '__');
    questionContainer.textContent = modifiedQuestion;

    // Store displayed questions as cookies
    document.cookie = `displayedQuestions=${displayedQuestions.join(',')}; path=/`;
}

// Function to show the questions history
function showHistory() {
    historyContent.innerHTML = "";
    for (let i = displayedQuestions.length - 1; i >= 0; i--) {
        const index = displayedQuestions[i];
        const question = allQuestions[index].replace(/_/g, '__');
        historyContent.innerHTML += `<p>${question}</p>`;
    }
    historyModal.style.display = 'block';
}

// Function to close the history modal
function closeHistory() {
    historyModal.style.display = 'none';
}

// Function to fetch questions from the file
function fetchQuestions() {
    fetch('questions.txt')
        .then(response => response.text())
        .then(data => {
            allQuestions = data.split('\n').filter(question => question.trim() !== '');
            if (allQuestions.length === 0) {
                questionContainer.textContent = "No questions available.";
            } else {
                // Retrieve displayed questions from cookies
                const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)displayedQuestions\s*\=\s*([^;]*).*$)|^.*$/, '$1');
                displayedQuestions = cookieValue ? cookieValue.split(',').map(Number) : [];

                showRandomQuestion(); // Display an initial random question
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            questionContainer.textContent = "Error loading questions.";
        });
}

// Event listeners
newQuestionBtn.addEventListener('click', showRandomQuestion);
historyBtn.addEventListener('click', showHistory);
closeHistoryBtn.addEventListener('click', closeHistory);

// Initial fetch of questions
fetchQuestions();

// ... (your existing code)

const resetBtn = document.getElementById('reset-btn');

// Function to reset the game
function resetGame() {
    // Clear displayed questions array
    displayedQuestions = [];
    // Remove the displayedQuestions cookie
    document.cookie = 'displayedQuestions=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Close the modal
    closeHistory();
    // Show a new random question
    showRandomQuestion();
}

// Event listener for the reset button
resetBtn.addEventListener('click', resetGame);
