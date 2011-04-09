Game.script = {};

Game.script.call = [
	function() {
		Game.setMap(maptwo);
		Game.viewport.x = -2;
		Game.viewport.y = 1;
		Game.player.spriteIndex = 6;
		
		Game.draw();
	},
	function() {
		Game.setMap(mapone);
		Game.viewport.x = -2;
		Game.viewport.y = 5;
		Game.player.spriteIndex = 6;
		
		Game.draw();
	},
  function() {
		Game.debug('WTF DOES THIS SAY?!?');
		//alert("Im in ur cave, scriptin' ur scientist");
  }
]