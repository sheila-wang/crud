const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgres://eogcopiq:EhhVSDBZVcE9xWjnixeC_0auXxbq9q4g@fanny.db.elephantsql.com/eogcopiq'
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
