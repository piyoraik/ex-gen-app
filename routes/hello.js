var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// MySQLの設定情報
var mysql_setting = {
  host      : 'mariadb',
  user      : 'root',
  password  : 'example',
  database  : 'node'
};

// インデックスにアクセス
router.get('/', (req, res, next) => {
  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query('SELECT * FROM mydata',
    function (error, results, fields) { 
      if (error == null) {
        var data = {
          title: 'mysql',
          content: results
        };
        res.render('hello/index', data);
      }
     }
  );
  
  connection.end();
});

// 新規作成ページにアクセス
router.get('/add', (req, res, next) => {
  var data = {
    title: 'Hello/Add',
    content: '新しいレコードを入力',
  };

  res.render('hello/add', data);
});

// 新規作成フォーム送信処理
router.post('/add', (req, res, next) => {
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = {
    name: nm,
    mail: ml,
    age: ag,
  };

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    'INSERT INTO mydata SET ?', data,
    function(error, results, fields) {
      res.redirect('/hello');
    }
  );

  connection.end();

});

// 詳細ページの表示
router.get('/show', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    'SELECT * FROM mydata WHERE id=?', id,
    function(error, results, fields) {
      if (error == null) {
        var data = {
          title: 'Hello/show',
          content: `id = ${id}のレコード`,
          mydata: results[0],
        };
        res.render('hello/show', data);
      }
    }
  );

  connection.end();
});

// 編集ページの表示
router.get('/edit', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    'SELECT * FROM mydata WHERE id = ?', id,
    function(error, results, fields) {
      if (error == null) {
        var data = {
          title: 'hello/edit',
          content: `id = ${id}のレコード`,
          mydata: results[0]
        };

        res.render('hello/edit', data);
      }
    }
  );

  connection.end();
});

// データを更新
router.post('/edit', (req, res, next) => {
  var id = req.body.id;
  var nm = req.body.name;
  var ml = req.body.mail;
  var ag = req.body.age;
  var data = {
    name: nm,
    mail: ml,
    age: ag,
  }

  connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    'UPDATE mydata SET ? WHERE id = ?',[data, id],
    function(error, results, fields) {
      console.log(error);
      res.redirect('/hello');
    }
  );

  connection.end();
});

// 削除確認ページ
router.get('/delete', (req, res, next) => {
  var id = req.query.id;

  var connection = mysql.createConnection(mysql_setting);

  connection.connect();

  connection.query(
    'SELECT * FROM mydata WHERE id = ?', id,
    function(error,results,fields) {
      // console.log(error);
      if(error == null){
        var data = {
          title: 'Hello/Delete',
          content: `id=${id}のレコード`,
          mydata: results[0]
        }
        res.render('hello/delete',data)
      }
    }
  );

  connection.end();
});

// 削除処理
router.post('/delete', (req, res, next) => {
  var id = req.body.id;

  var connection = mysql.createConnection(mysql_setting);
  connection.connect();

  connection.query(
    'DELETE FROM mydata WHERE id =?',id,
    function(error, results, fields) {
      res.redirect('/hello');
    }
  );

  connection.end();
});

module.exports = router;