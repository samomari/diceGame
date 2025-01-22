const Dice = require('./Dice');
const FairRandomGenerator = require('./FairRandomGenerator');
const UserInput = require('./UserInput');

class Game {
    constructor(diceConfigs) {
        this.dice = diceConfigs.map(config => new Dice(config));
        this.fairRandomGenerator = new FairRandomGenerator();
    }

    async determineFirstMove() {
        console.log("Let's determine who makes the first move.");
        const { randomNumber, hmac } = this.fairRandomGenerator.generateHMACRandom(2);
        console.log(`I selected a random value in the range 0..1 \n(HMAC=${hmac})`);
        console.log("Try to guess my selection.");
        console.log("0 - 0\n1 - 1\nX - exit\n? - help");
    
        const userSelection = await UserInput.getInput(0, 1, "Your selection: ", this.dice);
        console.log(`My selection: ${randomNumber}`);
        this.fairRandomGenerator.showFairnessProof();
    
        return userSelection === randomNumber ? 'user' : 'computer';
    }

    async chooseDice(player, availableDice) {
        console.log(`${player === 'user' ? 'Your' : 'My'} turn to choose dice.`);
        availableDice.forEach((dice, index) => {
            console.log(`${index} - ${dice.sides.join(', ')}`);
        });
        console.log("X - exit\n? - help");
    
        const selection = await UserInput.getInput(0, availableDice.length - 1, "Your selection: ", this.dice);
        console.log(`${player === 'user' ? 'You chose' : 'I chose'} the [${availableDice[selection].sides.join(', ')}] dice.`);
        return availableDice[selection];
    }

    async makeThrow(player, dice) {
        console.log(`It's time for ${player === 'user' ? 'your' : 'my'} throw.`);
        const { randomNumber, hmac } = this.fairRandomGenerator.generateHMACRandom(6);
        console.log(`I selected a random value in the range 0..5 \n(HMAC=${hmac})`);
        console.log("Add your number modulo 6:");
        console.log("0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help");
    
        const userSelection = await UserInput.getInput(0, 5, "Your selection: ", this.dice);
        console.log(`My number is ${randomNumber}`);
        this.fairRandomGenerator.showFairnessProof();

        const userDiceValue = dice.sides[userSelection];
        const result = (randomNumber + userSelection) % 6;
        
        console.log(`The result is ${randomNumber} + ${userSelection} = ${result} (mod 6).`);
        return userDiceValue;
    }
    
    determineWinner(userThrowResult, computerThrowResult) {
        if (userThrowResult > computerThrowResult) {
            console.log(`You win (${userThrowResult} > ${computerThrowResult})!`);
        } else if (computerThrowResult > userThrowResult) {
            console.log(`I win (${computerThrowResult} > ${userThrowResult})!`);
        } else {
            console.log("It's a tie!");
        }
    }
    

    async play() {
        const firstMove = await this.determineFirstMove();
        let availableDice = [...this.dice];
        let userDice, computerDice;
    
        const handleTurn = async (firstPlayer, secondPlayer, firstDice, secondDice) => {
            const firstPlayerThrowResult = await this.makeThrow(firstPlayer, firstDice);
            console.log(`${firstPlayer === 'user' ? 'Your' : 'My'} throw is: ${firstPlayerThrowResult}`);
    
            const secondPlayerThrowResult = await this.makeThrow(secondPlayer, secondDice);
            console.log(`${secondPlayer === 'user' ? 'Your' : 'My'} throw is: ${secondPlayerThrowResult}`);
    
            this.determineWinner(firstPlayerThrowResult, secondPlayerThrowResult);
        };
    
        if (firstMove === 'user') {
            userDice = await this.chooseDice('user', availableDice);
            availableDice = availableDice.filter(dice => dice !== userDice);
            computerDice = availableDice[Math.floor(Math.random() * availableDice.length)];
            console.log(`I choose the [${computerDice.sides.join(', ')}] dice.`);
    
            await handleTurn('user', 'computer', userDice, computerDice);
        }
    
        if (firstMove === 'computer') {
            computerDice = availableDice[Math.floor(Math.random() * availableDice.length)];
            availableDice = availableDice.filter(dice => dice !== computerDice);
            console.log(`I make the first move and choose the [${computerDice.sides.join(', ')}] dice.`);
            userDice = await this.chooseDice('user', availableDice);
    
            await handleTurn('computer', 'user', computerDice, userDice);
        }
    }
}

module.exports = Game;