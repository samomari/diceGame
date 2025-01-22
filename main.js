const DiceConfiguration = require('./DiceConfiguration');
const Game = require('./Game');

const args = process.argv.slice(2);

if (args.length < 3) {
    console.error("Error: You must provide at least 3 dice configurations.");
    process.exit(1);
}

try {
    const diceConfig = new DiceConfiguration(args);
    const game = new Game(diceConfig.getDice());
    game.play();
} catch (error) {
    console.error(error.message);
    console.log("Example usage: node main.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
    process.exit(1);
}
