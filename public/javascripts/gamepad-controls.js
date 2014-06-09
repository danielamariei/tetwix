/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/9/14
 * Time: 6:29 PM
 * To change this template use File | Settings | File Templates.
 */
/* From: https://developer.mozilla.org/en-US/docs/Web/Guide/API/Gamepad */


var gamepads = {};

function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]

    if (connecting) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gamepad.index, gamepad.id,
            gamepad.buttons.length, gamepad.axes.length);

        gamepads[gamepad.index] = gamepad;
    } else {
        console.log("Gamepad disconnected from index %d: %s",
            gamepad.index, gamepad.id);

        delete gamepads[gamepad.index];
    }

    gameLoop();
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

var start;

var rAF = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;

var rAFStop = window.mozCancelRequestAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.cancelRequestAnimationFrame;

function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

function gameLoop() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads)
        return;

    var gp = gamepads[0];
    if (buttonPressed(gp.buttons[0])) {
        // map action for button
        Debug.LOG_LINE('button pressed on gamepad');
    } else if (buttonPressed(gp.buttons[2])) {
        // map action for button
        Debug.LOG_LINE('button pressed on gamepad');
    }
    if(buttonPressed(gp.buttons[1])) {
        // map action for button
        Debug.LOG_LINE('button pressed on gamepad');
    } else if(buttonPressed(gp.buttons[3])) {
        // map action for button
        Debug.LOG_LINE('button pressed on gamepad');
    } else if (buttonPressed(gp.axes[0])) {
        // map action for button
        Debug.LOG_LINE('button pressed on gamepad -- axis 0');

    }

    var start = rAF(gameLoop);
};