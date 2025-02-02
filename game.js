const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; 
//let HighScore =0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//Fetching the data from the local json file

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then( (res) => {
     return res.json();
  })
  .then((loadedQuestions) => {
   // console.log(loadedQuestions.results);
   questions = loadedQuestions.results.map((loadedQuestion) => {
    const formattedQuestion = {
      question: loadedQuestion.question,
    };

    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1 ;
    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedQuestion.correct_answer
    );

    answerChoices.forEach((choice, index) => {
      formattedQuestion['choice' + (index+1)] = choice;
    });

    return formattedQuestion;

   });
    //  questions = loadedQuestions;
      
      startGame();
  })
  .catch((err) => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; 
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () =>{
    if(availableQuestions.length==0 || questionCounter>= MAX_QUESTIONS){
      // HighScore=score;
     // window.localStorage.setItem('value1', 'score');
     localStorage.setItem("mostRecentScore", score);
      
       // GO TO THE END PAGE
       return window.location.assign('/end.html');
    }
    questionCounter++;

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //console.log((questionCounter / MAX_QUESTIONS) * 100); 
    //Update the progressBar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });
    
    availableQuestions.splice(questionIndex,1);
    //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
    // console.log(availableQuestions);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click',(e) =>{
        if(!acceptingAnswers) return ;
        
        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer?"Correct":"Incorrect";
        
        if(classToApply == 'Correct'){
          incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () =>{
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
        },1000)
        // console.log(selectedAnswer == currentQuestion.answer);
        // console.log(selectedAnswer);
        
    });
});

//To update the score value
incrementScore = num =>{
  score+=num;
  scoreText.innerText = score; 
};


