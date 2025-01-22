const readline = require('readline');
const HelpTable = require('./HelpTable');

class UserInput {
    static async getInput(min, max, prompt, diceConfigs) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        const diceSides = diceConfigs.map(dice => dice.sides); 
    
        return new Promise((resolve) => {
            rl.question(prompt, (input) => {
                rl.close();
    
                if (input.toLowerCase() === 'x') {
                    console.log('Exiting...');
                    process.exit();
                }
                if (input.toLowerCase() === '?') {
                    const table = new HelpTable(diceSides);
                    table.display();
    
                    resolve(UserInput.getInput(min, max, prompt, diceConfigs));
                    return;
                }
    
                const selection = parseInt(input, 10);
                if (isNaN(selection) || selection < min || selection > max) {
                    console.error(`Invalid selection. Please choose a number between ${min} and ${max}.`);
                    resolve(UserInput.getInput(min, max, prompt, diceConfigs));
                } else {
                    resolve(selection);
                }
            });
        });
    }
    
}

module.exports = UserInput;