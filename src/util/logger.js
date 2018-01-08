import winston from 'winston';

const INFO = 'info';
const ERROR = 'error';
const DEBUG = 'debug';

function info(message) {
    winston.info(message);
}

function error(message) {
    winston.log(ERROR, message);
}

function log(type, message) {
    winston.log(type, message);
}

export const constants = {
    INFO,
    ERROR,
    DEBUG
};

export default {
    log,
    info,
    error
};