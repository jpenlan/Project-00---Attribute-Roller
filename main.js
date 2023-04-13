const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

/* Defining the player class, including it's name and attributes. 
Attributes are based on the const defaultAttributeScores, and randomly distributed. */
class Player {
    constructor(characterName = 'Naturo') {
        this.name = characterName;
        this.attributes =  {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        let shuffledResult = shuffleArray(defaultAttributeScores);
        for (const [key, value] of Object.entries(this.attributes)) {
            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue; // For every key,value pair, a random value is poppedand added to a random attributeValue.
        }
    }


    rollAttributes() {
        for (const key in this.attributes) {
            let results = diceRoller(4, 6);
            results.sort(function(a, b){return a - b}); // Using a built in anonymous function, the array of numbers is sorted from least to greatest.
            results.shift(); // This removes the lowest dice roll (the first one).
            let sum = sumArrayElements(results); // Sum the rolls.
            this.attributes[key] = sum;
        }
    }

    printPlayer() {
        console.log(`NAME: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)) {
            console.log(`${key.slice(0,3).toUpperCase()}: ${value}`); // By using ` you can print a template literal, which lets you print text inline with variables and expressions.
        }
    }

}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();

function shuffleArray(targetArray) {
    let shuffled = Array.from(targetArray);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, sides) {
    let results = [];
    for (let i = 0; i < times; i++) {
        results.push(Math.floor(Math.random() * sides + 1));
    }
    return results;
}

function sumArrayElements(array) {
    return array.reduce((total, currentNumber) => total + currentNumber);
}