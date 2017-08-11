/**
 * Class GameScreen
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt"
],
function (
	SpriteManager,
	SoundManager,
	txt
) {
	var GameScreen = function () {

	}


	GameScreen.prototype.init = function (UIManager) {
        "use strict";
		//Container
        
        var start = window.performance.now();
		$("#screenContainer").append("<div id='GameScreen'></div>");

		//Background
		$("#GameScreen").css("background-image", "url(" + SpriteManager.get("GameScreenBackground").src + ")")
					  	.css("width", 1136)
					 	.css("height", 640)
					  	.css("background-size","100% 100%");

		/**
		 * hudSpecial
		 * - Title
		 * - Logos
		 */
		$("#GameScreen").append("<div id='hudSpecialText'>" + txt.get("LABEL_HUD_CAPACITE_TITLE") + "</div>");

		//unconsumedSpecial = Nombre de special (#TODO: à changer en fonction du niveau)
		var unconsumedSpecial = 3;

		$("#GameScreen").append("<div id='hudSpecialContainer'></div>")

		for (var i = 0; i < unconsumedSpecial; i++) {
			$("#hudSpecialContainer").append("<div class='hudSpecialLogo' id='specialLogo" + i + "'></div>");
			var hudSpecialOffset = 50 + 60 * i;
			$("#specialLogo" + i).css("left", hudSpecialOffset)
								 .css("background-image", "url(" + SpriteManager.get("hudSpecialLogo").src + ")");
		};


		/**
		 * hudTime
		 * #TODO: faire correspondre la seconde actuelle avec ce qui est dans la div avec l'id "hudTimeText"
		 */
		$("#GameScreen").append("<div id='hudTimeText'>20s</div>");

		/**
		 * hudActions
		 * #TODO: faire correspondre les Actions avec le réel nombre d'action id = "hudActionNumberText"
		 */
		$("#GameScreen").append("<div id='hudActionContainer'></div>")
		$("#hudActionContainer").append("<div id='hudActionTitleText'>" + txt.get("LABEL_HUD_ACTION_TITLE") + "</div>");
		$("#hudActionContainer").append("<div id='hudActionNumberText'>12</div>");
        
        console.log(window.performance.now() - start);
	}
	return new GameScreen();
});