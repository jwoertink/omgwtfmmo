Game.keyboard = {
	canInput: false
};
//keydown
//w=87 a=65 s=83 d=68 space=32
//keypress
//w=119 a=97 s=115 d=100 space=32
Game.keyboard.getValue = function(key) {
   switch(key) {
      case 'up':    return 119;
      case 'down':  return 115;
      case 'left':  return 97;
      case 'right': return 100;
			case 'space': return 32;

      // more keys here later
   }
};

Game.keyboard.parseInput = function(event) {
	var code = (event.keyCode ? event.keyCode : event.which);
	if(Game.keyboard.canInput === true) {
		switch(code) {
			case Game.keyboard.getValue('up'):
				Game.player.move('up');
				break;
			case Game.keyboard.getValue('down'):
				Game.player.move('down');
				break;
			case Game.keyboard.getValue('left'):
				Game.player.move('left');
				break;
			case Game.keyboard.getValue('right'):
				Game.player.move('right');
				break;
			case Game.keyboard.getValue('space'):
				Game.player.activate();
				break;
		}
	}

	Game.draw();
};