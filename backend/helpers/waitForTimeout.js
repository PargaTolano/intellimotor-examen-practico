function waitForTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = waitForTimeout;