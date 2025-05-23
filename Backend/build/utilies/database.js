"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TESTING_DB, environment } = process.env;
let current_environment = 'dev';
let client = new pg_1.Pool();
if (current_environment == environment) {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000
    });
}
else {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TESTING_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000
    });
}
exports.default = client;
