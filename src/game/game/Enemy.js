/**
 * Joueur
 */
define([
	"jquery",
    "src/utils/Config",
    "src/utils/assetsmanager/SpriteManager",
    "src/utils/assetsmanager/SoundManager",
    "src/utils/math/Vector2",
    "src/game/game/box/BoxManager",
	"src/game/game/component/Move"
],
function (
	$,
    Config,
    SpriteManager,
    SoundManager,
    Vector2,
    BoxManager,
    Move

) {
	var Enemy = function () {
        
        
		
	}
    
    Enemy.prototype.init = function(MapManager) {
        Move.addPositionUpdate(Enemy, Config, MapManager);
        this.MapManager = MapManager;
        
        this.name = "enemy";
        this.MapManager = MapManager;
        this.modifier = {
			currentCell: [
				[this.MapManager.cell.enemy, MapManager.cell.floor]
			],
			nextCell: [
				[this.MapManager.cell.floor, MapManager.cell.enemy]
			]
		}
        
        
        this.currentMap = this.MapManager.currentMap;
        //this.position = this.getEnemyPos();
        
        
        this.translateOffset = new Vector2(0, 0);
		this.idleSprite = SpriteManager.get("enemy").src;

		this.xOffset = 2;
		this.yOffset = 3;
		this.moveQueue  = [];
        this.position = this.getEnemyPos();
    }
    Enemy.prototype.pushData = function(enemyInfo) {
        this.delayTurns = [];
        this.pattern = enemyInfo.pattern;
        this.delay = 0;
        this.position = this.getEnemyPos();
    }




	Enemy.prototype.update = function () {
        if (this.position.x == -1 ||
			this.position.y == -1) {
			this.position = this.getEnemyPos();
		}
		if (this.MapManager.currentMap.length == 0) {
			this.position.x = -1;
			this.position.y = -1;
		}
		this.positionUpdate();
		this.fluidMovementUpdate();

	}
    
    Enemy.prototype.updateMap = function() {
        this.currentMap = this.MapManager.currentMap;
    }



	/**
	 * Gère le deplacement automatique avec le pathfinding
	 */
	Enemy.prototype.pathfindingUpdate = function () {
        if (this.moveQueue.length > 0) {
			if (Math.abs(this.translateOffset.x) + Math.abs(this.translateOffset.y) == 0) {
				var nextMove = this.moveQueue.shift();
				var nextDir = this.XYToDir(nextMove[0], nextMove[1])
				var moved = this.move(nextDir);
				if (moved) MapManager.actionIncrement();
			}
		}
		
	}


	/**
	 * Transforme une direction x, y en direction sous forme de string (Left, Right, up, down)
	 */
	Enemy.prototype.XYToDir = function (x, y) {
        /*
		var xOffset = x - this.position.x;
		var yOffset = y - this.position.y;
		var dirName = {
			"-1" : "left",
			"1" : "right",
			"0" : "none"
		}
		var nextDir = dirName[xOffset];
		if (nextDir == "none") {
			dirName = {
				"-1" : "up",
				"1" : "down",
			}
			nextDir = dirName[yOffset];
		}
		if (typeof nextDir == "undefined" || Math.abs(xOffset) + Math.abs(yOffset) >= 2) nextDir = false;
		return nextDir;
        */
	}


	/**
	 * Récupère la position du joueur
	 * Return Vector2 position x et y
	 */
	Enemy.prototype.getEnemyPos = function () {
		var currentMap = this.MapManager.currentMap;
		for (var i = 0; i < currentMap.length; i++) {
			if (currentMap[i] == this.MapManager.cell.enemy) {
				return new Vector2((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY));
			}
		}
		return new Vector2(-1, -1);
        
	}


	/**
	 * Fait bouger le joueur dans la direction donné si possible.
	 * @dir Direction, "left", "right", "up", "down" accepté.
	 * @y Permet de d'avoir la destination x, y. (Dans ce cas la, dir sera égale à x)
	 * Return True - Le deplacement a été effectué
	 *		  False - Le deplacement n'a pas été effectué (Collision)
	 */
	Enemy.prototype.move = function (dir) {

            var map = this.MapManager.currentMap;
			
            var xOffset = 0,
                yOffset = 0;
            if(typeof dir == "undefined") {
                dir = this.getNextMove();
            }
			
            switch(dir){
			
                case "left":
				
                    xOffset = -1;
					
                    break;
					
                case "right":
				
                    xOffset = 1;
					
                    break;
					
                case "up":
					
                    yOffset = -1;
				
                    break;
					
                case "down":
				
                    yOffset = 1;
					
                    break;
					
                default:
				
                    console.error("Mauvaise direction ! Accepté : left, right, up, down. Entré : " + dir)
					
                    break;
				
            }

			
            var canMove = true;
			
            var currentCellId = this.MapManager.getCellId(this.position.x, this.position.y);
			
            var currentCellValue = this.MapManager.getCellValue(this.position.x, this.position.y);
			
            var nextCellId = this.MapManager.getCellId(this.position.x + xOffset, this.position.y + yOffset);
			
            var nextCellValue = this.MapManager.getCellValue(this.position.x + xOffset, this.position.y + yOffset);

				// Si la nextCell est une box
			

                for (var i = 0; i < this.modifier.nextCell.length; i++) {
					if (this.modifier.nextCell[i][0] == nextCellValue) {
						map[nextCellId] = this.modifier.nextCell[i][1]
						canMove = true;
					}
				};

				if (!canMove) {
					this.MapManager.actionHistoryIndexDecrem();
					return false;
				}

				for (var i = 0; i < this.modifier.currentCell.length; i++) {
					if (this.modifier.currentCell[i][0] == currentCellValue) {
						map[currentCellId] = this.modifier.currentCell[i][1];
					}
				};

				this.position.x += xOffset;
				this.position.y += yOffset;
				this.translateOffset.x = xOffset * Config.mapWidth * -1;
				this.translateOffset.y = yOffset * Config.mapHeight * -1;

				// SoundManager.play("meow" + Math.floor(Math.random() * 15));
				SoundManager.play("playerMove");

				$("#enemy").css("background-image", "url(" + SpriteManager.get("enemy").src + ")");
                
                

                
                this.MapManager.update();
                this.update();
			

        
	}
    
    Enemy.prototype.getNextMove = function() {
        return this.pattern[(this.MapManager.actionCount - this.delay) % this.pattern.length];
    }
    
    Enemy.prototype.incrementDelay = function() {
        this.delay += 1;
        this.delayTurns.push(this.MapManager.actionCount);
    }


	return new Enemy();
});