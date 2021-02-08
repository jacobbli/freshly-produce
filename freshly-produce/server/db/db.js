//connect to postgres
const Pool = require('pg').Pool;

const pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGDATABASE,
        database: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        ssl: false
    });


module.exports = pool;