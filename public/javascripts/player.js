/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/8/14
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */

/* A player of the game */
var Player = function (player) {
    var generateRandomPieceWithController = function () {
        return new PieceController(PieceGenerator.generateRandomPiece(), THIS.player);
    };

    // a pointer to the current object
    var THIS = this;

    // Player 1 or player 2
    this.player = player;

    this.currentPiece = generateRandomPieceWithController();
    this.nextPiece = generateRandomPieceWithController();

    this.play = function () {
        if (!this.currentPiece.active) {
            this.currentPiece = this.nextPiece;
            this.nextPiece = generateRandomPieceWithController();

            setTimeout(function () {
                THIS.play();
            }, game.speed);

            return;
        }

        this.currentPiece.down();

        if (this.currentPiece.topLeft.y > 3) {
            this.nextPiece.draw();
        }

        setTimeout(function () {
            THIS.play();
        }, game.speed);
    };

    this.down = function () {
        this.currentPiece.down();
    };

    this.right = function () {
        this.currentPiece.right();
    };

    this.left = function () {
        this.currentPiece.left();
    };

    this.rotateRight = function () {
        this.currentPiece.rotateRight();
    };
};