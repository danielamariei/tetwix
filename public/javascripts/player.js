/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/8/14
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */
var Player = function (player) {
    var THIS = this;
    this.player = player;

    this.currentPiece = new PieceController(PieceGenerator.generateRandomPiece(), this.player);
    this.nextPiece = new PieceController(PieceGenerator.generateRandomPiece(), this.player);

    this.play = function () {
        if (!this.currentPiece.active) {
            this.currentPiece = this.nextPiece;
            this.nextPiece = new PieceController(PieceGenerator.generateRandomPiece(), this.player);
            setTimeout(function () {
                THIS.play();
            }, game.speed);
            return
        }
        ;

//        this.piece.draw();
        this.currentPiece.down();

        if (this.currentPiece.topLeft.y > 3) {
            this.nextPiece.draw();
        }
        setTimeout(function () {
            THIS.play();
        }, game.speed);
    }

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