(function() {

	/**
	 * Game
	 * @constructor
	 */
	function Game(canvas) {

		/**
		 * initialize prototype
		 */
		this.initialize(canvas);
	}

	Game.prototype = {

		/**
		 * @var canvas
		 * @var stage
		 * @var world
		 */
		canvas: null,
		stage: null,
		world: null,

		/**
		 * initialize method
		 */
		initialize: function(canvas) {
			console.log('Main.initialize()');

			/**
			 * set canvas element
			 * @type {HTMLElement}
			 */
			this.canvas = document.getElementById(canvas);

			/**
			 * set canvas size
			 * @type {number}
			 */
			this.canvas.width = Settings.Width;
			this.canvas.height = Settings.Height;

			/**
			 * create game
			 */
			this.create();
		},

		/**
		 * create method
		 */
		create: function() {
			console.log('Main.create()');

			/**
			 * create stage
			 * @type {createjs.Stage}
			 */
			this.stage = new createjs.Stage(this.canvas);

			/**
			 * set fps
			 */
			createjs.Ticker.setFPS(Settings.FPS);

			/**
			 * add update ticker
			 */
			createjs.Ticker.addEventListener('tick', function() {

				/**
				 * update stage
				 */
				this.update();
			}.bind(this));

			/**
			 * create world
			 * @type {World}
			 */
			this.world = new World(this.stage);
		},

		/**
		 * update method
		 */
		update: function() {

			/**
			 * update stage
			 */
			this.stage.update();

			/**
			 * check gamestate
			 */
			if(Settings.Gamestate == 'Play') {

				/**
				 * update world
				 */
				this.world.update();
			}
		}
	};

	window.Game = Game;

})();