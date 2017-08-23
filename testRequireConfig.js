define(function() {
    var rconfig = {
        baseUrl : "",
	paths : {
		"jquery" : "libs/jquery/jquery.min",
		"jquery-ui" : "libs/jquery-ui/jquery-ui.min",
		"howler" : "libs/howler.min",
		"underscore" : "libs/underscore-min",
		"pathfinding" : "libs/pathfinding-browser.min",
		"stats" : "libs/debug/stats.min",
		"datgui" : "libs/debug/dat.gui.min",
        'jasmine': 'lib/jasmine-2.7.0/jasmine',
        'jasmine-html': 'lib/jasmine-2.7.0/jasmine-html',
        'jasmine-boot': 'lib/jasmine-2.7.0/boot',
        'TestsGameManager': 'src/specs/TestsGameManager',
        "boot": "start",
        "GameManager": 'src/game/game/GameManager',
        "Game": 'src/game/Game',
        "SoundManager": "src/utils/assetsmanager/SoundManager",
        "txt": "src/utils/localization/txt",
        "TestsTxt": "src/specs/TestsTxt",
        "Config": "src/utils/Config",
        "TestsPlayer": "src/specs/TestsPlayer",
        "TestsAccount": "src/specs/TestsAccount",
        "TestsMapManager": "src/specs/TestsMapManager",
        "TestsEnemy": "src/specs/TestsEnemy"
	},
	shim : {
		"jquery-ui" : {
			exports : "$",
			deps : ['jquery']
		},
		"howler" : {
			exports : "Howl"
		},
		"underscore" : {
			exports : "_"
		},
		"pathfinding" : {
			exports : "PF"
		},
		"stats" : {
			exports : "Stats"
		},
		"datgui" : {
			exports : "dat.gui"
		},
        'jasmine-html': {
            deps : ['jasmine']
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        }
	   
    }
    };
    
    
    requirejs.config(rconfig);
    
    requirejs(["jasmine-boot"], function() {
            requirejs(["boot"], function() {
                
                window.executeTests();    
                
                
            });
    });

});