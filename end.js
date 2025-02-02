const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// console.log(mostRecentScore);
const highScores = JSON.parse(localStorage.getItem('highScores')) || []; //We give empty array as when localstorage highScores is null 
//We write "JSON.parse" to convert the string into its original form 

const MAX_HIGH_SCORES = 5; // the number of high Scores to be displayed

finalScore.innerText = mostRecentScore; //Change the finalScore text dynamically

username.addEventListener('keyup', () =>{

    //console.log(username.value);

    saveScoreBtn.disabled = !username.value;
});


saveHighScore = (e) =>{
 // console.log("clicked the save button");
  e.preventDefault(); //We use this because, by default forms give the input into next page, so to prevent it and to print it in console we use preventDefault();
  const score = {
   // score: Math.floor(Math.random() * 100),
    score: mostRecentScore,
    name: username.value,
  }; //Create a object to store 'score' and 'name'

  highScores.push(score); 
  // push the 'score' object to the array 'highScores' we have created // .push() methods add values to the array

  highScores.sort((a, b) => b.score - a.score);
  //sort() fuction sorts the values of scores according to the condition
  //Here 'b.score - a.score' indicates if b>a sort b first

  highScores.splice(5); // Only shows first '5' highScores and rest will be removed

  localStorage.setItem('highScores', JSON.stringify(highScores));
  //Storing the highScore in the localStorage

  //console.log(highScores);

  return window.location.assign('/index.html');

};