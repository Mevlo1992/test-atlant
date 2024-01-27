//Data for random strings, utilities etc... 

export function generateRandomStringOfXChars(x) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < x; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
};

export function getNewRandomNumber() {
    let randomNo = Math.floor(10000 * Math.random() + 1).toString();
    return randomNo;
};

export function getRandomLargeNumberOfXChars(x) {
    var randomNumber = '';
    for (var i = 0; i < x; i++) {
        randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
}

export function generateRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}