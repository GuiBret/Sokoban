/**
 * Class qui permet de charger les maps
 */
define([
	"jquery",
	"src/game/ui/UIManager",
	"src/utils/Config",
	"src/game/server/Account",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/math/Vector2",
	"src/game/game/component/Undoredo",
	"src/game/game/box/Box",
	"src/game/game/box/BoxManager",
	"src/utils/localization/txt",
    "src/game/game/Enemy"

],
function (
       
	$,
	UIManager,
	Config,
	Account,
	SoundManager,
	SpriteManager,
	Vector2,
	Undoredo,
	Box,
	BoxManager,
	txt,
    Enemy
) {
	var MapManager = function () {
		this.currentMap = [];
		this.cell = {
			void: 0,
			floor: 1,

			floorRed: 1,
			floorOrange: 2,
			floorYellow: 3,
			floorGreen: 4,
			floorBlue: 5,
			floorPurple: 6,

			wall: 7,
			goal: 8,

			sideIntNO: 9,
			sideIntNE: 10,
			sideIntSO: 11,
			sideIntSE: 12,

			sideLineS: 13,
			sideLineN: 14,
			sideLineO: 15,
			sideLineE: 16,

			sideExtNO: 17,
			sideExtNE: 18,
			sideExtSO: 19,
			sideExtSE: 20,

			box: 21,
			boxOnGoal: 22,
			player: 23,
			playerOnGoal: 24,
            enemy:25
		}

		this.floorColor = [
			"floorRed",
			"floorOrange",
			"floorYellow",
			"floorGreen",
			"floorBlue",
			"floorPurple"
		];
	}


	MapManager.prototype.init = function (Player) {
        "use strict";
        
		this.Player = Player;
        this.Enemy = Enemy;
        
	}


	MapManager.prototype.update = function () {
        "use strict";
		
        
		for (var i = 0; i < 3; i++) {
			if (this.Player.eatPower > i) {
				$("#specialLogo" + i).show();
			} else {
				$("#specialLogo" + i).hide();
			}
			if (this.Player.eatPower == 0) {
				$("#specialLogo0").show();
				$("#specialLogo0").text(txt.get("LABEL_HUD_EMPTYSKILL"));
				$("#specialLogo0").css("margin-left", 45)
								  .css("background-image", "");
			} else {
				$("#specialLogo0").text("");
				$("#specialLogo0").css("margin-left", 0)
								  .css("background-image", "url(" + SpriteManager.get("hudSpecialLogo").src + ")");
			}
		};
        

		if ($("#mapContainer").length > 0 && this.currentMap.length > 0) {
			var won = true;
			for (var i = 0; i < this.currentMap.length; i++) {
				if (this.currentMap[i] == this.cell.box) {
					var won = false;
				}
			};
			if (won) {
				var score;
				score = this.actionCount > this.levelPar ? 1 : 2;
				Account.addScore(this.levelNum, score);
				
				//alert("Bravo, tu as gagné.\nTon nombre d'action :" + this.actionCount + "\nLe par du niveau :" + this.levelPar + "\nTon score : " + score + "\nDev tip: Message temporaire");
				if ((this.currentWorld == 1 &&this.levelNum + 1 == 16) || this.currentWorld == 2 && this.levelNum + 1 == 4)  {
				//	alert("Bravo, tu as fini le jeu");
					
				} else {
					this.removeMap('level' +this.currentWorld + "-" + (this.levelNum + 1));
				}
			}
		}
	}


	/**
	 * Charge une map et l'affiche sur le jeu
	 */
	MapManager.prototype.loadMap = function () {
        'use strict';

		this.resetActionHistory();
		this.currentMap = [];
        this.enemies = [];
        
        
		this.actionCount = 0; // Nombre d'action effectué par le joueur (deplacement, undo, redo)




		this.levelStartDate = Date.now();
        setInterval(this.updateTime.bind(this), 1000);
		
		this.musicList = [
			"",
			"nyan_multigenre", // 1 - 5
			false,
			false,
			false,
			false, 

			"nyan_8bit", // 6 - 10
			false,
			false,
			false,
			false,

			"nyan_part_trance", // 11 - 15
			"nyan_part_rock",
			"nyan_part_electro",
			"nyan_part_dubstep",
			"nyan_part_drumandbass"
		];

		var musicToPlay = this.musicList[this.levelNum];
		musicToPlay ? SoundManager.play(musicToPlay, true) : null;
        
		var imageName = "",
            cellName,
            i,
            mouseUpEvent = function (event) {
				var clickX = event.data.i % Config.mapSizeX;
				var clickY = Math.floor(event.data.i / Config.mapSizeY);
				var nextDir = event.data.Player.XYToDir(clickX, clickY);
				var moved = false;
				if (nextDir != false) {
                    
					moved = event.data.Player.move(nextDir);
                    console.log(moved);
				} else {
					moved = event.data.Player.move(clickX, clickY);
				}
				if (moved) event.data.MapManager.actionIncrement();
				
			};
        
		Config.mapSizeX = Math.sqrt(this.map.layers[0].data.length);
		Config.mapSizeY = Math.sqrt(this.map.layers[0].data.length);

		$("#gameContainer").append("<div id='mapContainer'></div>")

		this.levelPar = this.map.properties.par;
		$("#hudParNumberText").text(this.levelPar);
		this.Player.eatPower = parseInt(this.map.properties.eatPower) || 0;
		
        
		for (var i = 0; i < this.map.layers[0].data.length; i++) {

			if (this.map.layers[0].data[i] >= this.cell.floorRed ||
				this.map.layers[0].data[i] <= this.cell.floorPurple) {
				this.map.layers[0].data[i] == this.cell.floor;
			}

			this.currentMap.push(this.map.layers[0].data[i]);

			for (cellName in this.cell){
				if (this.cell[cellName] == this.map.layers[0].data[i]) {
					imageName = cellName;
				}
			}

			var floorImageName = this.floorColor[Math.floor(i / Config.mapSizeY) % this.floorColor.length];

			switch (this.map.layers[0].data[i]) {
				case this.cell.floorRed:
				case this.cell.floorOrange:
				case this.cell.floorYellow:
				case this.cell.floorGreen:
				case this.cell.floorBlue:
				case this.cell.floorPurple:
				case this.cell.floor:
					imageName = floorImageName;
					break;
				case this.cell.box:
					imageName = floorImageName;
					new Box((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY), false, this, this.Player);
					break;
				case this.cell.boxOnGoal:
					imageName = "goal";
					new Box((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY), true, this, this.Player);
					break;
				case this.cell.playerOnGoal:
					imageName = "goal";
					break;
				case this.cell.player:
                case this.cell.enemy:
					imageName = floorImageName;
					break;
			}
			
			if (this.map.layers[0].data[i] == this.cell.playerOnGoal ||
				this.map.layers[0].data[i] == this.cell.player) {
				$("#mapContainer").append("<div id='player'></div>")
					$("#player").css("background-image", "url(" + SpriteManager.get("player").src + ")")
								.css("width", 141 * Math.max(Config.mapWidth, Config.mapHeight) / 110)
								.css("height", 87 * Math.max(Config.mapWidth, Config.mapHeight) / 110);
			}
            
            if(this.map.layers[0].data[i] == this.cell.enemy) {
                console.log("Coucou");
                $("#mapContainer").append("<div id='enemy'></div>")
					$("#enemy").css("background-image", "url(" + SpriteManager.get("enemy").src + ")")
								.css("width", 55)
								.css("height", 55);
                
            }

			$('#mapContainer').append('<div id="tile' + i + '" class="' + imageName + ' tile"></div>');
			$('#tile' + i).css("background-image", "url(" + SpriteManager.get(imageName).src + ")");
			$('#tile' + i).css("left", Config.mapWidth * (i % Config.mapSizeX))
						  .css("top", Config.mapHeight * Math.floor(i / Config.mapSizeY))
						  .css("width", Config.mapWidth)
						  .css("height", Config.mapHeight)
						  .data("floorColor", floorImageName);
            
            
           $('#tile' + i).mouseup({MapManager:this, i:i, Player:this.Player}, mouseUpEvent);
			

			$('#tile' + i).hide();
			setTimeout((function (id) {
				return function () {
					$('#tile' + id).fadeIn(400);
				};
			})(i), Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin));
		}
        
        $("#hudActionNumberText").text(0); // Reset du nombre d'actions

        if(this.currentWorld == 2) {
            Enemy.pushData(this.map.enemies);    
        }
        

	}


	/**
	 * Incremente le compteur d'action de player
	 */
	MapManager.prototype.actionIncrement = function () {
        "use strict";
		this.actionCount++;
		$("#hudActionNumberText").text(this.actionCount);
	}


	/**
	 * Incremente le compteur d'action de player
	 */
	MapManager.prototype.actionDecrement = function () {
        "use strict";
		this.actionCount--;
		$("#hudActionNumberText").text(this.actionCount);
	}


	/**
	 * Détruit la map actuel
	 * @mapName String - Nom de la map à charger après le remove
	 */
	MapManager.prototype.removeMap = function (mapName) {
        "use strict";
		if (typeof mapName == "undefined") mapName = false;
		

		var mapLength = this.currentMap.length;
		this.currentMap = [];
		BoxManager.destroyAll();

		for (var i = 0; i < mapLength; i++) {
			setTimeout((function (id) {
				return function () {
					$('#tile' + id).fadeOut(400, function () {
						$('#tile' + id).remove();
					});
				};
			})(i), Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin));
		}

		setTimeout((function (MapManager, mapName) {
			return function () {
				if (mapName != false) {
					$("#mapContainer").remove();
					MapManager.getMap(mapName);
				}
			}
		})(this, mapName), Config.fadeInMax + 400 * 2);

	}


	/**
	  * Return la valeur d'une case
	  * @x Abcisse de la case
	  * @y Ordonnée de la case
	  */
	MapManager.prototype.getCellValue = function (x, y) {
		if (x < 0 || x > Config.mapSizeX - 1 || y < 0 || y > Config.mapSizeY - 1) return this.cell.wall;
		return this.currentMap[(y % Config.mapSizeX) * Config.mapSizeX + x];
	}


	/**
	 * Retourne l'id de la case se trouvant à la position x et y
	 */
	MapManager.prototype.getCellId = function (x, y) {
		return (y % Config.mapSizeX) * Config.mapSizeX + x;
	}
    
    MapManager.prototype.updateTime = function() {
        $("#hudTimeText").text(Math.floor((Date.now() - this.levelStartDate) / 1000) + " s");
        
    }
    
    MapManager.prototype.getMap = function(mapName) {
        "use strict";

        this.currentWorld = /level(\d)-\w+/.exec(mapName)[1];
        this.levelNum = parseInt(/level\d-(\d+)/.exec(mapName)[1]);
        
        $.get("assets/map/" +mapName +".json?v=1.1"
              , function(data) {
                this.map = data;
                this.loadMap();
        }.bind(this)).fail(function(e,f) {
        }).always(function() {
        
        });
        
    }
	

	return new MapManager();

    
});