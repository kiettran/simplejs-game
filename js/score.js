(function() {

	function Score() {

		/**
		 * initialize prototype
		 */
		this.initialize();
	}

	Score.prototype = {

		points: null,
		container: null,

		/**
		 * initialize method
		 */
		initialize: function() {
			console.log('Score.initialize()');

			/**
			 * set default points
			 * @type {number}
			 */
			this.points = 0;

			/**
			 * create container
			 *
			 *
			 * @type {createjs.Container}
			 */
			this.container = new createjs.Container;
		},

		/**
		 * create method
		 * @param amount
		 */
		create: function(amount) {
			console.log('Score.create()');

			/**
			 * set points
			 * @type {*}
			 */
			this.points = amount;
		},

		/**
		 * increase method
		 * @param amount
		 * @returns {*}
		 */
		increase: function(amount) {
			console.log('Score.increase()');

			/**
			 * check amount
			 */
			if(amount) {

				/**
				 * return points
				 */
				return this.points += amount;
			}
		},

		/**
		 * decrease amount
		 * @param amount
		 * @returns {*}
		 */
		decrease: function(amount) {
			console.log('Score.decrease()');

			/**
			 * check amount
			 */
			if(amount) {

				/**
				 * return points
				 */
				return this.points -= amount;
			}
		}
	};

	window.Score = Score;

})();