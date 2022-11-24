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
        let word = document.getElementById("usedLetterRow1").innerHTML + document.getElementById("usedLetterRow2").innerHTML + document.getElementById("usedLetterRow3").innerHTML
        + document.getElementById("usedLetterRow4").innerHTML + document.getElementById("usedLetterRow5").innerHTML + document.getElementById("usedLetterRow6").innerHTML;

        let index = this.answerArray.indexOf(word);

        if (index >= 0) {
            this.revealWord(index);
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
            document.getElementById("unusedLetterRow" + (i+1).toString()).innerHTML = currentLetter;
        }
    }

    // #populateAnswerTable() { old way using the map saving just in case
    //     let keys = Array.from(this.answerMap.keys());
    //     for (let i=0; i<keys.length; i++) {
    //         let currentKey = keys[i];
    //         let currentValues = this.answerMap.get(currentKey);
    //         for (let j=0; j<currentValues.length; j++) {
    //             let currentWord = currentValues[j];

    //             // document.getElementById(currentKey.toString()).innerHTML += '<td id=\"' + currentWord + '\">' + currentWord + '</td>';
    //             document.getElementById(currentKey.toString()).innerHTML += '<td id=\"' + currentWord + '\">' + this.#buildBlankHTML(currentWord.length) + '</td>';
    //         }
    //     }
    // }

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
    console.log("new game");
    whomp.newGame();
}

function scramble() {
    console.log("Scramble");
    whomp.scramble();
}

function addLetter(field, index) {
    console.log("addLetter");
    whomp.addLetter(field, index);
}

function putLetterBack() {
    console.log("putletterback");
    whomp.putLetterBack();
}

function submit() {
    console.log("submit");
    whomp.submit();
}

function giveUp() {
    console.log("give up");
    whomp.giveUp();
}
