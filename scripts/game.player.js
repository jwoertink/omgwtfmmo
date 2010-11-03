// require 'game'
// require 'game.keyboard'

Game.player = {
	leftLeg: false
};
Game.player.sprite = [];
Game.player.spriteIndex = 6;

Game.player.store = function(index, imgSrc) {
	var sprite = [new Image(), false];
	sprite[0].src = imgSrc;
	sprite[0].onload = function() {
		sprite[1] = true;
	}
	
	Game.player.sprite[index] = sprite;
}

Game.player.retrieve = function(index) {
	return Game.player.sprite[index][0];
}

Game.player.allLoaded = function() {
	var i;
	for(i=0; i < 12; i++) {
		if(Game.player.sprite[i][1] === false) {
			return false;
		}
	}
	
	return true;
}

Game.player.calcLoc = function() {
	var character = {
		width: Math.ceil(Game.player.sprite[0][0].width),
		height: Math.ceil(Game.player.sprite[0][0].height)
	};
	var screen = {
		width: Game.screen.width,
		height: Game.screen.height
	};
	var x = (screen.width / 2) - (character.width / 2);
	var y = (screen.height / 2) + 8 - (character.height);
	
	return {left: x, top: y};
}

Game.player.draw = function() {
	var loc = Game.player.calcLoc();
	Game.handle.drawImage(Game.player.sprite[Game.player.spriteIndex][0], loc.left, loc.top);
}

Game.player.move = function(direction) {
	var index, x, y;
	index = x = y = 0;
	Game.keyboard.canInput = false;
	
	switch(direction) {
		case 'up': index = 0; y = 1; break;
		case 'right' : index = 3; x = -1; break;
		case 'left' : index = 9; x = 1; break;
		case 'down' : index = 6; y = -1; break;
	}
	var toX = Game.viewport.x + (Game.screen.tilesX / 2 - 0.5) - x;
	var toY = Game.viewport.y + (Game.screen.tilesY / 2 - 0.5) - y;
	
	if(Game.currentMap[toX] && 
		Game.currentMap[toY] && 
		Game.currentMap[toY][toX].item && 
		(Game.currentMap[toY][toX].item == 2 ||
		 Game.currentMap[toY][toX].item == 6)) {
		Game.keyboard.canInput = true;
	} else {
		Game.viewport.playerOffsetX = x * 5;
		Game.viewport.playerOffsetY = y * 5;
		setTimeout(Game.player.animate, 100);
		setTimeout(Game.player.reset, 200);
	}
	
	Game.player.spriteIndex = index;	
	Game.draw();
}

Game.player.animate = function() {
	var x, y;
	
	x = y = 0;
	
	switch(Game.player.spriteIndex) {
		case 0: y = 11; break;
		case 3: x = -11; break;
		case 6: y = -11; break;
		case 9: x = 11; break;
	}
	
	Game.player.spriteIndex += (Game.player.leftLeg === true) ? 1 : 2;
	Game.player.leftLeg = !Game.player.leftLeg;
	Game.viewport.playerOffsetX = x;
	Game.viewport.playerOffsetY = y;
	Game.draw();
}

Game.player.reset = function() {
	var index, x, y;
	x = Game.viewport.x;
	y = Game.viewport.y;
	index = 0;
	
	switch(Game.player.spriteIndex) {
		case 1:
		case 2: y--; index = 0; break;
		case 4:
		case 5: x++; index = 3; break;
		case 7:
		case 8: y++; index = 6; break;
		case 10:
		case 11: x--; index = 9; break;
	}
	
	Game.viewport.x = x;
	Game.viewport.y = y;
	Game.keyboard.canInput = true;
	Game.viewport.playerOffsetX = 0;
	Game.viewport.playerOffsetY = 0;
	Game.player.spriteIndex = index;
	Game.draw();
	
	var tileX = x + (Game.screen.tilesX / 2 - 0.5);
	var tileY = y + (Game.screen.tilesY / 2 - 0.5);

	if(Game.currentMap[tileY] && Game.currentMap[tileY][tileX] && Game.currentMap[tileY][tileX].onenter != undefined) {
		Game.script.call[Game.currentMap[tileY][tileX].onenter]();
	}
}

Game.player.activate = function() {
	var x = Game.viewport.x + (Game.screen.tilesX / 2 - 0.5);
	var y = Game.viewport.y + (Game.screen.tilesY / 2 - 0.5);
	
	switch(Game.player.spriteIndex) {
		case 0: y--; break;
    case 3: x++; break;
    case 6: y++; break;
    case 9: x--; break;
	}
	
	if(Game.currentMap[y] &&
		 Game.currentMap[y][x] &&
		 Game.currentMap[y][x].onactivate != undefined) {
		Game.script.call[Game.currentMap[y][x].onactivate]();	
	}
}