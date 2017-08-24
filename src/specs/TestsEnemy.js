var testsEnemy = function(Enemy, MapManager, Player, Vector2) {
    var _runSpecs = function() {
        
        
        
        describe("Enemy", function() {
            beforeEach(function(done) {
                MapManager.init(Player);
                MapManager.Enemy = Enemy;


                MapManager.currentWorld = /level(\d)-\w+/.exec("level2-1")[1];
                MapManager.levelNum = parseInt(/level\d-(\d+)/.exec("level2-1")[1]);

                $.get("assets/map/level2-1.json?v=1.1"
                , function(data) {
                    MapManager.map = data;
                    Enemy.init(MapManager);
                    MapManager.loadMap();

                    Enemy.updateMap();
                    Player.init();
                    done();



                }.bind(this))
            });
 

                describe("Enemy.getEnemyPos", function() {
                    it("should return the enemy's position as [4,5]", function() {
                        Enemy.updateMap(); 

                        expect(Enemy.getEnemyPos()).toEqual(new Vector2(4,5));    
                    });
                    
                    it("should block the enemy when facing the player", function() {
                        
                        Player.move("up");
                        MapManager.actionIncrement();
                        
                        Player.translateOffset.x = 0;
                        Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
                        
                        Player.move("right");
                        MapManager.actionIncrement();
                        
                        Player.translateOffset.x = 0;
                        Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
          
                        Player.move("up");
                        MapManager.actionIncrement();
                        
                        Player.translateOffset.x = 0;
                        Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
                                            
                        Player.move("up");
                        MapManager.actionIncrement();
                        
                        expect(Enemy.getEnemyPos()).toEqual(new Vector2(3,6));
                        expect(Enemy.delay).toEqual(1);
                    })
                    
                });
            
            describe("Enemy.getNextMove", function() {
                it("should predict the next moves (left, down, down)", function() {
                    expect(Enemy.getNextMove()).toEqual("left");
                    Player.move("right");
                    
                    MapManager.actionIncrement();
                        
                    Player.translateOffset.x = 0;
                    Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
                    
                    expect(Enemy.getNextMove()).toEqual("down");
                    Player.move("right");
                    
                    MapManager.actionIncrement();
                        
                    Player.translateOffset.x = 0;
                    Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
                    
                    
                    expect(Enemy.getNextMove()).toEqual("down");
                });
            });
        });
    
        
    }
    return { runSpecs : _runSpecs};
}


define(["src/game/game/Enemy", "src/game/game/MapManager", "src/game/game/Player", "src/utils/math/Vector2"], testsEnemy);