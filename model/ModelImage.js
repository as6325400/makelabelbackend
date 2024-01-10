const database = require('../config/mysqlDB');

const model = {
  async getImage() {
    //會根據class_name的比對位置來排序 越先比對到的越前面
    let table = process.env.MYSQL_TABLE;
    let str = `SELECT * FROM ${table} ORDER BY times ASC LIMIT 1;`;
    //console.log(str);
    return new Promise((resolve, reject) => {
      database.query(str, (err, result, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          //console.log(result);
          resolve(result);
        }
      });
    });
  },
  async finishNum() {
    let table = process.env.MYSQL_TABLE;
    let str = `select count(*) from ${table} where times > 0;`
    return new Promise((resolve, reject) => {
      database.query(str, (err, result, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  async updateTimes(filename, num, value) {
    let table = process.env.MYSQL_TABLE;
    console.log(value)
    let str = `UPDATE ${table} SET times = ${num}, ocrlabel = "${value}" WHERE filename = "${filename}"`;
    console.log(`query str=${str}`);

    return new Promise((resolve, reject) => {
      database.query(str, [num, filename], (err, result, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(`update result: ${result.affectedRows}`);
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false); // 如果没有更新行，也可以返回 false
          }
        }
      });
    });
  }

}

module.exports = model;