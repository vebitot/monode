var express = require('express');
    app = express();
	cons = require('consolidate');
    bodyParser = require("body-parser");
	MongoClient = require('mongodb').MongoClient;
    Server = require('mongodb').Server;
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + "/views");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // app.use(app.router);
// Handler for internal server error
function errorHandler(err, req, res, next){
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error-template',{error: err });
}
app.use(errorHandler);

//open a connection to the server
var mongoclient = new MongoClient(new Server('localhost',27017,{
    'native_parser' : true}))

//connecting to a database
var db = mongoclient.db('chatblog');


// setting up url
app.get('/', function(req, res){
        db.collection('users').findOne({"name":"Vebito Tetseo"}, function(err, doc){
        if (err) throw err;
        res.render("index", doc);
    })
});
app.get('/home', function(req, res, next){
        res.render("register");
});

app.get('/login', function(req, res, next){
        res.render("login");
});

app.post('/register',function(req, res, next){
    var name = req.body.username;
    var email = req.body.email;
    if(name.trim() == "" || name == null || email.trim() =="" || email == null)
    {
        next(Error("please enter a username and email!"));
        console.log("nothing here");
    }
    else{
        console.log(name);
        console.log(email);
        db.collection('users').insert({'name':name, 'email': email}, function(err, doc){
            if(err) throw err;
            res.render("index",doc);
        })
    }
});

app.post('/authenticate',function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    if(username.trim() == "" || username == null || password.trim() == "" || password == null)
    {
        next(Error("please enter a username and email!"));
        console.log("nothing here");
    }
    else{
        console.log(username);
        console.log(password);
        db.collection('users').findOne({'username':username}, function(err, doc){
            if(err) throw err;
            console.log(doc);
        })
    }
});

mongoclient.open(function(err, mongoclient){
    if (err) throw err;
    app.listen(8000);
    console.log("Listening to 8000");
});
