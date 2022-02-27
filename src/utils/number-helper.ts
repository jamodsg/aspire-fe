export class NumberHelper {

    // Used to generate random number by given no
    static generateRandomNumber(no: number) {
        return Math.floor(Number('1'.padEnd(no, '0')) + Math.random() * Number('9'.padEnd(no, '0')));
    }

}