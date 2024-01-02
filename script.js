const questionContainer = document.getElementById('question-container');
const newQuestionBtn = document.getElementById('new-question-btn');

// Function to display a random question
function showRandomQuestion() {
    fetch('questions.txt') // Fetch the content of the file
        .then(response => response.text())
        .then(data => {
            const questions = data.split('\n').filter(question => question.trim() !== ''); // Split by line and remove empty lines
            if (questions.length > 0) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                const modifiedQuestion = questions[randomIndex].replace(/_/g, '__');
                questionContainer.textContent = modifiedQuestion;
            } else {
                questionContainer.textContent = "No questions available.";
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            questionContainer.textContent = "Error loading questions.";
        });
}

// Initial question display
showRandomQuestion();

// Event listener for the "New Question" button
newQuestionBtn.addEventListener('click', showRandomQuestion);
