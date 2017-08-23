requirejs.config ({
	baseUrl : "",
	paths : {
        'jasmine': 'lib/jasmine-2.7.0/jasmine',
        'jasmine-html': 'lib/jasmine-2.7.0/jasmine-html',
        'jasmine-boot': 'lib/jasmine-2.7.0/boot',
		"jquery" : "libs/jquery/jquery.min",
		"jquery-ui" : "libs/jquery-ui/jquery-ui.min",
		"howler" : "libs/howler.min",
		"underscore" : "libs/underscore-min",
		"pathfinding" : "libs/pathfinding-browser.min",
		"stats" : "libs/debug/stats.min",
		"datgui" : "libs/debug/dat.gui.min"
        
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
	},
	urlArgs : "d=" + Date.now()
    
});


define([
	"src/game/Game"
], function (
	game
) {
	game.init();
});