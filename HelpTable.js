const Table = require('cli-table3');
const ProbabilityCalculator = require('./ProbabilityCalculator');

class HelpTable {
    constructor(diceConfigs) {
        this.diceConfigs = diceConfigs;
    }

    display() {
        console.log("This table represents the probability of the user winning against each possible opponent's dice configuration.");

        const table = new Table({
            head: ['User dice', ...this.diceConfigs.map((_, index) => `${this.diceConfigs[index].join(', ')}`)], 
            colWidths: [20, ...this.diceConfigs.map(() => 20)],  
            style: { head: ['cyan'], border: ['grey'] }
        });

        this.diceConfigs.forEach((userDice, i) => {
            const row = [`${userDice.join(', ')}`]; 
            this.diceConfigs.forEach((opponentDice, j) => {
                if (i === j) {
                    row.push('-');
                } else {
                    const probability = ProbabilityCalculator.calculate(opponentDice, userDice).toFixed(4);
                    row.push(probability);
                }
            });
            table.push(row);
        });

        console.log(table.toString());
    }
}

module.exports = HelpTable;