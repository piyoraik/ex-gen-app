var express = require('express');
var router = express.Router();

var data = [
  {name:'Taro', age: 35, mail:'taro@taro.com'},
  {name:'Taro', age: 35, mail:'taro@taro.com'},
  {name:'Taro', age: 35, mail:'taro@taro.com'},
];

router.get('/',(req, res, next)=> {
  var n = req.query.id;
  res.json(data[n]);
});

module.exports = router;