var output = document.getElementById('output');
var bAnswer = document.getElementsByClassName('btnAns');
var myObj= '',
page = 0,
crtAnswer = 0;
let score = 0;
loadQuestions();


// testing new stuff

//event listeners
btnPre.onclick = function () {
	buildQuiz(page - 1)
};
btnNxt.onclick = function () {
	buildQuiz(page + 1)
};

btnNxt.onclick = function () {
	buildQuiz(page + 1)
};

//

function loadQuestions() {
	var a = new XMLHttpRequest();
	a.open("GET","https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple", true);
	a.onreadystatechange = function() {
	if (a.readyState == 4) {
		myObj = JSON.parse(a.responseText);
		buildQuiz(0); //Ändrade så att index börjar på 0

		}
	}
	a.send();
}

function buildQuiz(pg) {
  // console.log(page);
  // console.log(myObj.results.length);
  page = pg;
  if (page >= 0 ) {
    if (myObj.results.length == page ){
  }else {
    var myQuestion = myObj.results[page].question;
    var myCorrect = myObj.results[page].correct_answer;
    crtAnswer = myObj.results[page].incorrect_answers[myCorrect];
    var questionHolder = '';

    for (var i in myObj.results[page].incorrect_answers) {
      var aClass = '';
      if (myObj.results[page].mySel == i) {
        aClass = ' selAnswer ';
      }
      questionHolder += '<div class="col-sm-6"><div class="btnAns ' + aClass + '" data-id="' + parseInt(i) + '">' + myObj.results[page].incorrect_answers[i] + '</div></div>'; 
    }
    output.innerHTML = '<div class="my">' + myQuestion + '</div>';
    output.innerHTML +=  questionHolder + '<div class="col-sm-6"><div class="btnAns" >' + myCorrect + '</div></div>'
    for (var x = 0; x < bAnswer.length; x++) {
      bAnswer[x].addEventListener('click', myAnswer, false);
    }
    // console.log(bAnswer);
    }
  }
}

function myAnswer(e) {
  let targetValue = e.target.innerHTML; //Hämtar innehållet i det "targetade" elementet.
  // console.log(targetValue);
  let obj = 0; //Safety check så att nästa sida inte körs flera gånger i "else"
  for(let i = 0; i < myObj.results.length; i++){ //Loopar genom resultatet från API'et
    if(targetValue === myObj.results[i].correct_answer){ //Ifall target stämmer med correct answer från API
      alert("CORRECT")
      score = score + 1;
      // console.log("Score:" + score);
      obj = obj + 1; //Ifall rätt svar är givet så blir obj 1 för att förhindra att vi bläddrar sida mer än en gång
      if(page < 9){ //Om page är under 9 så bläddrar dem vidare
        buildQuiz(page + 1)
      }else{ //Ifall vi står på fråga 9
        // console.log("nore more pages")
        output.innerHTML = '<div class="my">' + "Score: " + score + "/10" + '</div>'; // Skriver ut score efter sista frågan är besvarad
      }
    }else{
      if(obj == 0 && page < 9){ // Ifall obj = 0 (Ifall vi inte bläddrat sida innan) så kör vi buildQuiz och går vidare till nästa fråga.
       //  console.log("wrong" + obj)
        buildQuiz(page + 1);
        obj = obj + 1 //Obj blir ett så att den inte blädrrar sida ännu en gång
      }else{
          if(page < 9){
            // console.log("wrong") //loggar en sträng enbart ifall vi redan bläddrat sida och ifall vi står på fråga 9
          }else{
            output.innerHTML = '<div class="my">' + "Score: " + score + "/10" +  '</div>'; // Skriver ut score efter sista frågan är besvarad
          }
      }
    }
    }
}