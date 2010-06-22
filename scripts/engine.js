// jQuery 1.4.2 is required
// Create the main game object
var Game = {};
Game.characters = [];
Game.directions = {40: "down", 39: "right", 38: "up", 37: "left"};

var Character = function(src) {
  this.src = src;
  this.position = {
    x: 16,
    y: 16
  };
  this.image = $('<img src="'+this.src+'" />')[0];
  this.draw = function(x, y, _img) {
    //Game.handle.save();
    //Game.handle.clearRect(Game.viewport.x, Game.viewport.y, x, y);
    var character = this;
    if(_img) {
      character.image.src = _img;
      character.image.onload = function() {
        Game.handle.drawImage(this,  character.position.x , character.position.y);
      }
    } else {
      Game.handle.drawImage(character.image,  character.position.x , character.position.y);
    }
  };
  this.move = function(direction) {
    switch(direction) {
      case 'down':
        this.position.y += 16
        break;
      case 'up':
        this.position.y -= 16
        break;
      case 'right':
        this.position.x += 16
        break;
      case 'left':
        this.position.x -= 16
        break;
    }
    this.draw(this.position.x, this.position.y, "images/celes-"+direction+".gif");
  }
};



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
  draw: function(mapData) {
    var xPos, yPos;
    var mapX = 0;
    var mapY = 0;
    var tile;
    
    Game.debug('drawing map from ' + Game.viewport.x + ',' + Game.viewport.y + ' to ' +  (Game.viewport.x + Game.screen.tilesX) + ',' + (Game.viewport.y + Game.screen.tilesY));
    
    for(yPos = 0; yPos < Game.screen.tilesY; yPos++) {
      for(xPos = 0; xPos < Game.screen.tilesX; xPos++) {
        mapX = xPos + Game.viewport.x;
        mapY = yPos + Game.viewport.y;
        tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : {ground: 0};
        Game.tile.draw(xPos, yPos, tile);
      }
    }
  }
};

Game.draw = function(mapData) {
  if(Game.tile.allLoaded() === false) {
    setTimeout(function(md) {
      return function() {
        Game.debug('loading images...');
        Game.draw(md);
      }
    }(mapData), 100);
  } else {
    Game.map.draw(mapData);
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
  Game.draw(mapData);
  //Game.debug('creating character');
  //var character = new Character('images/celes-down.gif');
  //character.draw(10, 10);
  //Game.characters.push(character);
  Game.debug('done');
};


// Maps
// r = rocks
// g = grass
// w = water


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
  [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
  [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
  [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
  [{ground:1, item:2}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1}, {ground:1, item:2}],
  [{ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}, {ground:1, item:2}]
];


// Start game.

$(window).load(function() {
  Game.start(mapone, 0, 0);
  $(window).keydown(function(event) {
    if(Game.directions[event.keyCode]) {
      Game.characters[0].move(Game.directions[event.keyCode]);
      event.preventDefault();
    }
  });
});