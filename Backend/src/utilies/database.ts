import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()
const {
    POSTGRES_HOST ,
    POSTGRES_DB ,
    POSTGRES_USER ,
    POSTGRES_PASSWORD ,
    POSTGRES_TESTING_DB,
    environment
} = process.env
 
let current_environment:string = 'dev';
let client :Pool = new Pool();

if (current_environment == environment){
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:  3000
    });
}
else{
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_TESTING_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:  3000
    });
}


export default client