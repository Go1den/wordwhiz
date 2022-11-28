class Soundboard {
    correctSound = new Audio("audio/correct.mp3");
    wrongSound = new Audio("audio/wrong.mp3");
    shuffleSound = new Audio("audio/shuffle.mp3");
    thinkSound1 = new Audio("audio/think1.mp3");
    thinkSound2 = new Audio("audio/think2.mp3");
    thinkSound3 = new Audio("audio/think3.mp3");
    thinkSound4 = new Audio("audio/think4.mp3");
    thinkSound5 = new Audio("audio/think5.mp3");
    thinkSound6 = new Audio("audio/think6.mp3");
    thinkSound7 = new Audio("audio/think7.mp3");
    thinkSound8 = new Audio("audio/think8.mp3");
    clearSound = new Audio("audio/clear.mp3");
    gameOverSound = new Audio("audio/gameover.mp3");
    soundMap = new Map();

    constructor () {
        this.soundMap.set("correctSound", this.correctSound);
        this.soundMap.set("wrongSound", this.wrongSound);
        this.soundMap.set("shuffleSound", this.shuffleSound);
        this.soundMap.set("thinkSound1", this.thinkSound1);
        this.soundMap.set("thinkSound2", this.thinkSound2);
        this.soundMap.set("thinkSound3", this.thinkSound3);
        this.soundMap.set("thinkSound4", this.thinkSound4);
        this.soundMap.set("thinkSound5", this.thinkSound5);
        this.soundMap.set("thinkSound6", this.thinkSound6);
        this.soundMap.set("thinkSound7", this.thinkSound7);
        this.soundMap.set("thinkSound8", this.thinkSound8);
        this.soundMap.set("clearSound", this.clearSound);
        this.soundMap.set("gameOverSound", this.gameOverSound);
    }

    playSound(soundName, volume) {
        let targetSound = this.soundMap.get(soundName);
        targetSound.currentTime = 0;
        targetSound.volume = volume;
        targetSound.play();
    }

    stopAllSounds() {
        this.soundMap.forEach((v) => v.pause());
    }

    stopMusic() {
        this.thinkSound1.pause();
        this.thinkSound2.pause();
        this.thinkSound3.pause();
        this.thinkSound4.pause();
        this.thinkSound5.pause();
        this.thinkSound6.pause();
        this.thinkSound7.pause();
        this.thinkSound8.pause();
    }
}