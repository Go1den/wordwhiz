class Whiz {

    dictionary;
    seedWord;
    upperCaseSeedWord;
    letters;
    answerMap;
    answerArray;
    usedLetterIndex = 1;
    originalPositionArray;
    score;
    foundWords = new Array();
    soundboard;
    isGameGoing = false;
    timer;
    round;
    pageManager;


    constructor() {
        this.dictionary = new Dictionary();
        this.soundboard = new Soundboard();
        this.timer = new Timer(150, this);
        this.pageManager = new PageManager();
    }

    newGame() {
        this.isGameGoing = true;
        this.round = 1;
        this.setRound();
        this.score = 0;
        this.setScore();
        this.foundWords = new Array();
        this.seedWord = this.dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = this.dictionary.getValidWordMap(this.seedWord);
        this.answerArray = this.dictionary.getValidWordArray(this.seedWord);
        this.originalPositionArray = [];
        this.letters = this.upperCaseSeedWord.split('');
        this.pageManager.clearAllTables();
        this.pageManager.populateAnswerTable(this.answerArray);
        this.scramble(false);
        this.pageManager.turnOffWelcomeScreenElements();
        this.pageManager.addBorderedClass();
        this.pageManager.turnOnGameElements();
        this.soundboard.playSound("thinkSound" + this.round.toString(), 0.1);
        this.timer.setTimer(150);
        this.timer.startTimer();
    }

    getIsGameGoing() {
        return this.isGameGoing;
    }

    giveUp() {
        for (let i=0; i<this.answerArray.length; i++) {
            if (this.foundWords.indexOf(this.answerArray[i]) < 0) {
                this.revealWord(i, '#580808');
            }
        }
        this.#endRound(true);
    }

    #endRound(isGameOver) {
        this.isGameGoing = false;
        this.timer.stopTimer();
        this.soundboard.stopMusic();
        this.pageManager.displayInBetweenGamesElements();
        this.pageManager.hideInBetweenGamesElements();
        if (isGameOver) {
            this.soundboard.playSound("gameOverSound", .1);
        }
        else {
            this.pageManager.hideNewGameButton();
            this.pageManager.displayNextRoundButton();
            this.soundboard.playSound("clearSound", .1);
        }
    }

    nextRound() {
        this.round++;
        this.setRound();
        this.isGameGoing = true;
        this.foundWords = new Array();
        this.seedWord = this.dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = this.dictionary.getValidWordMap(this.seedWord);
        this.answerArray = this.dictionary.getValidWordArray(this.seedWord);
        this.originalPositionArray = [];
        this.letters = this.upperCaseSeedWord.split('');
        this.pageManager.clearAllTables();
        this.pageManager.hideInBetweenRoundsElements();
        this.pageManager.populateAnswerTable(this.answerArray);
        this.scramble(false);
        this.pageManager.hideNextRoundButton();
        this.pageManager.turnOffWelcomeScreenElements();
        this.pageManager.addBorderedClass();
        this.pageManager.turnOnGameElements();
        if (this.round > 8) {
            this.soundboard.playSound("thinkSound8", 0.1);
        } else {
            this.soundboard.playSound("thinkSound" + this.round.toString(), 0.1);
        }
        this.timer.setTimer(150);
        this.timer.startTimer();
    }

    scoreWord(points) {
        this.score += points;
        this.setScore();
    }

    setScore() {
        document.getElementById("score").innerHTML = '<strong>' + this.score + '</strong>';
    }

    setRound() {
        document.getElementById("round").innerHTML = '<strong>' + this.round + '</strong>';
    }

    submit() {
        let word = '';
        let moreLetters = true;
        let index=1;
        do {
            let nextLetter = document.getElementById("usedLetterRow" + index.toString()).innerHTML[23];
            if (nextLetter !== undefined) {
                word += nextLetter;
                index++;
            } else {
                moreLetters = false;
            }
        } while (moreLetters && index <= 6);
    
        let answerArrayIndex = this.answerArray.indexOf(word);
        let foundWordsIndex = this.foundWords.indexOf(word);

        if (answerArrayIndex >= 0 && foundWordsIndex < 0) {
            this.revealWord(answerArrayIndex, '#4CAF50');
            this.scoreWord(Math.pow(2, word.length - 3) * 50);
            this.foundWords.push(word);
            if (this.foundWords.length === this.answerArray.length) {
                this.#endRound(false);
            } else {
                this.soundboard.playSound("correctSound", 0.5);
            }
        } else {
            this.soundboard.playSound("wrongSound", 1);
        }
        for (let i=0; i<word.length; i++) {
            this.putLetterBack();
        }
        return;
    }

    typeLetter(letter) {
        for (let i=0; i<this.scrambledLetters.length; i++) {
            let field = "unusedLetterRow"+ (i+1).toString();
            if (this.scrambledLetters[i] === letter && document.getElementById(field).innerHTML !== undefined && document.getElementById(field).innerHTML.length > 0) {
                addLetter(field, i+1);
                break;
            }
        }
    }

    revealWord(index, color) {
        let word = this.answerArray[index];
        let charArray = word.split('');
        let newInnerHTML = '';
        for(let i=0; i<charArray.length; i++) {
            let letter = charArray[i];
            newInnerHTML += '<image src=\"images/tiles/' + letter + '.png\" width=30px; height=30px;/>';
        }
        document.getElementById("answer" + (index+1).toString()).innerHTML = newInnerHTML;
        document.getElementById("answer" + (index+1).toString()).style.backgroundColor = color;
    }

    addLetter(field, index) {
        let letterToBeAdded = document.getElementById(field).innerHTML;
        if (this.usedLetterIndex < 7 && letterToBeAdded !== '' && letterToBeAdded !== undefined) {
            document.getElementById("usedLetterRow" + this.usedLetterIndex.toString()).innerHTML = letterToBeAdded;
            document.getElementById(field).innerHTML = '';
            this.originalPositionArray.push(index);
            this.usedLetterIndex++;
        }
    }

    putLetterBack() {
        if (this.usedLetterIndex > 1) {
            let index = this.originalPositionArray.pop();
            let letterToBeRemoved = document.getElementById("usedLetterRow" + (this.usedLetterIndex - 1).toString()).innerHTML;
            document.getElementById("usedLetterRow" + (this.usedLetterIndex - 1).toString()).innerHTML = '';
            document.getElementById("unusedLetterRow" + index.toString()).innerHTML = letterToBeRemoved;
            this.usedLetterIndex--;
        } 
        return;
    }

    scramble(playSound) {
        let tempArray = [...this.letters];
        let currentIndex = tempArray.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [tempArray[currentIndex], tempArray[randomIndex]] = [tempArray[randomIndex], tempArray[currentIndex]];
        }
        this.scrambledLetters = tempArray;
        this.pageManager.clearUsedLetterRow();
        this.pageManager.populateUnusedLetterTable(this.scrambledLetters);
        this.usedLetterIndex = 1;
        if (playSound) {
            this.soundboard.playSound("shuffleSound", 0.4);
        }
    }
}