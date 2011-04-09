var http = require('http'), 
		url = require('url'),
		fs = require('fs'),
		sys = require('sys'),
		path = require('path'),
		io = require('./plugins/socket.io'),
		server = http.createServer(function(request, response) {
			var uri = url.parse(request.url).pathname,
					publicPath = new RegExp(/public/),
					filename = path.join(process.cwd(), uri);
			path.exists(filename, function(exists) {
				if(!exists) return send404(response);

				if(uri == '/') {
					fs.readFile(__dirname + '/index.html', function(err, data){
						if(err) return send404(response);
						response.writeHead(200, {'Content-Type': 'text/html'});
						response.write(data, 'utf8');
						response.end();
					});
				} else {
					fs.readFile(filename, "binary", function(err, file) {
						if(err) return send500(response, err);
						response.writeHead(200);
						response.write(file, 'binary');
						response.end();
					});
				}
			});
		});

var Client = require('mysql').Client,
client = new Client();
		
send404 = function(res){
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.write('Error 404. Page Not found.');
	res.end();
};	
send500 = function(res, err) {
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.write('Error 500. ' + err);
	res.end();
};
		
server.listen(8080);

function log(data){
  sys.log("\033[0;32m"+data+"\033[0m");
}
		
var io = io.listen(server),
		buffer = [];
		
io.on('connection', function(client) {
	client.send({ buffer: buffer });
	client.broadcast({ announcement: client.sessionId + ' connected' });

	client.on('message', function(message){
		var msg = { message: [client.sessionId, message] };
		buffer.push(msg);
		if (buffer.length > 15) buffer.shift();
		client.broadcast(msg);
	});

	client.on('disconnect', function(){
		client.broadcast({ announcement: client.sessionId + ' disconnected' });
	});
});
