class Dice {
    constructor(sides) {
        if (sides.length !== 6) {
            throw new Error(`Each dice must have 6 values. Provided: ${sides}`);
        }
        this.sides = sides;
    }

    roll() {
        const randomIndex = Math.floor(Math.random() * this.sides.length);
        return this.sides[randomIndex];
    }    
}

module.exports = Dice;