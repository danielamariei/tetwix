/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 5/12/14
 * Time: 8:37 AM
 * To change this template use File | Settings | File Templates.
 */

var controller = new Leap.Controller({enableGestures: true});


var startId = null;
var endId = null;

var Game = document.getElementById('game');

function printToGameboard(text) {
    Game.innerHTML += text + "<br />";
}

controller.on('frame', function(frame) {
    // Are there any gestures in this frame?
    if (frame.gestures.length) {
        var gesture = frame.gestures[0];

            if (gesture.state == 'start')
                startId = gesture.id;

            if (gesture.state == 'stop')
                endId = gesture.id;

            if (startId == endId)
                printToGameboard(Curtsy.direction(gesture).type);
    }
});


// init
controller.on('ready', function() { printToGameboard('ready'); });
controller.connect();
printToGameboard("Waiting for device to connect.")

