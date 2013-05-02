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

  button = new Five.Button({
    pin: 2
  });

  board.repl.inject({
    button: button
  });

  button.on("down", function(){
    cp.exec("./MouseTools -leftClick", execCallback);
    console.log("down : next slide");
  });

  button.on("hold", function(){
    cp.exec("./MouseTools -rightClick", execCallback);
    console.log("hold : previous slide");
  });

//   button.on("up", function(){
//     console.log("up");
//   });

});
