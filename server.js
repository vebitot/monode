var express = require('express');
    app = express();
	cons = require('consolidate');
	MongoClient = require('mongodb').MongoClient;
    Server = require('mongodb').Server;
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + "/views");
    app.use(express.bodyParser());
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

var db = mongoclient.db('students');

app.get('/', function(req, res){
        db.collection('grades').findOne({"name":"Vebito Tetseo"}, function(err, doc){
        if (err) throw err;
        res.render("index", doc);
    })
});
app.get('/home/:name', function(req, res, next){
        var name = req.params.name;
        var getVar1 = req.query.gv1;
        var getVar2 = req.query.gv2;
        res.render("home", {name:name, v1:getVar1, v2:getVar2});
});

app.post('/register',function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    if
});
mongoclient.open(function(err, mongoclient){
    if (err) throw err;
    app.listen(8000);
    console.log("Listening to 8000");
});
