//NOTES
// clearRect clears the canvas
// drawImage(image, left/right, up/down)
// down=40  left=37  right=39  up=38
// w=87 s=83 a=65 d=68 space=32

var canvas;
var character;
var environment;
var directions = {40: "down", 39: "right", 38: "up", 37: "left"};

var Character = function() {
  this.image = null;
  this.touching_object = false;
  return {
    x: 0,
    y: 0,
    src: "images/celes-down.gif",
    move: function(direction) {
      switch(direction) {
        case 'down':
          this.y += 16
          break;
        case 'up':
          this.y -= 16
          break;
        case 'right':
          this.x += 16
          break;
        case 'left':
          this.x -= 16
          break;
      }
      this.image.src = "images/celes-"+direction+".gif";

      draw(this.image, this.x, this.y)
    },
    talk: function() {
      var dialog_area = document.getElementById("dialog");
      var text = document.createTextNode("Hello World");
      dialog_area.appendChild(text);
    },
    bounds: function() {
      var bounding_box = [];
      var tl = this.x;
      var tr = this.x + this.image.width;
      var bl = this.y + this.image.height;
      var br = bl + tr;
      bounding_box.push(tl);
      bounding_box.push(tr);
      bounding_box.push(bl);
      bounding_box.push(br);
      return bounding_box
    },
    touching: function(obj) {
      return (this.bounds[1] >= obj.x) ? true : false;
    }
  };
}

function setupCharacter() {
  character = new Character;
  var char_img = new Image();
  char_img.src = character.src;
  character.image = char_img;
  return character;
}

function setupEnvironment() {
  environment = new Image();
  environment.src = "images/grass.png";
  return environment;
}

function init() {
  canvas = document.getElementById('main');
  setupEnvironment();
  setupCharacter();
  
  draw(character.image, character.x, character.y);
  
  window.addEventListener("keydown", function(event) {
    if(directions[event.keyCode]) {
      character.move(directions[event.keyCode]);
      event.preventDefault();
    }
  }, true);
  
}

function draw(img, x, y) {
  var context = canvas.getContext('2d');
  context.globalCompositeOperation = 'source-over';
  context.clearRect(0, 0, canvas.width, canvas.height);
  pattern = context.createPattern(environment, 'repeat');
  context.fillStyle = pattern;
  context.fillRect(0,0,canvas.width, canvas.height);
  context.save();
  context.drawImage(img, x, y);
  context.save();
  
  var mog = new Image();
  mog.src =" images/mog-down.gif";
  mog.onload = function() {
    context.drawImage(mog, 150, 150);
    context.save();
  }
  console.log(mog);
  window.addEventListener("keydown", function(event) {
    if(event.keyCode==32 && character.touching(mog)) {
      character.talk();
      event.preventDefault();
    }
  }, true);
}

window.onload = init;
