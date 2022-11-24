class Whomp {

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


    constructor(dictionary, soundboard) {
        this.dictionary = dictionary;
        this.soundboard = soundboard;
    }

    newGame() {
        this.isGameGoing = true;
        this.score = 0;
        this.foundWords = new Array();
        this.seedWord = dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = dictionary.getValidWordMap(this.seedWord);
        this.answerArray = dictionary.getValidWordArray(this.seedWord);
        this.originalPositionArray = [];
        this.letters = this.upperCaseSeedWord.split('');
        this.#clearAllTables();
        this.#populateAnswerTable();
        this.scramble(false);
        this.soundboard.playSound("thinkSound", 0.1);
    }

    getIsGameGoing() {
        return this.isGameGoing;
    }

    giveUp() {
        for (let i=0; i<this.answerArray.length; i++) {
            this.revealWord(i);
        }
        this.isGameGoing = false;
    }

    scoreWord(points) {
        this.score += points;
        document.getElementById("score").innerHTML = this.score;
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
            this.revealWord(answerArrayIndex);
            this.scoreWord(word.length);
            this.foundWords.push(word);
            this.soundboard.playSound("correctSound", 1);
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

    revealWord(index) {
        let word = this.answerArray[index];
        let charArray = word.split('');
        let newInnerHTML = '';
        for(let i=0; i<charArray.length; i++) {
            let letter = charArray[i];
            newInnerHTML += '<image src=\"images/tiles/' + letter + '.png\" width=30px; height=30px;/>';
        }
        document.getElementById("answer" + (index+1).toString()).innerHTML = newInnerHTML;
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
        console.log("put letter back");
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
        console.log("Scramble");
        let tempArray = [...this.letters];
        let currentIndex = tempArray.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [tempArray[currentIndex], tempArray[randomIndex]] = [tempArray[randomIndex], tempArray[currentIndex]];
        }
        this.scrambledLetters = tempArray;
        this.#clearUsedLetterRow();
        this.#populateUnusedLetterTable();
        this.usedLetterIndex = 1;
        if (playSound) {
            this.soundboard.playSound("shuffleSound", 1);
        }
    }

    #clearAllTables() {
        for(let i=1; i<29; i++) {
            document.getElementById("answer" + i.toString()).innerHTML = '';
        }
        for(let i=1; i<7; i++) {
            document.getElementById("usedLetterRow" + i.toString()).innerHTML = '';
            document.getElementById("unusedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    #clearUsedLetterRow() {
        for(let i=1; i<7; i++) {
            document.getElementById("usedLetterRow" + i.toString()).innerHTML = '';
        }
    }

    #populateAnswerTable() {
        for (let i=0; i<this.answerArray.length; i++) {
            let currentWord = this.answerArray[i];
            document.getElementById("answer" + (i+1).toString()).innerHTML += this.#buildBlankHTML(currentWord.length);
        }
    }

    #populateUnusedLetterTable() {
        for (let i=0; i<this.scrambledLetters.length; i++) {
            let currentLetter = this.scrambledLetters[i];
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
}