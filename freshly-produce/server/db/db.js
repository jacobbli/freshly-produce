//connect to postgres
const Pool = require('pg').Pool;

const pool = new Pool({  
        host: 'localhost',  
        user: 'postgres',  
        database: 'postgres',  
        password: 'postgres',
        port: 5432,
        ssl: false
    });  


module.exports = pool;