// jQuery 1.4.2 is required
// Create the main game object
var Game = {};
Game.characters = [];
Game.controls = {40: "down", 39: "right", 38: "up", 37: "left"};
Game.currentMap = null;

// This is for the debug area. could use console later
Game.log = $('#debug');
// The main canvas window
Game.canvas = $('#canvas')[0];
// the main context
Game.handle = Game.canvas.getContext('2d');

// the debugger function
Game.debug = function(message, _console) {
  if(_console) {
   window.console.log(message);
  } else {
    var now = new Date();
    timestamp = (now.getHours()) + ':' + (now.getMinutes() + 1) + ':' + (now.getSeconds() + 1);
    Game.log.prepend('<p>'+timestamp+'&raquo;&nbsp;' + message + '</p>');
  }
};

Game.setMap = function(mapData) {
	Game.currentMap = mapData;
}

Game.screen = {
  width: Game.canvas.width,
  height: Game.canvas.height,
  tilesX: Game.canvas.width / 16, 
  tilesY: Game.canvas.height / 16
};

Game.viewport = {
  x: 0,
  y: 0
};

Game.tile = {
  draw: function(x, y, tile) {
   var img = Game.tile.retrieve(tile.ground);
   Game.handle.drawImage(img, x * 16, y * 16);
   if(tile.item) {
     Game.handle.drawImage(Game.tile.retrieve(tile.item), x* 16, y * 16);
   }
  },
  images: [],
  store: function(id, imgSrc) {
    var newid = Game.tile.images.length;
    var tile = [id, new Image(), false];
    tile[1].src = imgSrc;
    tile[1].onload = function() {
      tile[2] = true;
    }
    Game.tile.images[newid] = tile
  },
  retrieve: function(id) {
    var i, len = Game.tile.images.length;
    
    for(i=0; i < len; i++) {
      if(Game.tile.images[i][0] == id) {
        return Game.tile.images[i][1];
      }
    }
  },
  allLoaded: function() {
    var i, len = Game.tile.images.length;
    for(i=0;i<len;i++) {
      if(Game.tile.images[i][2] == false) {
        return false;
      }
    }
    
    return true;
  }
};

Game.map = {
  draw: function() {
    var xPos, yPos;
    var mapX = 0;
    var mapY = 0;
    var tile;
    
    Game.debug('drawing map from ' + Game.viewport.x + ',' + Game.viewport.y + ' to ' +  (Game.viewport.x + Game.screen.tilesX) + ',' + (Game.viewport.y + Game.screen.tilesY));
    
    for(yPos = 0; yPos < Game.screen.tilesY; yPos++) {
      for(xPos = 0; xPos < Game.screen.tilesX; xPos++) {
        mapX = xPos + Game.viewport.x;
        mapY = yPos + Game.viewport.y;
        tile = (Game.currentMap[mapY] && Game.currentMap[mapY][mapX]) ? Game.currentMap[mapY][mapX] : {ground: 0};
        Game.tile.draw(xPos, yPos, tile);
      }
    }
  }
};

Game.draw = function(mapData) {
  if(Game.tile.allLoaded() === false) {
    setTimeout(Game.draw, 100);
  } else {
    Game.map.draw();
		Game.player.draw();
  }
}

Game.start = function(mapData, x, y) {
  Game.handle.translate(0,0);
  Game.debug('starting...');
  Game.viewport.x = x;
  Game.viewport.y = y;
  Game.tile.store(0, 'images/tile_black.png');
  Game.tile.store(1, 'images/tile_grass.png');
  Game.tile.store(2, 'images/tile_rock.png');
	Game.setMap(mapData);
	
	Game.player.store(0, 'images/scientist_n0.png');
	Game.player.store(1, 'images/scientist_n1.png');
	Game.player.store(2, 'images/scientist_n2.png');
	Game.player.store(3, 'images/scientist_e0.png');
	Game.player.store(4, 'images/scientist_e1.png');
	Game.player.store(5, 'images/scientist_e2.png');
	Game.player.store(6, 'images/scientist_s0.png');
	Game.player.store(7, 'images/scientist_s1.png');
	Game.player.store(8, 'images/scientist_s2.png');
	Game.player.store(9,  'images/scientist_w0.png');
	Game.player.store(10, 'images/scientist_w1.png');
	Game.player.store(11, 'images/scientist_w2.png');
	
  Game.draw();
  Game.debug('done');
};
