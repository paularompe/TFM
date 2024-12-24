const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cosmere_social_network',
    password: 'postgres',
    port: 5432,
});

module.exports = pool;