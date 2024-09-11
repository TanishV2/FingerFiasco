const words ='the and is it to in a of you that for with on are as was but or by not at from have be this which can will if up out one all about there when make know time who where how your come go see get use what like day work way many such her him me us them a lot another always ask baby back ball bank bat beach bed big bird blue book box boy bread brother brown bus cake call can car cat chair children city class clean cold come cookie cup dark day desk dirty dog door down eat egg end fast find floor flower fly food foot friend full game garden girl give good green ground happy hat head help high home hot house how if inside jump keep kind kitchen know laugh letter light like little live long look make man may mean milk mom morning mother move name near never new night no not now of old on open orange other our out over paper party people pick place play put quiet red remember run sad same school sea see sell small some sun take talk tea tell that the them then there they think this those three time to too top town tree truck try under us very walk water well when where which white who why will wind with woman word work year yes you your'.split(' ');

const wordsCount= words.length;

function addClass(el,name){
  el.className += ' '+name;
}
function removeClass(el,name){
  el.className = el.className.replace(name,'');
}

function randomWord(){
  const randomIndex= Math.ceil(Math.random()*wordsCount);
  return words[randomIndex - 1];
}

function formatWord(word){
  return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
  document.getElementById('words').innerHTML='';
  for(let i=0;i<300;i++){
    document.getElementById('words').innerHTML += formatWord(randomWord());
  }
  addClass(document.querySelector(".word"),'current');
  addClass(document.querySelector(".letter"),'current');
}

document.addEventListener('keydown', () => {
  const game = document.getElementById('game');
  if (document.activeElement !== game) {
    game.focus(); // Set focus to the game container
  }
});

// let initialPosition = true;
const marginThreshold = 0;

document.getElementById('game').addEventListener('keydown', ev =>{ 
  const key= ev.key;
  const currentWord = document.querySelector('.word.current');
  const currentLetter = document.querySelector('.letter.current');
  const expected = currentLetter?.innerHTML || ' '; 
  const isLetter = key.length === 1 && key !== ' ';
  const isExtra = document.querySelector(".letter.incorrect.extra");
  const isSpace = key === ' ';
  const isBackspace = key === 'Backspace';
  const isFirstLetter = currentLetter === currentWord.firstChild;

  // console.log({key,expected});

  if(isLetter){
    if(currentLetter){
      addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
      removeClass(currentLetter, 'current');
      if(currentLetter.nextSibling){
        addClass(currentLetter.nextSibling, 'current');
      }
    } else{
      const incorrectLetter = document.createElement('span');
      incorrectLetter.innerHTML = key;
      incorrectLetter.className = 'letter incorrect extra';
      currentWord.appendChild(incorrectLetter); 
    }
  }

  if(isSpace){
    if(expected != ' '){
      const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
      lettersToInvalidate.forEach(letter => {
        addClass(letter,'incorrect');
      });
    }
    removeClass(currentWord,'current');
    addClass(currentWord.nextSibling, 'current');
    if(currentLetter){
      removeClass(currentLetter,'current');
    }
    addClass(currentWord.nextSibling.firstChild, 'current');
  }

  if(isBackspace){
    if(isExtra){
      currentWord.removeChild(currentWord.lastChild);
    }
    else if(!currentWord.previousSibling && isFirstLetter){
      return;
    }
    else if(currentLetter && isFirstLetter){
      removeClass(currentWord, 'current');
      addClass(currentWord.previousSibling, 'current');
      removeClass(currentLetter, 'current');
      addClass(currentWord.previousSibling.lastChild, 'current');
      removeClass(currentWord.previousSibling.lastChild, 'incorrect');
      removeClass(currentWord.previousSibling.lastChild, 'correct');
    }
    else if(currentLetter && !isFirstLetter){
      removeClass(currentLetter,'current');
      addClass(currentLetter.previousSibling,'current');
      removeClass(currentLetter.previousSibling, 'incorrect');
      removeClass(currentLetter.previousSibling, 'correct');
    } 
    else if(!currentLetter){
      addClass(currentWord.lastChild,'current');
      removeClass(currentWord.lastChild, 'incorrect');
      removeClass(currentWord.lastChild, 'correct');
    }

    if (currentWord.getBoundingClientRect().top < 230) {
      const words = document.getElementById('words');
      const margin = parseInt(words.style.marginTop || '0px');
      words.style.marginTop = (margin + 45) + 'px';
    }

    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');

    // Check if the first line is in view and prevent extra downward shift
    const firstWord = document.querySelector('.word');
    const firstWordTop = firstWord.getBoundingClientRect().top;

    if (firstWordTop < 230 && margin > marginThreshold) {
      words.style.marginTop = (margin + 45) + 'px';
    }
  }

  // moving lines up
  if(currentWord.getBoundingClientRect().top > 230){
    const words = document.getElementById('words');
    const margin = parseInt(words.style.marginTop || '0px');
    words.style.marginTop = (margin - 45) + 'px';
  }

  //moving cursor
  const nextLetter = document.querySelector('.letter.current');
  const nextWord = document.querySelector('.word.current');
  const cursor = document.getElementById('cursor');

  cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
  cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
})

