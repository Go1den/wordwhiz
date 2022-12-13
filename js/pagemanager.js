class PageManager {
    constructor() {

    };

    setDisplayOfElements(selectorValue, displayValue) {
        let elements = document.querySelectorAll(selectorValue);
        elements.forEach(el => {
            el.style.display = displayValue;
        });
    }

    turnOffWelcomeScreenElements() {
        this.setDisplayOfElements('.onAtStartOnly', 'none');
    }

    turnOnGameElements() {
        this.setDisplayOfElements('.offAtStart', 'initial');
    }

    addBorderedClass() {
        let gameElements = document.querySelectorAll('.toBeBordered');
        gameElements.forEach(el => {
            el.classList.add("bordered");
        });
    }

    displayInBetweenRoundsElements() {
        this.setDisplayOfElements('.showOnNextRoundOnly', 'inline');
    }

    hideInBetweenRoundsElements() {
        this.setDisplayOfElements('.showOnNextRoundOnly', 'none');
    }
    
    displayInBetweenGamesElements() {
        this.setDisplayOfElements('.newGame', '');
    }

    hideInBetweenGamesElements() {
        this.setDisplayOfElements('.gameButtons', 'none');
    }

    hideNewGameButton() {
        this.setDisplayOfElements('.newGame', 'none');
    }

    displayNextRoundButton() {
        this.setDisplayOfElements('.round', 'table');
    }

    hideNextRoundButton() {
        this.setDisplayOfElements('.round', 'none');
    }

    clearAllTables() {
        for(let i=1; i<29; i++) {
            document.getElementById("answer" + i.toString()).innerHTML = '';
            document.getElementById("answer" + i.toString()).style.backgroundColor = '';
        }
        for(let i=1; i<7; i++) {
            document.getElementById("usedLetterRow" + i.toString()).innerHTML = '';
            document.getElementById("unusedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    clearUsedLetterRow() {
        for(let i=1; i<7; i++) {
            document.getElementById("usedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    populateAnswerTable(answerArray) {
        for (let i=0; i<answerArray.length; i++) {
            let currentWord = answerArray[i];
            document.getElementById("answer" + (i+1).toString()).innerHTML += this.#buildBlankHTML(currentWord.length);
        }
    }

    populateUnusedLetterTable(scrambledLetters) {
        for (let i=0; i<scrambledLetters.length; i++) {
            let currentLetter = scrambledLetters[i];
            document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = '<image src=\"images/tiles/' + currentLetter +'.png\"/>';
        }
    }

    #buildBlankHTML(lettersInWord) {
        let result = '';
        for(let i=0; i<lettersInWord; i++) {
            result += '<image src=\"images/tiles/blank.png\" width=30px; height=30px;/>';
        }
        return result;
    }

    updateDefinition(definition) {
        document.getElementById("definitionText").innerHTML = definition;
        document.getElementById("definitionText").scrollTop = 0;
    }

    showDefinition() {
        document.getElementById("definition").style.display = 'initial';
    }

    hideDefinition() {
        document.getElementById("definitionText").innerHTML = '';
        document.getElementById("definition").style.display = 'none';
    }

    hideGuessAndTiles() {
        document.getElementById("usedLetterRow").style.display = 'none';
        document.getElementById("unusedLetterRow").style.display = 'none';
    }

    setScore(score) {
        document.getElementById("score").innerHTML = '<strong>' + score + '</strong>';
    }

    setRound(round) {
        document.getElementById("round").innerHTML = '<strong>' + round + '</strong>';
    }

    setMode(mode) {
        document.getElementById("mode").innerHTML = '<strong>' + mode + '</strong>';
    }
}