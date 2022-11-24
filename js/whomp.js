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


    constructor(dictionary) {
        this.dictionary = dictionary;
        this.newGame();
    }

    newGame() {
        this.score = 0;
        this.seedWord = dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = dictionary.getValidWordMap(this.seedWord);
        this.answerArray = dictionary.getValidWordArray(this.seedWord);
        this.originalPositionArray = [];
        console.log(this.letters);
        console.log(this.answerMap);
        console.log(this.answerArray);
        this.letters = this.upperCaseSeedWord.split('');
        this.#clearAllTables();
        this.#populateAnswerTable();
        this.scramble();
    }

    giveUp() {
        for (let i=0; i<this.answerArray.length; i++) {
            this.revealWord(i);
        }
    }

    scoreWord(points) {
        this.score += points;
        console.log(score);
        document.getElementById("score").innerHTML = this.score;
    }

    submit() {
        let word = '';
        let moreLetters = true;
        let index=1;
        do {
            let nextLetter = document.getElementById("usedLetterRow" + index.toString()).innerHTML[26];
            console.log(nextLetter);
            if (nextLetter !== undefined) {
                word += nextLetter;
                index++;
            } else {
                moreLetters = false;
            }
        } while (moreLetters && index <= 6);
    
        let answerArrayIndex = this.answerArray.indexOf(word);

        if (answerArrayIndex >= 0) {
            this.revealWord(answerArrayIndex);
            this.scoreWord(word.length);
        }
        for (let i=0; i<word.length; i++) {
            this.putLetterBack();
        }
    }

    revealWord(index) {
        let word = this.answerArray[index];
        document.getElementById("answer" + (index+1).toString()).innerHTML = word;
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
            console.log(this.originalPositionArray);
            let index = this.originalPositionArray.pop();
            let letterToBeRemoved = document.getElementById("usedLetterRow" + (this.usedLetterIndex - 1).toString()).innerHTML;
            document.getElementById("usedLetterRow" + (this.usedLetterIndex - 1).toString()).innerHTML = '';
            document.getElementById("unusedLetterRow" + index.toString()).innerHTML = letterToBeRemoved;
            this.usedLetterIndex--;
        }
    }

    scramble() {
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
            document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = '<image src=\"../images/tiles/' + currentLetter +'.png\"/>';
        }
    }

    #buildBlankHTML(lettersInWord) {
        let result = '';
        for(let i=0; i<lettersInWord; i++) {
            result += '<image src=\"../images/blank.png\"/>';
        }
        return result;
    }
}

let dictionary = new Dictionary();
let whomp = new Whomp(dictionary);

function newGame() {
    whomp.newGame();
}

function scramble() {
    whomp.scramble();
}

function addLetter(field, index) {
    whomp.addLetter(field, index);
}

function putLetterBack() {
    whomp.putLetterBack();
}

function submit() {
    whomp.submit();
}

function giveUp() {
    whomp.giveUp();
}
