const sql = require('mssql')
const config = require('../config/database')

let pool

async function getPool() {
  if (pool) {
    return pool
  }

  pool = await sql.connect(config)

  return pool
}

module.exports = {
  getPool
}


// Thêm hàm này vào trong file src/services/sql.service.js của bạn
async function executeDynamicQuery(queryString) {
    try {
        // Mượn cấu hình connect database có sẵn trong file của bạn
        // Giả sử biến kết nối của bạn tên là pool hoặc mssql liên kết với src/config/database
        const pool = await poolPromise; // Bạn xem file đang dùng biến gì để connect thì gọi biến đó nhé
        const result = await pool.request().query(queryString);
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

// Nhớ xuất hàm này ra ở module.exports của file đó nhé:
// module.exports = { ..., executeDynamicQuery };
