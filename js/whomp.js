class Whomp {

    constructor(dictionary) {
        this.seedWord = dictionary.getRandomSixLetterWord();
        this.upperCaseSeedWord = this.seedWord.toUpperCase();
        this.letters = this.seedWord.split('');
        this.answerMap = dictionary.getValidWordMap(this.seedWord);
        this.answerArray = dictionary.getValidWordArray(this.seedWord);
        console.log(this.letters);
        console.log(this.answerMap);
        console.log(this.answerArray);
        this.letters = this.upperCaseSeedWord.split('');
        this.scrambledLetters = this.scramble([...this.letters]);
        this.#clearAllTables();
        this.#populateAnswerTable();
        this.#populateUnusedLetterTable();
    }

    scramble(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
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

function newGame() {
    let whomp = new Whomp(dictionary);
}
