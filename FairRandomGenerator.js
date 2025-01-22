const crypto = require('crypto');

class FairRandomGenerator {
    constructor() {
        this.key = this.generateSecureKey();
    }

    generateSecureKey() {
        return crypto.randomBytes(32);
    }

    generateHMACRandom(range) {
        this.key = this.generateSecureKey();
        const message = crypto.randomBytes(32);

        const hmac = crypto.createHmac('sha256', this.key);
        hmac.update(message);
        const hash = hmac.digest();

        const randomValue = hash.readUInt32BE(0);

        const randomNumber = randomValue % range;

        return { randomNumber, hmac: hash.toString('hex').toUpperCase() };
    }

    showFairnessProof() {
        console.log(`KEY=${this.key.toString('hex').toUpperCase()}`);
    }
}

module.exports = FairRandomGenerator;
