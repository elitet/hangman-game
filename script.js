const word           = document.getElementById('hangmanWord')
const tip            = document.getElementById('hangmanTip')
const btnStart       = document.querySelector('.btn-comecar')

const inicio         = document.querySelector('.secao-inicio')
const game           = document.querySelector('.secao-game')
const gameWord       = document.querySelector('.hangman-word')
const lettersDisplay = document.querySelector('.played-letters')
const tipEl          = document.querySelector('.tip')
const ccount         = document.querySelector('.ccount')
const ecount         = document.querySelector('.ecount')

const winModalEl     = document.getElementById('myModal')
const winModal       = new bootstrap.Modal(document.getElementById('myModal'), {})

let hangmanWord      = []
let playedLetters    = []
let gameStarted      = false
let rigths           = 0
let wrongs           = 0
let rigthsToWin      = 0

countLetters = () => {
    let displayCounter = document.getElementById('countLetter')

    displayCounter.innerHTML = word.value.length

}

word.addEventListener('keyup', countLetters);

startGame = () => {

    gameStarted = true

    hangmanWord = word.value.toUpperCase().match(/[\w]/g)

    rigthsToWin = Array.from(new Set(hangmanWord)).length

    inicio.style.display    = 'none'
    game.style.display      = 'flex'

    tipEl.textContent = tip.value

    hangmanWord.forEach(letter => {
        gameWord.innerHTML += `<div class="hangman-word-letter">
                                    <span class="hangman-word-letter-letter"></span>
                                </div>`
    })

}

btnStart.addEventListener('click', startGame)


verifyLetter = (letter) => {

    let haveInWord          = hangmanWord.filter(l => l == letter).length
    let havePlayedLetter    = playedLetters.filter(l => l.letter == letter).length

    if(havePlayedLetter == 0) {

        if(haveInWord > 0){

            playedLetters.push({'letter': letter, 'have': true})

            rigths++

            hangmanWord.forEach((wletter,i) => {
                if(wletter == letter){
                    console.log(i)
                    gameWord.querySelectorAll('div')[i].childNodes[1].innerHTML = wletter
                }
            })

        }else{
            playedLetters.push({'letter': letter, 'have': false})
            wrongs++
        }

        lettersDisplay.innerHTML = ''
        playedLetters.forEach(l => {
            if(l.have)
                lettersDisplay.innerHTML += `<span class="mx-1 text-success">${l.letter}</span>`
            else
            lettersDisplay.innerHTML += `<span class="mx-1">${l.letter}</span>`
        })

        ccount.innerHTML = rigths
        ecount.innerHTML = wrongs

        if(rigths >= rigthsToWin){
            gameStarted = false

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você <span class="text-success fw-bold">acertou</span> a palavra <span class= "fw-bold">'${word.value}'</span>.</p>
                <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${rigths}</span></p>
                <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${wrongs}</span></p>`

            winModal.show()
        }else if(wrongs >= 10){
            gameStarted = false

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você <span class="text-danger fw-bold">perdeu</span> a palavra correta era <span class= "fw-bold">'${word.value}'</span>.</p>
                <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${rigths}</span></p>
                <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${wrongs}</span></p>`

            winModal.show()
        }

    }

}

document.addEventListener ('keypress', (event) => {
    const keyName = event.key;
    
    if(gameStarted){
        verifyLetter(keyName.toUpperCase())
    }else{
        if(event.code == 'NumpadEnter' || event.code == 'Enter') 
            startGame()
    }

  });

  winModalEl.addEventListener('hide.bs.modal', () => {

    word.value = ''
    tip.value = ''
    document.getElementById('countLetter').innerHTML = 0

    inicio.style.display    = 'flex'
    game.style.display      = 'none'

    hangmanWord      = []
    playedLetters    = []
    rigths           = 0
    wrongs           = 0
    rigthsToWin      = 0

    gameWord.innerHTML = ''
    lettersDisplay.innerHTML = ''
    ccount.innerHTML = 0
    ecount.innerHTML = 0

  })