newGame();


// const words = 'the and is it to in a of you that for with on are as was but or by not at from have be this which can will if up out one all about there when make know time who where how your come go see get use what like day work way many such her him me us them a lot another always ask baby back ball bank bat beach bed big bird blue book box boy bread brother brown bus cake call can car cat chair children city class clean cold come cookie cup dark day desk dirty dog door down eat egg end fast find floor flower fly food foot friend full game garden girl give good green ground happy hat head help high home hot house how if inside jump keep kind kitchen know laugh letter light like little live long look make man may mean milk mom morning mother move name near never new night no not now of old on open orange other our out over paper party people pick place play put quiet red remember run sad same school sea see sell small some sun take talk tea tell that the them then there they think this those three time to too top town tree truck try under us very walk water well when where which white who why will wind with woman word work year yes you your'.split(' ');

// const numberWords = 'the cat and the dog played in the yard 12 near the house 7 the tree provided shade 3 as they ran around and played with a ball 20 after a while they were tired 9 and sat down to rest 15 they each had an apple 8 to eat and then went inside the house 18 to sleep 6 at school the next day 10 they talked about their fun time 22 and their favorite books 4 the water from the tap was cold 30 and refreshing 5 their friend was happy 2 to join them and they all enjoyed their time 14 together feeling both big 11 and small moments of joy 27'.split(' ');

// const punctuationWords = 'The sun was shining brightly; the park was bustling with activity. Children played on the swings, parents chatted on benches, and dogs ran around happily. "Look at that!" said Jane, pointing to a group of ducks by the pond. They had so many ducklings trailing behind them! Suddenly, a light rain began to fall—just a few drops at first, then heavier. Everyone scrambled for cover; some ran to their cars, others ducked under the large oak tree. Jane and her friend Lily laughed, “What a surprise! We didn’t expect this.” They counted the raindrops, playfully pretending it was a game. Meanwhile, they spotted several umbrellas, bicycles, and puddles forming on the ground. The rain stopped as quickly as it had started, leaving behind a beautiful rainbow. “Look,” exclaimed Lily, “there are so many colors!” The day ended with a light snack and a relaxing walk home, feeling both refreshed and cheerful.'.split(' ');


// // punctuation-mode.addEventListener("click", (event) => {
// //   console.log("Punctuation button was clicked");
// //   console.log(event);
// // })

// let currentText = words; // Default text to display

// // Track the current index of the text being typed
// let currentIndex = 0;

// // Initialize the text area with default text
// function updateTextArea() {
//   const wordsContainer = document.getElementById('words');
//   wordsContainer.innerHTML = currentText.map(word => formatWord(word)).join('');
//   currentIndex = 0; // Reset current index on update
// }

// // Format words for display
// function formatWord(word) {
//   return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
// }

// // Update text on selection change
// document.getElementById('punctuation-mode').addEventListener('click', () => {
//   currentText = punctuationWords;
//   updateTextArea();
// });

// document.getElementById('number-mode').addEventListener('click', () => {
//   currentText = numberWords;
//   updateTextArea();
// });

// // Handle user typing in the text area
// document.getElementById('words').addEventListener('input', (event) => {
//   const userInput = event.target.innerText.split(' ');
//   const wordsArray = currentText.slice(0, userInput.length); // Compare typed words with the current text

//   // Compare user input with the correct text
//   for (let i = 0; i < userInput.length; i++) {
//     if (userInput[i] !== wordsArray[i]) {
//       highlightText(i, false); // Highlight errors
//     } else {
//       highlightText(i, true); // Correct text
//     }
//   }
// });

// // Highlight words based on correctness
// function highlightText(index, isCorrect) {
//   const wordElements = document.querySelectorAll('#words .word');
//   const wordElement = wordElements[index];
//   if (wordElement) {
//     wordElement.classList.toggle('correct', isCorrect);
//     wordElement.classList.toggle('incorrect', !isCorrect);
//   }
// }

// // Initialize the text area with default text
// updateTextArea();

