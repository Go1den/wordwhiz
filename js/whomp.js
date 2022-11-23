class Whomp {

    dictionary;
    seedWord;
    upperCaseSeedWord;
    letters;
    answerMap;
    answerArray;

    constructor(dictionary) {
        this.dictionary = dictionary;
        this.newGame();
    }

    newGame() {
        this.seedWord = dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = dictionary.getValidWordMap(this.seedWord);
        this.answerArray = dictionary.getValidWordArray(this.seedWord);
        console.log(this.letters);
        console.log(this.answerMap);
        console.log(this.answerArray);
        this.letters = this.upperCaseSeedWord.split('');
        this.#clearAllTables();
        this.#populateAnswerTable();
        this.scramble();
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
    console.log("new gmae");
    whomp.newGame();
}

function scramble() {
    console.log("Scramb");
    whomp.scramble();
}
