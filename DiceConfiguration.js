class DiceConfiguration {
    constructor(diceStrings) {
        this.dice = this.parseDice(diceStrings);
    }

    parseDice(diceStrings) {
        return diceStrings.map(dice => {
            const sides = dice.split(',').map(val => {
                const num = parseInt(val, 10);
                if (isNaN(num)) {
                    throw new Error(`Invalid dice value: ${val}. Please ensure all values are integers.`);
                }
                return num;
            });

            if (sides.length !== 6) {
                throw new Error(`Each dice must have 6 values. Provided: ${dice}`);
            }
            return sides;
        });
    }

    getDice() {
        return this.dice;
    }
}

module.exports = DiceConfiguration;
