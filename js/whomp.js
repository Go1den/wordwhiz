class Whomp {

    constructor(dictionary) {
        this.seedWord = dictionary.getRandomSixLetterWord();
        this.letters = this.seedWord.split('');
        console.log(this.letters);
        this.answerMap = dictionary.getValidWordMap(this.seedWord);
        this.answerArray = dictionary.getValidWordArray(this.seedWord);
        console.log(this.answerMap);
        this.#clearAnswerTable();
        this.#populateAnswerTable();
    }

    #clearAnswerTable() {
        document.getElementById("3").innerHTML = '';
        document.getElementById("4").innerHTML = '';
        document.getElementById("5").innerHTML = '';
        document.getElementById("6").innerHTML = '';
    }

    #populateAnswerTable() { 
        let keys = Array.from(this.answerMap.keys());
        for (let i=0; i<keys.length; i++) {
            let currentKey = keys[i];
            let currentValues = this.answerMap.get(currentKey);
            for (let j=0; j<currentValues.length; j++) {
                let currentWord = currentValues[j];

                // document.getElementById(currentKey.toString()).innerHTML += '<td id=\"' + currentWord + '\">' + currentWord + '</td>';
                document.getElementById(currentKey.toString()).innerHTML += '<td id=\"' + currentWord + '\">' + this.#buildBlankHTML(currentWord.length) + '</td>';
            }
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

function newGame() {
    let whomp = new Whomp(dictionary);
}
