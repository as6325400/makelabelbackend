var model = require('../model/ModelImage.js');

const controller = {
  async getImage() {
    let result = await model.getImage();
    return result
  },
  async finishNum() {
    let result = await model.finishNum();
    return result
  },
  async updateTimes(filename, num, value) {
    console.log(filename, num)
    let result = await model.updateTimes(filename, num, value);
    return result;
  }
}

module.exports = controller;