var runTests = function(Player, MapManager, SpriteLoader, Vector2, SoundLoader) {
    var _runSpecs = function() {
        
        beforeAll(function() {
            MapManager.init();
            SpriteLoader.init();
           Player.init(); 
            MapManager.Player = Player;
            
            
            SoundLoader.init();
           
        });
        
        describe("Player", function() {
            
            describe("Player", function() {
                it("should return up (1,1) => (1,0)", function() {
                    Player.position = new Vector2(1, 1);

                    expect(Player.XYToDir(1,0)).toEqual("up");
                });
                it("should return down (1,1) => (1,2)", function() {
                    Player.position = new Vector2(1, 1);

                    expect(Player.XYToDir(1, 2)).toEqual("down");
                });
                it("should return left (1,1) => (0,1)", function() {
                    Player.position = new Vector2(1, 1);

                    expect(Player.XYToDir(0,1)).toEqual("left");
                });
                it("should return right (1,1) => (2,1)", function() {
                    Player.position = new Vector2(1, 1);


                    expect(Player.XYToDir(2,1)).toEqual("right");
                });
                


            });
            
            
            
            describe("Player.move", function() {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                beforeAll(function(done) {
                   MapManager.currentWorld = /level(\d)-\w+/.exec("level1-1")[1];
                    MapManager.levelNum = parseInt(/level\d-(\d+)/.exec("level1-1")[1]);
        
                    $.get("assets/map/level1-1.json?v=1.1"
                    , function(data) {
                
                        MapManager.map = data;
                        MapManager.loadMap();
                        done();
    
                    }.bind(this)).fail(function(e,f) {
        
                    }).always(function() {
        
    
                    });
                
                }, 5000);
                

                
                it("should go right", function() {
                    Player.position = Player.getPlayerPos();
                    
                            Player.move("right");
                            expect(Player.position).toEqual(new Vector2(3,4));

                            Player.translateOffset.x = 0;
                            Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)
                            Player.move("left");
                            expect(Player.position).toEqual(new Vector2(2,4));
                    
                            Player.translateOffset.x = 0;
                            Player.translateOffset.y = 0; // Reset des translateoffsets (on n'en a pas besoin ici de toute façon)

                    
                    
                });
                
                it("should be blocked", function() {
                    expect(Player.move("left")).toEqual(false);
                });
                
            })
        });

        
    }
    
    return {runSpecs : _runSpecs};
    
}


define(["src/game/game/Player", "src/game/game/MapManager", "src/utils/loader/SpriteLoader", "src/utils/math/Vector2", "src/utils/loader/SoundLoader"], runTests);