const word = document.getElementById('form_input_word')
const numberOfLifes = document.getElementById('form_input_lifes')
const startButton = document.querySelector('.start_button')
const alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я']
const dashword = document.querySelector('.word')

function addLifes() {
    for(let i = 1; i <= numberOfLifes.value; i++){
        document.querySelector('.lives_row').insertAdjacentHTML('afterbegin',
            `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red"><path fill="none" d="M0 0h24v24H0z"></path><path stroke="#000" stroke-width="2" d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
            `
        )
    }
}

function addLetters(){
    for(let index = 0; index < alphabet.length; index++) {
        document.querySelector('.letters_row').insertAdjacentHTML('beforeend', 
            `<div class="letter">${alphabet[index]}</div>`
        )
    }
}

function addword() {
    const inputWord = word.value
    const dashedWord = inputWord.replace(/\S/g, '-')
    dashword.textContent = dashedWord
}


startButton.addEventListener('click', (event) => {
    event.preventDefault()
    document.querySelector('.form').style.display = 'none'
    document.querySelector('.game_block').style.display = 'flex'
    document.querySelector('.back_button').style.display = 'flex'
    addLifes()
    addLetters()
    addword()
    document.querySelectorAll('.letter').forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault()
            const guessedLetter = element.textContent.toLowerCase()
            const wordToGuess = word.value.toLowerCase()
            let dashWord = dashword.textContent
            let updatedDashWord = ''
            let correctGuess = false

            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === guessedLetter) {
                    updatedDashWord += guessedLetter
                    correctGuess = true
                } else {
                    updatedDashWord += dashWord[i]

                }
            }

            dashword.textContent = updatedDashWord
            console.log(element.textContent)
            element.style.pointerEvents = 'none'
            element.style.backgroundColor = '#dbdbd1'
            element.style.borderColor = '#b8b6ac'

            if (!correctGuess) {
                const lettersRow = document.querySelector('.lives_row');
                const lastLetterElement = lettersRow.lastElementChild;
                if (lastLetterElement) {
                    lastLetterElement.remove();
                }
            }
        })
    })
})

document.querySelector('.back_button').addEventListener('click', (event) => {
    event.preventDefault()
    location.reload()
})
