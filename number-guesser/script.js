const restartBtn = document.querySelector('#restart')
const guessText = document.querySelector('#guessText')

let low = 1;
let high = 10;

guessText.textContent = `Guess number between ${low} to ${high}`

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


function guessTheNumber() {
    const correcr_ans = getRandomIntInclusive(1, 10);
    let attempts = 3;
    let message;

    alert(`Welcome to the Guess the Number Game!\nI'm thinking of a number between ${low} and ${high}.`);


    while (attempts > 0) {
        message = "You have " + attempts + " attempts left.\nEnter your guess:";
        let guess = parseInt(prompt(message));

        if (guess === correcr_ans) {
            alert("Congratulations! You Win.");
            return;
        } else if (guess < correcr_ans) {
            alert("Correct answer is greater!");
        } else {
            alert("Correct answer is smaller!");
        }

        attempts--;
    }


    alert("You lose! The correct number was: " + correcr_ans);
}

// guessTheNumber();
restartBtn.addEventListener('click', guessTheNumber)


