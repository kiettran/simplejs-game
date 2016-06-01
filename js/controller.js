(function() {

	function Controller() {

		/**
		 * initialize prototype
		 */
		this.initialize();
	}

	Controller.prototype = {

		/**
		 * @var x
		 * @var y
		 * @var vx
		 * @var vy
		 * @var r
		 * @var speed
		 * @var state
		 * @var pressed
		 */
		x: null,
		y: null,
		vx: null,
		vy: null,
		r: null,
		speed: null,
		state: new Array(),
		pressed: false,

		/**
		 * initialize method
		 */
		initialize: function() {
			console.log('Controller.initialize()');
		},

		/**
		 * create method
		 */
		create: function(x, y) {
			console.log('Controller.create()');

			/**
			 * set default coordinates
			 * @type {*}
			 */
			this.x = x;
			this.y = y;

			/**
			 * set event listener
			 */
			window.addEventListener('keydown', function(e) {

				/**
				 * start handler
				 */
				this.handler(e);
			}.bind(this));

			/**
			 * set event listener
			 */
			window.addEventListener('keyup', function(e) {

				/**
				 * start handler
				 */
				this.handler(e);
			}.bind(this));
		},

		/**
		 * handler method
		 */
		handler: function(e) {

			/**
			 * check type handler
			 */
			switch(e.type) {
				case 'keydown':

					/**
					 * set pressed
					 * @type {boolean}
					 */
					this.pressed = true;

					/**
					 * set state
					 * @type {boolean}
					 */
					this.state[e.keyCode] = true;
					break;
				case 'keyup':

					/**
					 * set pressed
					 * @type {boolean}
					 */
					this.pressed = false;

					/**
					 * set state
					 * @type {boolean}
					 */
					this.state[e.keyCode] = false;
					break;
			}
		},

		/**
		 * update method
		 */
		update: function() {

			this.x += this.vx;
			this.y += this.vy;

			/**
			 * check pressed
			 */
			if(this.pressed != false) {

				if(this.state[Settings.ButtonLeft] == true) {
					this.rotate('left');
				}

				if(this.state[Settings.ButtonUp] == true) {
					this.accelerate();
				}

				if(this.state[Settings.ButtonRight] == true) {
					this.rotate('right');
				}

				if(this.state[Settings.ButtonDown] == true) {
					this.decelerate();
				}

			} else {

				/**
				 * stop rotate
				 */
				this.rotate(false);
			}
		},

		/**
		 * rotate method
		 * @param d
		 */
		rotate: function(d) {

			/**
			 * check direction
			 */
			if(d != false) {

				/**
				 * check pressed
				 */
				if(this.pressed != false) {

					/**
					 * check direction
					 */
					switch(d) {
						case 'left':

							/**
							 * set rotate factor
							 * @type {number}
							 */
							this.r -= Settings.RotateFactor;
							break;



						case 'right':

							/**
							 * set rotate factor
							 * @type {number}
							 */
							this.r += Settings.RotateFactor;
							break;
					}

				}
			}
		},

		/**
		 * accelerate method
		 */
		accelerate: function() {

			/**
			 * check pressed
			 */
			if(this.pressed != false) {

				/**
				 * accelerate speed
				 * @type {number}
				 */
				this.speed += this.speed + Settings.SpeedFactor;


				/**
				 * check max speed
				 */
				if(this.speed >= Settings.MaxSpeed) {

					/**
					 * set speed
					 * @type {number}
					 */
					this.speed = Settings.MaxSpeed;
				}
			}

			/**
			 * start calculate
			 */
			this.calculate();
		},

		/**
		 * decelerate method
		 */
		decelerate: function() {

			/**
			 * check pressed
			 */
			if(this.pressed != false) {

				/**
				 * check speed
				 */
				if(this.speed >= 0) {

					this.speed = this.speed - Settings.SpeedFactor;
				}
			}

			/**
			 * start calculate
			 */
			this.calculate();
		},

		/**
		 * calculate method
		 */
		calculate: function() {

			/**
			 * calculate
			 * @type {number}
			 */
			this.vx = Math.sin(this.r * (Math.PI / -180)) * this.speed;
			this.vy = Math.cos(this.r * (Math.PI / -180)) * this.speed;

			/**
			 * set max velocity
			 * @type {number}
			 */
			this.vx = Math.min(Settings.MaxVelocity, Math.max(-Settings.MaxVelocity, this.vx));
			this.vy = Math.min(Settings.MaxVelocity, Math.max(-Settings.MaxVelocity, this.vy))
		}
	};

	window.Controller = Controller;

})();