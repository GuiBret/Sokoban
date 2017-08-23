

var testsGameManager = function(GameContainer, UIManager) {
    var _runSpecs = function() {
        describe("GameManager", function() {
            
            
            beforeEach(function() {
                $("body").append($("<div id='gameContainer'></div>"));
                GameContainer.init();
                UIManager.init();
            })
            
            it("should check GameManager's called objects attributes after launch", function() {
                expect(GameContainer.width).toBe(1136); 
                expect(GameContainer.height).toBe(640);
            });
                
        });
        
    };
    
    return {runSpecs : _runSpecs};
}
/* istanbul ignore define */
define(["src/utils/display/GameContainer", "src/game/ui/UIManager"], testsGameManager);