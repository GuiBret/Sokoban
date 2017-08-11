/*
 * Gère les differents écrans de jeu (Menu, loadScreen, GameStage)
 */
define([
	"src/utils/Config",
	"src/game/ui/GameStage",
	"src/game/ui/LoadScreen",
	"src/game/ui/Login",
	"src/game/ui/Menu",
	"src/game/ui/About",
	"src/game/ui/Options",
	"src/game/ui/LevelSelect",
	"src/game/ui/WrongPassword",
	"src/game/ui/GoodPassword",
	"src/game/ui/AccountCreated",
	"src/game/ui/NeedPasswordAndLogin",
	"src/game/ui/HighScore",
	"src/game/ui/Help",
    "src/game/ui/WorldSelect"
],
function (
	Config,
	GameStage,
	LoadScreen,
	Login,
	Menu,
	About,
	Options,
	LevelSelect,
	WrongPassword,
	GoodPassword,
	AccountCreated,
	NeedPasswordAndLogin,
	HighScore,
	Help,
     WorldSelect
) {
	var UIManager = function () {
		
	}


	UIManager.prototype.init = function () {
		this.currentScreen = [];
		$("#gameContainer").append("<div id='screenContainer'></div>")
	}


	/**
	 * Ajoute un nouveau contenu d'écran dans le gameContainer
	 */
	UIManager.prototype.addScreen = function (name, fade, world) {
        $("head").append(`<link rel="stylesheet" type="text/css" href="css/${name}.css" />`);
        
		if (typeof fade == "undefined") fade = false;
        
        var $this = this;
        setTimeout(function() {
            if(name === "LevelSelect") {
                eval(name).init($this, world);    
            } else {
                eval(name).init($this);
            }
            
            $this.currentScreen.push(name);
        
        
		if (fade) {
			$("#" + name).hide();
			$("#" + name).fadeIn(Config.changeScreenFadeDelay);
		}
            
        }, 10, $this, name);
		
	}


	/**
	 * Vide le gameContainer.
	 */
	UIManager.prototype.closeScreen = function (name, fade) {
		if (typeof fade == "undefined") fade = false;
        

		if (typeof name == "undefined") {
			$("#screenContainer").html("");
			this.currentScreen = [];
		} else {
			this.currentScreen.splice(this.currentScreen.indexOf(name), 1);
            
			if (fade) {
				$("#" + name).fadeOut(Config.changeScreenFadeDelay, function () {
                    $(`link[rel=stylesheet][href="css/${name}.css"]`).remove();
					$("#" + name).remove();
				})
			} else {
				$("#" + name).remove();
			}
            
            
		}
	}


	return new UIManager();
});