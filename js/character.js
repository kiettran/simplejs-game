(function() {

	function Character() {

		/**
		 * initialize prototype
		 */
		this.initialize();
	}

	Character.prototype = {

		/**
		 * @var container
		 * @var sprite
		 * @var bitmap
		 */
		container: null,
		sprite: null,
		bitmap: null,

		/**
		 * initialize method
		 */
		initialize: function() {
			console.log('Character.initialize()');

			/**
			 * create container
			 * @type {createjs.Container}
			 */
			this.container = new createjs.Container;
		},

		/**
		 * create method
		 */
		create: function(sprite) {
			console.log('Character.create()');

			this.sprite = new createjs.SpriteSheet({
				'frames': {
					'height': 36,
					'width': 25,
					'count': 4,
					'regX': 12,
					'regY': 18
				},
				'images': [sprite]
			});

			/**
			 * create bitmap
			 * @type {createjs.Bitmap}
			 */
			this.bitmap = new createjs.BitmapAnimation(this.sprite);

			/**
			 * set default animation frame
			 */
			this.bitmap.gotoAndStop(0);

			/**
			 * flip image vertically
			 * @type {number}
			 */
			this.bitmap.scaleY = -1;

			/**
			 * add bitmap to container
			 */
			this.container.addChild(this.bitmap);
		},

		/**
		 * move method
		 * @param x
		 * @param y
		 * @param r
		 */
		move: function(x, y, r) {

			/**
			 * set x coordinate
			 * @type {*}
			 */
			this.bitmap.x = x;

			/**
			 * check x coordinate
			 */
			if(this.bitmap.x <= 0) {

				/**
				 * set min x coordinate
				 * @type {number}
				 */
				this.bitmap.x = 0;
			} else if(this.bitmap.x >= Settings.Width) {

				/**
				 * set max x coordinate
				 * @type {number}
				 */
				this.bitmap.x = Settings.Width;
			}

			/**
			 * set y coordinate
			 * @type {*}
			 */
			this.bitmap.y = y;

			/**
			 * check x coordinate
			 */
			if(this.bitmap.y <= 0) {

				/**
				 * set min y coordinate
				 * @type {number}
				 */
				this.bitmap.y = 0;
			} else if(this.bitmap.y >= Settings.Height) {

				/**
				 * set max x coordinate
				 * @type {number}
				 */
				this.bitmap.y = Settings.Height;
			}

			/**
			 * set rotation
			 * @type {*}
			 */
			this.bitmap.rotation = r;
		},

		transform: function(frame) {
			console.log('Character.transform()');

			/**
			 * check frame
			 */
			if(frame >= 0) {

				/**
				 * check the current frame
				 */
				if(this.bitmap.currentFrame != frame) {

					/**
					 * check if frame exist
					 */
					if(this.sprite.getFrame(frame) != null) {

						/**
						 * set frame on bitmap
						 */
						this.bitmap.gotoAndStop(frame);
					}
				}
			}
		}
	};

	window.Character = Character;

})();