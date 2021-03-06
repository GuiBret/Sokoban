/**
 * Class qui gère le undo / redo du jeu
 */
define([
	"src/utils/assetsmanager/SpriteManager"
],
function (
	SpriteManager
) {
	var Undoredo = function () {

	}


	/**
	 * Ajoute la fonction undo redo
	 */
	Undoredo.prototype.add = function (Object) {

		var obj = Object.prototype;

		obj.actionHistory = {
			index: -1,
			list: []
		};
        
        obj.enemyActionHistory = {
            index: -1,
            list: []
        }

		// Opposé des directions
		obj.moveReverse = {
			"left" : "right",
			"right" : "left",
			"up" : "down",
			"down" : "up"
		}

		obj.undo = function () {
			if (this.actionHistory.index < 0) return false; 
			var index = this.actionHistory.index;
			var currAction;
			var direction;
            
            if(this.currentWorld == 2) {
                for (var i = this.enemyActionHistory.list[index].length - 1; i >= 0; i--) {
				
                    currAction = this.enemyActionHistory.list[index][i];
                    
                    console.log(currAction.param);
			
                    if (currAction.type == "move") {
					   direction = this.moveReverse[currAction.param]
                        this.Enemy.move(direction, false);
				    }    
            }
            
            
			for (var i = this.actionHistory.list[index].length - 1; i >= 0; i--) {
				currAction = this.actionHistory.list[index][i];
                console.log(currAction.param);
				if (currAction.type == "move") {
					direction = this.moveReverse[currAction.param]
					currAction.ref.move(direction, false);
				}
				if (currAction.type == "eat") {
					this.currentMap[currAction.param] = this.cell.wall;
					$("#tile" + currAction.param).css("background-image", "url(" + SpriteManager.get("wall").src + ")");
					this.Player.eatPower++;
				}
                
                
			};
            
            
                
                
			};
            
			this.actionDecrement();
			this.actionHistoryIndexDecrem();
            this.enemyActionHistoryIndexDecrem();
		}

		obj.redo = function () {
			if (this.actionHistory.index + 1 >= this.actionHistory.list.length) return false;
			var index = this.actionHistory.index + 1;
			var currAction;
			for (var i = 0; i < this.actionHistory.list[index].length; i++) {
				currAction = this.actionHistory.list[index][i];
				if (currAction.type == "move") {
					currAction.ref.move(currAction.param, false);
				}
				if (currAction.type == "eat") {
					this.currentMap[currAction.param] = this.cell.floor;
					$("#tile" + currAction.param).css("background-image", "url(" + SpriteManager.get( $("#tile" + currAction.param).data().floorColor ).src + ")");
					this.Player.eatPower--;
				}
			};
            
            if(this.currentWorld == 2) {
                for (var i = this.enemyActionHistory.list[index].length - 1; i >= 0; i--) {
				
                    currAction = this.enemyActionHistory.list[index][i];
			
                    if (currAction.type == "move") {
					   direction = this.moveReverse[currAction.param]
                        this.Enemy.move(currAction.param, false);
				    }    
                }
            }
			this.actionIncrement();
			this.actionHistoryIndexIncrem();
            this.enemyActionHistoryIndexIncrem();
		}

		/**
		 * Ajoute une action à l'index spécifier dans la chronologie de l'historique
		 * @action Objet contenant :
		 * 		ref - Reference vers l'objet qui a fait une action (player, box ...)
		 * 		type - Type de l'action (eat, move)
		 * 		param - Si le type est "move" cela correspond à la direction correspondante. (Up, down, right, left)
		 *				Si le type est "eat" cela correspond à la case qui a été mangé
		 */
		obj.addAction = function (action) {
			var i = this.actionHistory.index;
			if (typeof this.actionHistory.list[i] == "undefined") this.actionHistory.list[i] = [];
			this.actionHistory.list[i].push(action);
			this.actionHistory.list.splice(i + 1);
		}
        
        obj.addEnemyAction = function(action) {
            var i = this.enemyActionHistory.index;
			if (typeof this.enemyActionHistory.list[i] == "undefined") this.enemyActionHistory.list[i] = [];
			this.enemyActionHistory.list[i].push(action);
			this.enemyActionHistory.list.splice(i + 1);
        }

		/**
		 * Increment l'index dans la chronologie
		 */
		obj.actionHistoryIndexIncrem = function () {
			this.actionHistory.index++;
		}
        
        obj.enemyActionHistoryIndexIncrem = function () {
			this.enemyActionHistory.index++;
		}

		/**
		 * Decrement l'index dans la chronologie
		 */
        obj.actionHistoryIndexDecrem = function () {
			this.actionHistory.index--;
		}
		obj.enemyActionHistoryIndexDecrem = function () {
			this.enemyActionHistory.index--;
		}
        

		obj.resetActionHistory = function () {
			this.actionHistory = {
				index: -1,
				list: []
			};
		}
        
        obj.resetEnemyActionHistory = function() {
            this.enemyActionHistory = {
				index: -1,
				list: []
			};
        }
	}


	return new Undoredo();
});