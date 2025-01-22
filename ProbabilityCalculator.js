class ProbabilityCalculator {
    static calculate(userDice, opponentDice) {
        let userWins = 0, opponentWins = 0;
    
        userDice.forEach(userValue => {
            opponentDice.forEach(opponentValue => {
                if (userValue > opponentValue) {
                    userWins++;
                } else if (userValue < opponentValue) {
                    opponentWins++;
                }
            });
        });
    
        return userWins / (userWins + opponentWins);
    }
}

module.exports = ProbabilityCalculator;