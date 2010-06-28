Game.player = {};
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