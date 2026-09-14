module.exports = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  connectionTimeout: 120000,
  requestTimeout: 120000,
  cancelTimeout: 5000,

  options: {
    trustServerCertificate: true,
    connectTimeout: 120000,
    encrypt: false,
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}
