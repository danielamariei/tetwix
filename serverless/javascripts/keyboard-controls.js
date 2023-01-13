/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/8/14
 * Time: 5:34 PM
 * To change this template use File | Settings | File Templates.
 */

/* Keyboard mappings for both players */
var Keyboard = {
    Player1: {
        up: 87,
        right: 68,
        down: 83,
        left: 65
    },

    Player2: {
        up: 38,
        right: 39,
        down: 40,
        left: 37
    }
};

/* keyboard control mappings for both players */
document.onkeydown = function (e) {
    var dir = e.keyCode;

    switch (dir) {
        case Keyboard.Player1.right:
            Player1.right();
            break;
        case Keyboard.Player1.left:
            Player1.left();
            break;
        case Keyboard.Player1.down:
            Player1.down();
            break;
        case Keyboard.Player1.up:
            Player1.rotateRight();
            break;
        case Keyboard.Player2.right:
            Player2.right();
            break;
        case Keyboard.Player2.up:
            Player2.rotateRight();
            break;
        case Keyboard.Player2.left:
            Player2.left();
            break;
        case Keyboard.Player2.down:
            Player2.down();
            break;
    }
};