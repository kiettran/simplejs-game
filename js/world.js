(function() {

	function World(stage) {

		/**
		 * initialize prototype
		 */
		this.initialize(stage);
	}

	World.prototype = {

		/**
		 * @var stage
		 * @var controller
		 * @var character
		 * @var element
		 */
		stage: null,
		controller: null,
		character: null,
		element: null,

		/**
		 * initialize method
		 * @param stage
		 */
		initialize: function(stage) {
			console.log('World.initialize()');

			/**
			 * set stage
			 * @type {*}
			 */
			this.stage = stage;

			/**
			 * create controller
			 * @type {Controller}
			 */
			this.controller = new Controller;

			/**
			 * create character
			 * @type {Character}
			 */
			this.character = new Character;

			/**
			 * create element
			 * @type {HTMLElement}
			 */
			this.element = new Element;

			/**
			 * create score
			 * @type {Score}
			 */
			this.score = new Score;

			/**
			 * create timer
			 * @type {Timer}
			 */
			this.timer = new Timer;

			/**
			 * add character and element to stage
			 */
			this.stage.addChild(this.character.container, this.element.container);

			/**
			 * start cta
			 */
			this.cta();
		},

		/**
		 * create method
		 */
		create: function() {
			console.log('World.create()');

			if(Settings.Gamestate != 'Play') {

				/**
				 * set gamestate
				 * @type {string}
				 */
				Settings.Gamestate = 'Play';

				/**
				 * check character container
				 */
				if(this.character.container.getNumChildren() > 0) {

						/**
					 * remove character from stage
					 */
					this.character.container.removeAllChildren();
				}

				/**
				 * check element container
				 */
				if(this.element.container.getNumChildren() > 0) {

					/**
					 * remove all elements from stage
					 */
					this.element.container.removeAllChildren();
				}

				/**
				 * create score
				 */
				this.score.create(0);

				/**
				 * create timer
				 */
				this.timer.create(0);

				/**
				 * create controller
				 */
				this.controller.create(Settings.Width/2, Settings.Height/2);

				/**
				 * create character
				 */
				this.character.create(Settings.CharacterSprite);

				/**
				 * display misc
				 */
				this.display();

				/**
				 * start create random elements
				 */
				this.createElement();
			}
		},

		destroy: function() {
			console.log('World.destroy()');

			/**
			 * check gamestate
			 */
			if(Settings.Gamestate != 'Score') {

				/**
				 * set gamestate
				 * @type {string}
				 */
				Settings.Gamestate = 'Score';

				/**
				 * clear timer
				 */
				this.timer.destroy();

				/**
				 * recall cta
				 */
				this.cta();
			}
		},

		display: function() {
			console.log('World.display()');

			/**
			 * create text
			 * @type {createjs.Text}
			 */
			var misc = new createjs.Text('', '12px Helvetica', '#000');

			/**
			 * set name
			 * @type {string}
			 */
			misc.name = 'misc';

			/**
			 * set coordinates
			 * @type {number}
			 */
			misc.x = 20;
			misc.y = 20;

			this.stage.addChild(misc);
		},

		createElement: function() {

			if(Settings.Gamestate == 'Play') {

				/**
				 * bind this
				 * @type {*}
				 */
				var self = this;

				/**
				 * set random time
				 * @type {number}
				 */
				var randTime = Math.round((Math.random()*5)+1)*1000;

				/**
				 * start timeout
				 */
				setTimeout(function() {

					/**
					 * start function
					 */
					self.createElement();

					/**
					 * for loop amount of element
					 */
					for(var i = 0; i < Math.floor((Math.random()*Settings.ElementAmount)+1); i++) {

						/**
						 * set random element number
						 * @type {number}
						 */
						var randElement = Math.floor((Math.random()*Settings.ElementSprite.length)+1)-1;

						/**
						 * create element
						 */
						self.element.create(Settings.ElementSprite[randElement].img, Settings.ElementSprite[randElement].attr, Settings.ElementSprite[randElement].points);
					}
				}, randTime);
			}

		},

		/**
		 * update method
		 */
		update: function() {

			if(Settings.Gamestate == 'Play') {

				/**
				 * check controller
				 */
				if(this.controller != null) {

					/**
					 * update controller
					 */
					this.controller.update();

					/**
					 * check character
					 */
					if(this.character != null) {

						/**
						 * move character
						 */
						this.character.move(this.controller.x, this.controller.y, this.controller.r);

						/**
						 * check element
						 */
						if(this.element) {

							/**
							 * for loop all children
							 */
							for(var i = 0; i < this.element.container.children.length; i++) {

								/**
								 * check for collision
								 */
								this.collision(this.character.bitmap, this.element.container.children[i]);
							}
						}
					}

					/**
					 * set text of misc
					 * @type {string}
					 */
					this.stage.getChildByName('misc').text = 'SCORE: '+this.score.points+' / TIJD: '+this.timer.time+ ' '+(this.timer.time == 1 ? 'SECONDE' : 'SECONDEN');
				}
			}

			/**
			 * check score
			 */
			if(this.score != null) {

				/**
				 * check amount of points
				 */
				if(this.score.points <= Settings.MinScore) {

					/**
					 * destroy world
					 */
					this.destroy();
				}
			}
		},

		/**
		 * collision method
		 * @param character
		 * @param object
		 */
		collision: function(character, object) {

			/**
			 * check character and object
			 */
			if(character && object) {

				/**
				 * create intersection
				 * @type {*}
				 */
				var intersection = ndgmr.checkPixelCollision(character, object, 0.01);

				/**
				 * check intersection
				 */
				if(intersection) {

					/**
					 * destroy object
					 */
					this.element.destroy(object);

					/**
					 * set currentframe of the character
					 * @type {*}
					 */
					var currentFrame = this.character.bitmap.currentFrame;

					/**
					 * check object attr
					 */
					switch(object.attr) {
						case 'enemy':

							/**
							 * decrease score
							 */
							this.score.decrease(object.points);

							/**
							 * check points
							 */
							if((Math.floor(this.score.points / Settings.ScoreAmount)) <= currentFrame) {
								/**
								 * transform character
								 */
								this.character.transform(currentFrame-1);
							}
							break;
						case 'allied':

							/**
							 * increase score
							 */
							this.score.increase(object.points);

							/**
							 * check points
							 */
							if((Math.floor(this.score.points / Settings.ScoreAmount)-1) == currentFrame) {

								/**
								 * transform character
								 */
								this.character.transform(currentFrame+1);
							}
							break;
					}
				}
			}
		},

		/**
		 * call to action method
		 */
		cta: function() {
			console.log('World.cta()');

			/**
			 * set start
			 * @type {HTMLElement}
			 */
			var start = document.getElementById('start');

			/**
			 * set score
			 * @type {HTMLElement}
			 */
			var score = document.getElementById('score');

			/**
			 * set credits
			 * @type {HTMLElement}
			 */
			var credits = document.getElementById('credits');

			/**
			 * set score
			 * @type {HTMLElement}
			 */
			var info = document.getElementById('info');

			/**
			 * set time
			 * @type {HTMLElement}
			 */
			var time = document.getElementById('time');


			if(Settings.Gamestate == 'Start') {

				/**
				 * set style of start
				 * @type {string}
				 */
				start.style.display = 'block';

				/**
				 * set style of score
				 * @type {string}
				 */
				score.style.display = 'none';
			} else if(Settings.Gamestate == 'Play') {

				/**
				 * set style of start
				 * @type {string}
				 */
				start.style.display = 'none';

				/**
				 * set style of score
				 * @type {string}
				 */
				score.style.display = 'none';

				/**
				 * check credits
				 */
				if(credits.style.display != 'none') {

					/**
					 * set style credits
					 * @type {string}
					 */
					credits.style.display = 'none';
				}

				/**
				 * check info
				 */
				if(info.style.display != 'none') {

					/**
					 * set style info
					 * @type {string}
					 */
					info.style.display = 'none';
				}

			} else if(Settings.Gamestate == 'Score') {

				/**
				 * set style of start
				 * @type {string}
				 */
				start.style.display = 'none';

				/**
				 * set style of score
				 * @type {string}
				 */
				score.style.display = 'block';

				/**
				 * set text of time element
				 * @type {*}
				 */
				time.innerHTML = this.timer.time;
			}

			/**
			 * addeventlistener to button
			 */
			document.getElementById('play').addEventListener('click', function() {

				/**
				 * create all parts
				 */
				this.create();

				/**
				 * recall cta
				 */
				this.cta();
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('help').addEventListener('click', function() {

				/**
				 * check info
				 */
				if(info.style.display != 'block') {

					/**
					 * set style info
					 * @type {string}
					 */
					info.style.display = 'block';
				}
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('more').addEventListener('click', function() {

				/**
				 * check info
				 */
				if(credits.style.display != 'block') {

					/**
					 * set style info
					 * @type {string}
					 */
					credits.style.display = 'block';
				}
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('share').addEventListener('click', function() {
				/**
				 * share on facebook
				 */
				window.open('http://www.facebook.com/sharer.php?s=100&p[title]=Hier de titel&p[summary]=Hier de tekst&p[url]='+Settings.Path);
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('retry').addEventListener('mouseup', function() {

				/**
				 * create all parts
				 */
				this.create();

				/**
				 * recall cta
				 */
				this.cta();
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('close_credits').addEventListener('click', function() {

				/**
				 * check info
				 */
				if(credits.style.display == 'block') {

					/**
					 * set style of credits
					 * @type {string}
					 */
					credits.style.display = 'none';
				}
			}.bind(this));

			/**
			 * addeventlistener to button
			 */
			document.getElementById('close_info').addEventListener('click', function() {

				/**
				 * check info
				 */
				if(info.style.display == 'block') {

					/**
					 * set style of info
					 * @type {string}
					 */
					info.style.display = 'none';
				}
			}.bind(this));
		}
	};

	window.World = World;

})();


