const questions = [
    "Question 1?",
    "Question 2?",
    // Add more questions here...
    "Question 50?"
];

const diseaseThreshold = 0.7; // Adjust this threshold as needed

const quizForm = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');
const responseList = document.getElementById('responseList');
let currentQuestionIndex = 0;

function buildQuiz() {
    questions.forEach((question, index) => {
        const inputId = `q${index}`;
        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = `${question}`;

        const inputYes = createRadioButton(inputId, 'yes', 'হ্যা');
        const inputNo = createRadioButton(inputId, 'no', 'না');
        const inputSometimes = createRadioButton(inputId, 'sometimes', 'মাঝে মাঝে');

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.appendChild(label);

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group-toggle');
        buttonGroup.appendChild(inputYes);
        buttonGroup.appendChild(inputNo);
        buttonGroup.appendChild(inputSometimes);

        questionDiv.appendChild(buttonGroup);

        quizForm.appendChild(questionDiv);
    });

    showQuestion(currentQuestionIndex);
}

function createRadioButton(name, value, text) {
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', name);
    input.setAttribute('value', value);
    input.setAttribute('required', 'true');

    const label = document.createElement('label');
    label.classList.add('btn', 'btn-outline-light', 'mb-2');
    label.textContent = text;
    label.appendChild(input);

    return label;
}

function showQuestion(index) {
    const questions = quizForm.querySelectorAll('.question');
    questions.forEach((question, i) => {
        if (i === index) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    }
}

function submitQuiz() {
    const answers = [];
    const inputs = quizForm.querySelectorAll('input[type="radio"]:checked');
    
    inputs.forEach(input => {
        answers.push(input.value);
    });

    const yesCount = answers.filter(answer => answer === 'yes').length;
    const sometimesCount = answers.filter(answer => answer === 'sometimes').length;
    const diseaseProbability = (yesCount + 0.5 * sometimesCount) / questions.length;

    let resultText;
    if (diseaseProbability === 1) {
        resultText = "জ্বীন কর্তৃক আক্রান্ত হওয়ার ১০০% সম্ভাবনা রয়েছে। ";
    } else if (diseaseProbability === 0) {
        resultText = "জ্বীন কর্তৃক আক্রান্ত হওয়ার কোন সম্ভাবনা নেই। ";
    } else {
        resultText = `জ্বীন কর্তৃক আক্রান্ত হওয়ার সম্ভাবনা: ${(diseaseProbability * 100).toFixed(2)}%`;
    }

    resultDiv.textContent = resultText;

    // Display responses in the list
    responseList.innerHTML = ''; // Clear previous entries

    answers.forEach((answer, index) => {
        const li = document.createElement('li');
        li.textContent = `${questions[index]}: ${answer}`;
        responseList.appendChild(li);
    });
}

window.addEventListener('load', buildQuiz);

quizForm.addEventListener('click', (event) => {
    const clickedQuestion = event.target.closest('.question');
    if (clickedQuestion) {
        nextQuestion();
    }
});
