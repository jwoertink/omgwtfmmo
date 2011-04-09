if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}

// Maps
var mapone = [
   [{ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1, item:3, onenter:0}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
   [{ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}]
];

var maptwo = [
	[{ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5,item:6,onactivate:2}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5, item:4, onenter:1}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5}, {ground:5, item:2}],
	[{ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}, {ground:5, item:2}]
];

function message(obj){
  var el = document.createElement('p');
  if ('announcement' in obj) el.innerHTML = '<em>' + esc(obj.announcement) + '</em>';
  else if ('message' in obj) el.innerHTML = '<b>' + esc(obj.message[0]) + ':</b> ' + esc(obj.message[1]);
  document.getElementById('chat').appendChild(el);
  document.getElementById('chat').scrollTop = 1000000;
}

function send(){
  var val = document.getElementById('text').value;
  socket.send(val);
  message({ message: ['you', val] });
  document.getElementById('text').value = '';
  $('#canvas').focus();
}

function esc(msg){
  return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var socket = new io.Socket(null, {port: 8080, rememberTransport: false});
socket.connect();
socket.on('message', function(obj){
  if ('buffer' in obj){
    document.getElementById('form').style.display='block';
    document.getElementById('chat').innerHTML = '';
    
    for (var i in obj.buffer) message(obj.buffer[i]);
  } else message(obj);
});

function startGame() {
	$('#wrapper').append('<canvas id="canvas" width="144" height="144" tabindex="1"></canvas>');
	$('#canvas').focus();
	var activateControls = true;
	$('#canvas').focus(function() {
		activateControls = true;
	});
	$('#canvas').blur(function() {
		activateControls = false;
	});
  Game.start(mapone, 0, 0);
  $(window).keypress(function(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
		if(activateControls && code == 13) {
			$('#canvas').blur();
			$('#text').focus();
		}
		if(Game.controls[code] != null && activateControls) {
		  Game.keyboard.parseInput(event);
			event.preventDefault;
		}
  });
}


// Start game.
$(window).load(function() {
	
});