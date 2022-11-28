dictionary = new Dictionary();

let sixLetterWords = dictionary.getSixLetterWords();

for (let i=0; i<sixLetterWords.length; i++) {
    let result = '';
    let wordArray = dictionary.getValidWordArray(sixLetterWords[i]);
    if (wordArray.length > 7 && wordArray.length < 29) {
        result += '"' + sixLetterWords[i] + '",<br>';
    }

    document.getElementById('test').innerHTML += result;
}