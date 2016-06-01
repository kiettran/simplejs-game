(function() {

	function Timer() {

		/**
		 * initialize prototype
		 */
		this.initialize();
	}

	Timer.prototype = {

		/**
		 * @var time
		 * @var interval
		 */
		time: null,

		/**
		 * initialize method
		 */
		initialize: function() {
			console.log('Timer.initialize()');

			/**
			 * set default time
			 * @type {number}
			 */
			this.time = 0;
		},

		/**
		 * create method
		 * @param time
		 */
		create: function(time) {
			console.log('Timer.create()');

			/**
			 * set time
			 * @type {*}
			 */
			this.time = time;

			/**
			 * start update timer
			 */
			this.update();
		},

		/**
		 * update method
		 */
		update: function() {
			console.log('Timer.update()');

			/**
			 * bind this
			 * @type {*}
			 */
			var self = this;

			/**
			 * interval time
			 */
			this.interval = setInterval(function() {
				/**
				 * add time
				 * @type {number}
				 */
				self.time = self.time + 1;

			}, 1000);
		},

		/**
		 * destroy method
		 */
		destroy: function() {
			console.log('Timer.destroy()');

			/**
			 * clear interval
			 */
			clearInterval(this.interval);
		}
	};

	window.Timer = Timer;

})();