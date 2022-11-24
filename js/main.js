let dictionary = new Dictionary();
let soundboard = new Soundboard();
let whomp = new Whomp(dictionary, soundboard);

function newGame(e) {
    whomp.newGame();
    e.blur();
}

function scramble(e) {
    if (whomp.getIsGameGoing()) {
        whomp.scramble(true);
    }
    e.blur();
}

function addLetter(field, index) {
    if (whomp.getIsGameGoing()) {
        whomp.addLetter(field, index);
    }
}

function putLetterBack(e) {
    if (whomp.getIsGameGoing()) {
        whomp.putLetterBack();
    }
    e.blur();
}

function submit(e) {
    if (whomp.getIsGameGoing()) {
        whomp.submit();
    }
    e.blur();
}

function giveUp(e) {
    if (whomp.getIsGameGoing()) {
        whomp.giveUp();
    }
    e.blur();
}

document.addEventListener("keydown", function(event) {
    if (whomp.getIsGameGoing()) {
        if (event.key === "Backspace") {
            whomp.putLetterBack();
        } else if (event.key === "Enter") {
            whomp.submit();
        } else if (event.code.startsWith("Key") && event.code.length == 4) {
            let charCode = event.code.charCodeAt(3);
            if (charCode >= 65 && charCode <= 90) {
                whomp.typeLetter(event.code.charAt(3));
            }
        }
    }
});