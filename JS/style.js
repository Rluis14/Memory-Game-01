// The arrow function () => {} is an ES6 feature. Arrow function provide a concise syntaz for defing functions.
document.addEventListener('DOMContentLoaded', () => {
    const fruit = ["🍇", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍏", "🍎", "🍍", "🍌", "🍋", "🍊",  "🍉", "🍇"];
// .sort() function with a callback is an example of a function programming concept called a "higher order function"    
    let shuffledFruit = fruit.sort(() => (Math.random() > 0.5) ? 2 : -1);
    let timer = 0;
    let timerInterval = null;
    let isTimerStarted = false;
    let moves = 0;

    const timerDisplay = document.getElementById("timer");
    const gameContainer = document.querySelector('.game');
    const movesDisplay = document.getElementById("moves");
    const startTimer = () =>{
        if (!isTimerStarted) {
            isTimerStarted = true;
            timerInterval = setInterval(() => {
                timer++;
                timerDisplay.textContent = timer;
            }, 1000);
        }
    };
    const stopTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
    };

    const updateMoves = () => {
        moves++;
        movesDisplay.textContent = moves;
    }


    for (let i=0; i<shuffledFruit.length; i++) {
// This code dynamically creates <div> elements with the
//  className of 'item' and populates them with the fruit
//  emoji from the shuffledFruit array. These elements are
//  then appended to the .game container in the DOM.        
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuffledFruit[i];

// The onclick event is used here to trigger the startTimer and
// updateClicks functions when a box is clicked. This example
// of adding and handling an event in Javascript.
        box.onclick=function() {
            startTimer();
            this.classList.add('boxOpen')
            setTimeout(function(){
                if(document.querySelectorAll('.boxOpen').length > 1){
                    if(document.querySelectorAll('.boxOpen')[0].innerHTML == 
                    document.querySelectorAll('.boxOpen')[1].innerHTML){

                        document.querySelectorAll('.boxOpen')[0].classList.add
                        ('boxMatch')
                        document.querySelectorAll('.boxOpen')[1].classList.add
                        ('boxMatch')

                        const sound = document.getElementById('match-sound');
                        sound.play();

                        document.querySelectorAll('.boxOpen')[1].classList.remove
                        ('boxOpen')
                        document.querySelectorAll('.boxOpen')[0].classList.remove
                        ('boxOpen')

                        
                        
                        if(document.querySelectorAll('.boxMatch').length == fruit.
                        length){
                            alert('You Won! Game Over')
                            const sound = document.getElementById('win-sound');
                            sound.play();
                            stopTimer();
                        }
                    } else {
                        const sound = document.getElementById('fail-sound');
                        sound.play();
                        document.querySelectorAll('.boxOpen')[1].classList.remove
                        ('boxOpen')
                        document.querySelectorAll('.boxOpen')[0].classList.remove
                        ('boxOpen')
                }

                updateMoves();
            }
        }, 900)
        }
        gameContainer.appendChild(box);
    }
});