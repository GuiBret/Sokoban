/* istanbul ignore define */

var startModule = function($, specsGameManager, specsPlayer, specsTxt, specsAccount, specsMapManager, specsEnemy) {
    function RunTests() {
 specsGameManager.runSpecs();
        specsPlayer.runSpecs();
        specsTxt.runSpecs();   
        specsAccount.runSpecs();
        specsMapManager.runSpecs();
        specsEnemy.runSpecs();
    }    
    RunTests();
};
/* istanbul ignore next */
define(['jquery', "TestsGameManager", "TestsPlayer", "TestsTxt", "TestsAccount", "TestsMapManager", "TestsEnemy"], startModule);

