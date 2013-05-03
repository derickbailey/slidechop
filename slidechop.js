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

var UP = 0, DOWN = 1, HOLD = 2;
var status = UP;

board.on("ready", function(){

  console.log("ready");

  button = new Five.Button({
    pin: 2
  });

  board.repl.inject({
    button: button
  });

  button.on("down", function(){
    status = DOWN;
  });

  button.on("hold", function(){
    status = HOLD;
  });

  button.on("up", function(){
    if (status === DOWN){
      cp.exec("./MouseTools -leftClick", execCallback);
      console.log("next slide");
    } else {
      cp.exec("./MouseTools -rightClick", execCallback);
      console.log("previous slide");
    }
    status = UP;
  });

});
