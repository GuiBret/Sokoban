var testsAccount = function(Account, UIManager) {
    var _runSpecs = function() {
        
        describe("Account.connect", function() {
            beforeEach(function(done) {
                UIManager.init();
                Account.name = "Machin";
                Account.password = "truc";
                
                $.post("http://localhost/Sokoban/src/game/server/php/request.php", {
                    name: Account.name,
                    password: Account.password,
                    isRequest: false
                }, function (data) {
                    var screenList = {
                        created: "AccountCreated",
                        connected: "GoodPassword",
                        wrongpassword: "WrongPassword"
                    }

                    data = data.replace(/ /g,"");
                    data = data.replace(/\r\n/g,"");
                    
                    
                    Account.data = screenList[data];
                    done();
                
                });
            });
            
            it("should show GoodPassword with an existing account & a good password", function() {
                expect(Account.data).toEqual("GoodPassword");
            });
        });
        
        describe("Account.connect", function() {
            beforeEach(function(done) {
                UIManager.init();
                Account.name = "Machi";
                Account.password = "truc";
                
                $.post("http://localhost/Sokoban/src/game/server/php/request.php", {
                    name: Account.name,
                    password: Account.password,
                    isRequest: false
                }, function (data) {
                    var screenList = {
                        created: "AccountCreated",
                        connected: "GoodPassword",
                        wrongpassword: "WrongPassword"
                    }

                    data = data.replace(/ /g,"");
                    data = data.replace(/\r\n/g,"");
                    
                    
                    Account.data = screenList[data];
                    done();
                
                });
            });
            
            it("should show Created with a non-existing account (account needs to be removed to make it work)", function() {
                expect(Account.data).toEqual("AccountCreated"); 
            });
        });
        
        describe("Account.connect", function() {
            beforeEach(function(done) {
                UIManager.init();
                Account.name = "Machin";
                Account.password = "tru";
                
                $.post("http://localhost/Sokoban/src/game/server/php/request.php", {
                    name: Account.name,
                    password: Account.password,
                    isRequest: false
                }, function (data) {
                    var screenList = {
                        created: "AccountCreated",
                        connected: "GoodPassword",
                        wrongpassword: "WrongPassword"
                    }

                    data = data.replace(/ /g,"");
                    data = data.replace(/\r\n/g,"");
                    
                    
                    Account.data = screenList[data];
                    done();
                
                });
            });
            
            it("should show WrongPassword with an existing account name and a wrong password", function() {
                expect(Account.data).toEqual("WrongPassword"); 
            });
        });
        
        describe("Account.getHighScore", function() {
            
            beforeEach(function(done) {
                UIManager.init();
                Account.name = "Machin";
                Account.password = "truc"

                Account.UIManager = UIManager; // Pas de Account.init() vu que c'est la seule action qu'il fait
                

                
                
                var result;
                $.post("http://localhost/Sokoban/src/game/server/php/request.php", {
                    name: Account.name,
                    password: Account.password,
                    request: "getBestScore",
                    isRequest: true
                }, function (data) {
                    data = JSON.parse(data);
                    Account.highScore = data;
                    done();
                });


            }, 5000);
            
            it("should check GameManager's called objects attributes after launch", function() {
                
                var score;
                
                for(var i = 0; i < Account.highScore.length; i++) {
                    
                    if(Account.highScore[i]["playerName"] === "Machin") {
                        score = parseInt(Account.highScore[i][0]);
                        
                    }
                }
                expect(score).toEqual(29);
                
            });
                
        });
        
    };
    
    return {runSpecs : _runSpecs};
}

define(["src/game/server/Account", "src/game/ui/UIManager"], testsAccount);