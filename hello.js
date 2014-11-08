var http = require('http');

var server = http.createServer(function (req,res){
	res.writeHead(200,{"Content-Type":"text/plain"});
	res.end("Hello!!");
	res.end("Bye");
}).listen(8000);
console.log("listening to port 8000");
