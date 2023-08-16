window.addEventListener("load", function () {
  var canvas = document.getElementById("stage");
  canvas.width = Stage.width;
  canvas.height = Stage.height;

  Stage._onChange = _redraw;

  let imageLoadedCount = Stage.sprites.length;
  Stage.sprites.forEach(function (sprite) {
    sprite._fireOnChange = Stage._onChange;
    sprite._image = new Image();
    
    sprite._image.onload = function() {
      imageLoadedCount--;
      if (imageLoadedCount <= 0) {
        _redraw();
        Stage._main();

        canvas.addEventListener("click", function (e) {
          if ((sprite.x <= e.x) && (e.x <= (sprite.x + sprite.width)) && (sprite.y <= e.y) && (e.y <= (sprite.y + sprite.height))) {
            sprite._clickListeners.forEach(function (listener) {
              listener.handle();
            })
          }
        });

        canvas.addEventListener("keypressed", function () {
          alert('keypressed');
        })
      }
    }
    sprite._image.src = sprite._imageUrl;

    document.addEventListener('keydown', function(event) {
      Stage.sprites.forEach(function (sprite) {
        sprite._keyPressedListeners.forEach(function (listener) {
          if (listener.code === event.code) {
            listener.handle();
          }
        });
      });
    }, false);
  });

  const context = canvas.getContext("2d");

  function _redraw() {
    context.clearRect(0, 0, Stage.width, Stage.height);
    context.fillStyle = Stage.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
    Stage.sprites.forEach(function (sprite) {
      context.drawImage(sprite._image, sprite.x, sprite.y, sprite.width, sprite.height);
    });
  }
});

class Stage {
  static _canva = undefined;
  static width = 400;
  static height = 400;
  static color = "#fff";
  static sprites = [];
  static _main = function () {}
  
  static _onChange = function() {}

  static onStart(main) {
    Stage._main = main;
  }

  static setSize(width, height) {
    Stage.width = width;
    Stage.height = height;
  }

  static setColor(color) {
    Stage.color = color;
  }

  static addSprite(sprite) {
    Stage.sprites.push(sprite);
    sprite._fireOnChange = Stage._onChange;
  }
}

class Time {
  static delay(delayInMs = 50 /*20 FPS*/) {
    return new Promise(resolve => setTimeout(resolve, delayInMs));
  }
}

class Sprite {
  constructor(imageUrl) {
    this._imageUrl = imageUrl;
    this._x = 0;
    this._y = 0;
    this._width = imageUrl.width;
    this._height = imageUrl.height;
    this._fireOnChange = function () {}
    this._clickListeners = []
    this._keyPressedListeners = [];
  }

  set width(value) {
    this._width = value;
    this._fireOnChange();
  }

  get width() {
    return this._width;
  }

  set height(value) {
    this._height = value;
    this._fireOnChange();
  }

  get height() {
    return this._height;
  }

  set x(value) {
    this._x = value;
    this._fireOnChange();
  }

  get x() {
    return this._x;
  }

  set y(value) {
    this._y = value;
    this._fireOnChange();
  }

  get y() {
    return this._y;
  }

  setSize(width, height) {
    this._width = width;
    this._height = height;
    this._fireOnChange();
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
    this._fireOnChange();
  }

  onClick(handle) {
    this._clickListeners.push({
      handle
    })
  }

  onKeyPressed(code, handle) {
    this._keyPressedListeners.push({
      code,
      handle
    });
  }
}

class Key {
  static SPACE = "Space";
  static ARROW_LEFT = "ArrowLeft";
  static ARROW_RIGHT = "ArrowRight";
}