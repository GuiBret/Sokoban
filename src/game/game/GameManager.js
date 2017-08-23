/*
* GameLoop du jeu. Stock les fonctions de base du jeu (Pause, resume)
*/
define([
	"jquery",
	"underscore",
	"src/utils/debug/Debug",
	"src/utils/debug/Stats",
	"src/utils/game/Time",
	"src/utils/display/GameContainer",
	"src/utils/assetsmanager/AnimationManager",
	"src/utils/loader/LoaderManager",
	"src/game/controller/Controller",
	"src/game/controller/Keyboard",
	"src/game/controller/GamePad",
	"src/game/game/Player",
	"src/game/ui/UIManager",
	"src/game/game/MapManager",
	"src/game/game/box/BoxManager",
	"src/game/game/Pathfinding",
	"src/game/server/Account",
    "src/game/game/Enemy"
],
function (
	$,
	_,
	Debug,
	Stats,
	Time,
	GameContainer,
	AnimationManager,
	LoaderManager,
	Controller,
	Keyboard,
	GamePad,
	Player,
	UIManager,
	MapManager,
	BoxManager,
	Pathfinding,
	Account,
    Enemy
) {
	var GameManager = function () {
		
	}


	/**
	 * Initialisation du jeu.
	 */
	GameManager.prototype.init = function () {
		Debug.success("GameManager initialised.");
		Stats.init();
		GameContainer.init();
		UIManager.init();
		Pathfinding.init();
		Controller.init();
		Keyboard.init();
		GamePad.init();
		Time.init();
		UIManager.addScreen("LoadScreen");
		Player.init();
		Account.init(UIManager);
		MapManager.init(Player);
        Enemy.init(MapManager);
		gameloop();
	}


	/**
	 * Execute toutes les updates des managers
	 */
	function update () {
        if (UIManager.currentScreen.indexOf("LoadScreen") != -1) {
            LoaderManager.update();
        }
        
        
		GamePad.update();
		AnimationManager.update();
		Player.update();
        
        if(MapManager.currentWorld == 2) {
            Enemy.update();    
        }
        
        
		BoxManager.update();
	}


	/**
	 * Execute toutes les collisions
	 */
	function collider () {

	}


	/**
	 * Met à jours les animations
	 */
	function animate () {

	}


	/**
	 * Permet d'updater les objets
	 */
	function render () {
		
	}


	/**
	 * Gameloop principal du jeu
	 */
	function gameloop () {
		Stats.begin();
		Time.updatedt();
		update();
		collider();
		animate();
		render();
		Stats.end();
		window.requestAnimationFrame(gameloop);
	}


	return new GameManager();
});