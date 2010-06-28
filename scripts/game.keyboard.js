Game.keyboard = {};

Game.keyboard.getValue = function(key) {
   switch(key) {
      case 'up':    return 38;
      case 'down':  return 40;
      case 'left':  return 37;
      case 'right': return 39;

      // more keys here later
   }
};

Game.keyboard.parseInput = function(event) {
	switch(event.keyCode) {
		case Game.keyboard.getValue('up'):
			Game.viewport.y--;
			Game.player.spriteIndex = 0;
			break;
		case Game.keyboard.getValue('down'):
			Game.viewport.y++
			Game.player.spriteIndex = 6;
			break;
		case Game.keyboard.getValue('left'):
			Game.viewport.x--;
			Game.player.spriteIndex = 9;
			break;
		case Game.keyboard.getValue('right'):
			Game.viewport.x++;
			Game.player.spriteIndex = 3;
			break;
	}

	Game.draw();
};