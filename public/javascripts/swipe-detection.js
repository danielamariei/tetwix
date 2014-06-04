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

var Game = document.getElementById('debugging');

function printToGameboard(text) {
    Game.innerHTML += text + "<br />";
}

controller.on('frame', function (frame) {
    // Are there any gestures in this frame?
    if (frame.gestures.length) {
        var gesture = frame.gestures[0];

        if (gesture.state == 'start')
            startId = gesture.id;

        if (gesture.state == 'stop')
            endId = gesture.id;

        if (startId == endId) {
            var gesture = Curtsy.direction(gesture).type;
            switch (gesture) {
                case 'up':
                    break;
                case 'down':
                    Player1.down();
                    break;
                case 'left':
                    Player1.left();
                    break;
                case 'right':
                    Player1.right();
                    break;
                case 'clockwise':
                    Player1.rotateRight();
                    break;
                case 'counter-clockwise':
                    break;
                case 'forward':
                    break;
                case 'back':
                    break;
            }
        }

    }
});


// init
controller.on('ready', function () {
    printToGameboard('ready');
});
controller.connect();
printToGameboard("Waiting for device to connect.")

