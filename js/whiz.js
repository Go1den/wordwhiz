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
    totalRoundPoints;
    roundThresholdPoints;
    lastSubmittedGuess = '';

    constructor() {
        this.dictionary = new Dictionary();
        this.soundboard = new Soundboard();
        this.timer = new Timer(150, this);
        this.pageManager = new PageManager();
    }

    newGame() {
        this.isGameGoing = true;
        this.usedLetterIndex = 1;
        this.lastSubmittedGuess = '';
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
        this.setTotalPossibleRoundPoints();
        this.setRoundThreshold();
        this.setThreshold();
        this.pageManager.turnOffWelcomeScreenElements();
        this.pageManager.addBorderedClass();
        this.pageManager.turnOnGameElements();
        this.pageManager.hideDefinition();
        this.soundboard.playSound("thinkSound" + this.round.toString(), 0.1);
        this.timer.setTimer(150);
        this.timer.startTimer();
    }

    setRoundThreshold() {
        this.roundThresholdPoints = Math.floor(this.totalRoundPoints * (.65 + (.05 * this.round)));
        if (this.roundThresholdPoints > this.totalRoundPoints) {
            this.roundThresholdPoints = this.totalRoundPoints;
        } 
    }

    setTotalPossibleRoundPoints() {
        let total = 0;
        for (let i=0; i<this.answerArray.length; i++) {
            let wordScore = Math.pow(2, this.answerArray[i].length - 3) * 50;
            total += wordScore;
        }
        this.totalRoundPoints = total;
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
        this.pageManager.showDefinition();
        this.pageManager.hideGuessAndTiles();
        this.pageManager.displayInBetweenGamesElements();
        this.pageManager.hideInBetweenGamesElements();
        if (isGameOver && this.roundThresholdPoints > 0) {
            this.soundboard.playSound("gameOverSound", .1);
        }
        else {
            if (!isGameOver) {
                this.scoreWord(1000);
            }
            this.pageManager.hideNewGameButton();
            this.pageManager.displayNextRoundButton();
            this.soundboard.playSound("clearSound", .1);
        }
    }

    nextRound() {
        this.round++;
        this.setRound();
        this.lastSubmittedGuess = '';
        this.usedLetterIndex = 1;
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
        this.setTotalPossibleRoundPoints();
        this.setRoundThreshold();
        this.setThreshold();
        this.pageManager.hideNextRoundButton();
        this.pageManager.turnOffWelcomeScreenElements();
        this.pageManager.addBorderedClass();
        this.pageManager.turnOnGameElements();
        this.pageManager.hideDefinition();
        if (this.round > 8) {
            this.soundboard.playSound("thinkSound8", 0.1);
        } else {
            this.soundboard.playSound("thinkSound" + this.round.toString(), 0.1);
        }
        if (this.round > 7) {
            this.timer.setTimer(120);
        } else {
            this.timer.setTimer(150);
        }
        this.timer.startTimer();
    }

    scoreWord(points) {
        this.score += points;
        this.setScore();
        this.roundThresholdPoints -= points;
        this.setThreshold();
    }

    setThreshold() {
        if (this.roundThresholdPoints > 0) {
            document.getElementById("threshold").innerHTML = '<strong>' + this.roundThresholdPoints + '</strong>';
        } else {
            document.getElementById("threshold").innerHTML = '<strong>' + 'Clear!' + '</strong>';
        }
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

        if (word.length > 0) {
            this.lastSubmittedGuess = word;
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

    putSelectedLetterBack(index) {
        if (this.usedLetterIndex > index) {
            let originalPosition = this.originalPositionArray[index-1];
            this.originalPositionArray.splice(index-1, 1);
            let letterToBeRemoved = document.getElementById("usedLetterRow" + index.toString()).innerHTML;
            document.getElementById("usedLetterRow" + index.toString()).innerHTML = '';
            document.getElementById("unusedLetterRow" + originalPosition.toString()).innerHTML = letterToBeRemoved;
            this.usedLetterIndex--;

            for (let i=index; i<6; i++) {
                let nextLetter = document.getElementById("usedLetterRow" + (i+1).toString()).innerHTML;
                document.getElementById("usedLetterRow" + i.toString()).innerHTML = nextLetter;
                document.getElementById("usedLetterRow" + (i+1).toString()).innerHTML = '';
            }
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
        if (this.isGameGoing) {
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
            this.originalPositionArray = [];
            if (playSound) {
                this.soundboard.playSound("shuffleSound", 0.4);
            }
        }
    }

    processEnter() {
        if (this.usedLetterIndex > 1) {
            whiz.submit();
        } else {
            if (this.lastSubmittedGuess !== '' && this.usedLetterIndex === 1) {
                for (let i=0; i<this.lastSubmittedGuess.length; i++) {
                    this.typeLetter(this.lastSubmittedGuess.charAt(i));
                }
            }
        }
    }

    typePreviouslyFoundWord(index) {
        let selectedWord = this.answerArray[index-1];
        if (this.foundWords.indexOf(selectedWord) >= 0) {
            do {
                this.putLetterBack();
            } while (this.usedLetterIndex > 1);
            for (let i=0; i<selectedWord.length; i++) {
                this.typeLetter(selectedWord.charAt(i));
            }
        }
    }

    hideDefinition() {
        this.pageManager.hideDefinition();
    }

    async updateDefinition(index) {
        if (index <= this.answerArray.length) {
            let word = this.answerArray[index-1];
            let result = await this.dictionary.lookup(word);
            this.pageManager.updateDefinition(result);
        }
    }
}