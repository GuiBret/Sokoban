var testsMapManager = function(MapManager) {
    var _runSpecs = function() {
        describe("MapManager", function() {
            
            beforeEach(function(done) {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
                MapManager.currentWorld = /level(\d)-\w+/.exec("level1-1")[1];
                MapManager.levelNum = parseInt(/level\d-(\d+)/.exec("level1-1")[1]);
                $.get("assets/map/level1-1.json?v=1.1"
                , function(data) {
                
                MapManager.map = data;
                MapManager.loadMap();
                done();
    
                }.bind(this))
                
                spyOn(MapManager, "getMap");
            });
                
            
            
            describe("MapManager.getCellValue", function() {
                it("should return a void value (0) when trying to get the cell value of the origin", function() {
                    
                    expect(MapManager.getCellValue(0,0)).toBe(0);    
                });
                
                
            });
            
            describe("MapManager.getCellId", function() {
                it("should return 35 when trying to get the id of the cell in coordinates [2,3]", function() {
                    expect(MapManager.getCellId(3,3)).toBe(36);    
                });
                
                
            });    
        });
        
    };
    return {runSpecs : _runSpecs};

    
}
    
    


define(["src/game/game/MapManager"], testsMapManager);