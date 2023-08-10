if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

if(pool) {
    console.log(`Postgres Connected: ${pool.options.database}`)
}

module.exports = pool