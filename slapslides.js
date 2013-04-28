var Five = require("johnny-five");
var cp = require("child_process");

var board = new Five.Board();

var button;

function execCallback(error, stdout, stderr){
  if (error){
    console.log("ERROR: " + error);
  }

  if (stdout){
    console.log("RESPONSE: " + stdout);
  }
}

board.on("ready", function(){

  console.log("ready");

  button = new Five.Button(2);

  board.repl.inject({
    button: button
  });

  button.on("down", function(){
    console.log("down");
  });

  button.on("hold", function(){
    //cp.exec("./MouseTools -rightClick", execCallback);
    console.log("hold");
  });

  button.on("up", function(){
    cp.exec("./MouseTools -leftClick", execCallback);
    console.log("up");
  });

});
