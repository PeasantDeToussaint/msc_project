import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "yuanlin",
  password: "shanda7019082",
  host: "localhost",
  port: "5432",
  database: "login",
});

export default pool;