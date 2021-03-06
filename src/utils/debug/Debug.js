/**
 * La class debug permet d'apporter des fonctions supplémentaire pour le debuggage (log, sucess, warn, error)
 */
define([
	"datgui",
	"src/utils/Config",
	"src/game/ui/UIManager",
	"src/game/game/MapManager",
	"src/game/game/Pathfinding",
	"src/utils/math/Vector2"
],
function (
	dat,
	Config,
	UIManager,
	MapManager,
	Pathfinding,
	Vector2
) {
	/*
	 * Initialisation du gui de debug
	 * Pour acceder à une valeur taper Debug.gui.variable
	 */
	var Debug = function () {
		if (Config.guiDebug) {
			// Initialisation de datgui
			// http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
			this.datgui = new dat.GUI();
			this.guiOption = function () {
				this.textInput = 0.5;
				this.radioBox = true;
				this.addLoadScreen = function () {
					UIManager.addScreen("LoadScreen");
				};
				this.addLoginScreen = function () {
					UIManager.addScreen("Login");
				};
				this.addMenuScreen = function () {
					UIManager.addScreen("Menu");
				};
				this.closeScreen = function () {
					UIManager.closeScreen();
				};
				this.closeScreenLogin = function () {
					UIManager.closeScreen("Login", true);
				};
				this.loadMap = function () {
					MapManager.loadMap("level1");
				};
				this.removeMap = function () {
					MapManager.removeMap();
				};
				this.pathfinding = function () {
					var pos1 = new Vector2(1, 7);
					var pos2 = new Vector2(6, 2);
					var map = MapManager.currentMap;
					var result = Pathfinding.find(pos1, pos2, map);
				};
				this.addWrongPassword = function () {
					UIManager.addScreen("WrongPassword", true);
				};
				this.addGoodPassword = function () {
					UIManager.addScreen("GoodPassword");
				};
				this.addAccountCreated = function () {
					UIManager.addScreen("AccountCreated");
				};
				this.addNeedPasswordAndLogin = function () {
					UIManager.addScreen("NeedPasswordAndLogin");
				};
				this.addHighScore = function () {
					UIManager.addScreen("HighScore");
				};
				this.addHelp = function () {
					UIManager.addScreen("Help");
				};

			}
			this.gui = new this.guiOption();
			this.datgui.add(this.gui, "textInput");
			this.datgui.add(this.gui, "radioBox");
			this.datgui.add(this.gui, "addLoadScreen");
			this.datgui.add(this.gui, "addLoginScreen");
			this.datgui.add(this.gui, "addMenuScreen");
			this.datgui.add(this.gui, "closeScreen");
			this.datgui.add(this.gui, "closeScreenLogin");
			this.datgui.add(this.gui, "loadMap");
			this.datgui.add(this.gui, "removeMap");
			this.datgui.add(this.gui, "pathfinding");
			this.datgui.add(this.gui, "addWrongPassword");
			this.datgui.add(this.gui, "addGoodPassword");
			this.datgui.add(this.gui, "addAccountCreated");
			this.datgui.add(this.gui, "addNeedPasswordAndLogin");
			this.datgui.add(this.gui, "addHighScore");
			this.datgui.add(this.gui, "addHelp");
		}
	}


	/**
	 * Envoi un message normal (noir) dans la console
	 */
	Debug.prototype.log = function (msg) {
		if (Config.debug) console.log(msg);
	}


	/**
	 * Envoi un message en vert dans la console
	 */
	 Debug.prototype.success = function (msg) {
	 	if (Config.debug) console.log("%c" + msg, "color:green;");
	 }


	/**
	 * Envoi un message orange dans la console
	 */
	Debug.prototype.warn = function (msg) {
		if (Config.debug) console.warn(msg);
	}


	/**
	 * Envoi un message rouge dans la console
	 */
	Debug.prototype.error = function (msg) {
		if (Config.debug) console.error(msg);
	}


	return new Debug();
});