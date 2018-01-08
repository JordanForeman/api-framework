export default class BadDataError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadDataError';
    }
}