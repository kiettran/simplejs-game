(function() {

	var Settings = {};

	/**
	 * set path
	 * @type {string}
	 */
	Settings.Path = 'http://cmd.kiettran.nl/flygame';

	/**
	 * set size
	 * @type {number}
	 */
	Settings.Width = window.innerWidth;
	Settings.Height = window.innerHeight;

	/**
	 * set FPS
	 * @type {number}
	 */
	Settings.FPS = 60;

	/**
	 * set gamestate
	 * @type {string}
	 */
	Settings.Gamestate = 'Start';

	/**
	 * set control settings
	 * @type {number}
	 */
	Settings.ButtonLeft = 37;
	Settings.ButtonUp = 38;
	Settings.ButtonRight = 39;
	Settings.ButtonDown = 40;

	/**
	 * factors
	 * @type {number}
	 */
	Settings.RotateFactor = 2;
	Settings.SpeedFactor = 0.1;
	Settings.MaxSpeed = 3;
	Settings.MaxVelocity = 5;

	/**
	 * set character bitmap
	 * @type {string}
	 */
	Settings.CharacterSprite = Settings.Path+'/img/character.png';
	Settings.ElementSprite = [
		{
			'img': Settings.Path+'/img/enemy.png',
			'attr': 'enemy',
			'points': 100
		},
		{
			'img': Settings.Path+'/img/allied.png',
			'attr': 'allied',
			'points': 50
		}
	];

	/**
	 * set max amount random elements
	 * @type {number}
	 */
	Settings.ElementAmount = 5;

	/**
	 * set score amount for transform character
	 * @type {number}
	 */
	Settings.ScoreAmount = 50;

	/**
	 * set min score
	 * @type {number}
	 */
	Settings.MinScore = -200;

	window.Settings = Settings;

})();