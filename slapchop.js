var Five = require("johnny-five");
var cp = require("child_process");

var board = new Five.Board();

var button;

board.on("ready", function(){

  console.log("ready");

  button = new Five.Button(8);

  board.repl.inject({
    button: button
  });

  button.on("down", function(){
    console.log("down");
  });

  button.on("hold", function(){
    console.log("hold");
  });

  button.on("up", function(){
    cp.exec("./MouseTools -leftClick", function(error, stdout, stderr){
      if (error){
        console.log("ERROR: " + error);
      }

      if (stdout){
        console.log("RESPONSE: " + stdout);
      }
    });
    console.log("up");
  });

});
