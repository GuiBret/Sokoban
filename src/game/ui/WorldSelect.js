/**
 * Class worldSelect
 */
define([
	"jquery",
	"jquery-ui",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/utils/Config",
	"src/game/server/Account",
	"src/game/game/MapManager"
],
function (
	$,
	ui,
	SpriteManager,
	SoundManager,
	txt,
	Config,
	Account,
	MapManager
) {
	var WorldSelect = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	WorldSelect.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='WorldSelect' class='popUp'></div>");
        
		$("#blackScreen").show();

		$("#screenContainer #WorldSelect").css("background-image", "url(" + SpriteManager.get("popUp").src + ")");
        
		$("#WorldSelect").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#WorldSelect .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
        
        $("#WorldSelect").append("<div id='WorldList'></div>");

		/**
		 * Bouton de fermeture du popUp
		 */
		// Hover
		$( "#WorldSelect .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#WorldSelect .buttonClose").mousedown(function() {
			$("#WorldSelect .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
										  .css("padding-top", 12);
		});

		$("#WorldSelect .buttonClose").mouseup(function() {
			$("#WorldSelect .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("WorldSelect", true);
		});

		$("#WorldSelect").append("<div id='descTitleWorldSelect'>" + txt.get("LABEL_POPUP_WORLDSELECT_DESCTITLE") + "</div>");

		/**
		 * Bouton de selection de niveau
		 */
		var className = false,
            starName = null,
            className = "btnWorld",	
            btnStatic = "btnLevelStatic",
            btnSurvol = "btnLevelSurvol",
            btnPress = "btnLevelPress",
            mouseUpSound = "meow14",
            score = null,
            starEffectMin = 1000,
            starEffectMax = 10000;

		for (var i = 1; i <= 2; i++) {

            
            var worldList = $("#WorldList");
            $("#WorldList").append("<div id='btnWorld" + i + "' class='btn " + className + "'><span>" + i + "</span></div>");

			$("#btnWorld" + i).hide();
			$("#btnWorld" + i).show("puff");

			$("#btnWorld" + i).css("margin-left", (i - 1) % 5 * 100);
			$("#btnWorld" + i).css("margin-top", Math.floor((i - 1) / 5) * 70);
			$("#btnWorld" + i).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")");

			// Star append
			

			// Hover
			$( "#btnWorld" + i).hover(function() {
                    
                    
                if($( this ).find("span").html() === "2") {
                    
                    $( this ).css("background-image", "url(" + SpriteManager.get(btnSurvol).src + ")");				   
                    $("#btnLevel" + i).css("background-repeat", "no-repeat");
                    $("#WorldSelect").css("filter", "hue-rotate(-115deg)");  
                    SoundManager.play("nyan_metal", true);
                    
                }
				
            }, function () {
                    $("#WorldSelect").css("filter", "");
					$( this ).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")");
                    SoundManager.play("nyan_elevator", true);
				}
            );

			// Active
			$( "#btnWorld" + i).mousedown((function(id, btnPress) {
				return function () {
					$(this).css("background-image", "url(" + SpriteManager.get(btnPress).src + ")")
				}
			})(i, btnPress));

			$("#btnWorld" + i).mouseup((function(id, btnStatic, mouseUpSound) {
				return function () {
                    var world = $(this).find("span").html();
                    $(this).css("background-image", "url(" + SpriteManager.get(btnStatic).src + ")")
							.css("padding-top", 0);

					if (btnStatic != "btnLock") {
						$("#blackScreen").hide();
						UIManager.closeScreen("WorldSelect", true);
						UIManager.addScreen("LevelSelect", true, world);
					}
					SoundManager.play(mouseUpSound);
				}
			})(i, btnStatic, mouseUpSound));
		};
        

	}

	
	return new WorldSelect();
});