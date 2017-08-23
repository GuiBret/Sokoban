var runTests = function(txt, Config) {
    var _runSpecs = function() {
        describe("txt", function() {
            beforeAll(function(done) {
                for (var i = 0; i < Config.availableLanguage.length; i++) {
			
                    $.get(Config.xliffPath + Config.availableLanguage[i] + ".xliff?d=" + 
                          Date.now(),
				
                          (function (lang, obj) {
					
                        return function (xliff) {
				            
                            var xliff = $.parseXML(xliff);
                            obj.xliffData[lang] = xliff;
                            if(Object.keys(obj.xliffData).length == 6) {
                                done();
                            }
    
					}
                        
                    
				})(Config.availableLanguage[i], txt)
			);
                    
            
		};
                
                
                
            }, 5000);
            
            
            describe("txt", function() {
                it("should return a specified string with the right language", function() {

                    expect(txt.get("LABEL_MENU_PLAYBTN")).toEqual("Play");
                    Config.language = "fr";
                    expect(txt.get("LABEL_MENU_PLAYBTN")).toEqual("Jouer");
                    
                })
            })

            
        });

        
    }
    
    return {runSpecs : _runSpecs};
    
}


define(["src/utils/localization/txt", "src/utils/Config"], runTests);