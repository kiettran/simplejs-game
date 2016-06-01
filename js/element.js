(function() {

	function Element(el) {

		/**
		 * initialize prototype
		 */
		this.initialize(el);
	}

	Element.prototype = {

		/**
		 * @var container
		 */
		container: null,

		/**
		 * initialize method
		 */
		initialize: function() {
			console.log('Element.initialize()');

			/**
			 * create container
			 * @type {createjs.Container}
			 */
			this.container = new createjs.Container;
		},

		/**
		 * create method
		 * @param bitmap
		 * @param x
		 * @param y
		 */
		create: function(bitmap, type, points) {

			/**
			 * create bitmap
			 * @type {createjs.Bitmap}
			 */
			var bitmap = new createjs.Bitmap(bitmap);

			/**
			 * set coordinates
			 * @type {*}
			 */
			bitmap.x = Math.floor((Math.random()*Settings.Width)+1);
			bitmap.y = Math.floor((Math.random()*Settings.Height)+1);

			bitmap.attr = type;
			bitmap.points = points;

			/**
			 * add bitmap to container
			 */
			this.container.addChild(bitmap);

			/**
			 * move bitmap
			 */
			this.move(bitmap, Math.floor((Math.random()*Settings.Width)+1), Math.floor((Math.random()*Settings.Height)+1));
		},

		/**
		 * move method
		 * @param bitmap
		 * @param x
		 * @param y
		 */
		move: function(bitmap, x, y) {

			/**
			 * bind this
			 * @type {*}
			 */
			var self = this;

			/**
			 * tween bitmap
			 */
			createjs.Tween.get(bitmap).to({x: x, y: y}, Math.floor((Math.random()*10)+5)*1000).wait(Math.floor((Math.random()*10)+5)*1000).call(function() {
				self.destroy(bitmap)
			});
		},

		/**
		 * destroy method
		 * @param bitmap
		 */
		destroy: function(bitmap) {

			/**
			 * check bitmap
			 */
			if(bitmap) {

				/**
				 * check container
				 */
				if(this.container.contains(bitmap)) {

					/**
					 * remove child
					 */
					this.container.removeChild(bitmap);
				}
			}
		}
	};

	window.Element = Element;

})();