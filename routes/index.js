var express = require('express');
var controller = require('../controllers/controllerImage');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/finishNum', async function(req, res) {
  //=============讓controller幫我們查==========
  let data  = await controller.finishNum();
  //console.log(array);
  res.send(data);
});

router.get('/image', async function(req, res) {
  //=============讓controller幫我們查==========
  let data  = await controller.getImage();
  //console.log(array);
  res.send(data);
});

router.get('/updateTimes', async function(req, res) {
  //=============讓controller幫我們查==========
  const filename = String(req.query.filename);
  const num = Number(req.query.num);
  const value = String(req.query.value);
  console.log(filename, num, value)
  let data  = await controller.updateTimes(filename, num, value);
  //console.log(array);
  res.send(data);
});

module.exports = router;
