document.addEventListener('DOMContentLoaded', () => {
    const fruit = ["🍇", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍏", "🍎", "🍍", "🍌", "🍋", "🍊",  "🍉", "🍇"];
    let shuffledFruit = fruit.sort(() => (Math.random() > 0.5) ? 2 : -1);
    let timer = 0;
    let timerInterval = null;
    let isTimerStarted = false;
    let clicks = 0;

    const timerDisplay = document.getElementById("timer");
    const gameContainer = document.querySelector('.game');
    const clicksDisplay = document.getElementById("clicks");
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

    const updateClicks = () => {
        clicks++;
        clicksDisplay.textContent = clicks;
    }


    for (let i=0; i<shuffledFruit.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuffledFruit[i];

        box.onclick=function() {
            startTimer();
            updateClicks();
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
            }
        }, 900)
        }
        document.querySelector('.game').appendChild(box);
    }
});