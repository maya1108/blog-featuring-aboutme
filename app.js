// require and instantiate express
var dotenv = require('dotenv').config();
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b056c6aedbe3d8',
  password : 'c1e8723f',
  database  : 'heroku_389b65385086f4d'
})
connection.connect(function(error){
  if(!!error){
    console.log("Error Connection failed");
  }else {
    console.log("Connected");
  }
});
app.get('/home',function(req,res){
  connection.query("SELECT * from posts", function(error,result){
    if(!!error){
      console.log("Error in the query");
    }else {
      // console.log("Successful query");
    }
      res.render('home',{result:result.reverse()});
  });
})
app.get('/post/:postid',function (req,res) {
  var id = req.params.postid;
    connection.query("SELECT * from posts where postid=?",id, function(error,result){
      if(!!error){
        console.log("Error with post");
      }else {
        console.log("post Successful");
      }
      console.log(result);
      res.render('post',{postResult:result[0]});;
    });
})
app.get('/projects', function (req, res) {
 res.render('projects', {});
});
app.get('/aboutme', function (req, res) {
 res.render('aboutme', {});
});

 app.get('/new/entry', function (req, res) {
  res.render('entry');
});
app.post("/home",function(req,res){
connection.query("INSERT INTO posts (title,body) values ('"+req.body.title+"','"+req.body.article+"')", function(error,result){
  if (!!error) {
  console.log(error);
}else {
  res.redirect('/home');
}
})

})
app.listen(3000);
