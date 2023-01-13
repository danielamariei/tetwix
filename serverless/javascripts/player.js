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

    this.isGamePaused = false;


    this.currentPiece = generateRandomPieceWithController();
    this.nextPiece = generateRandomPieceWithController();

    this.play = function () {
        if (this.isGamePaused) {
            return
        }
        ;

        if (game.state.isGameOver) {
           //Debug.LOG_LINE('before end()');
            game.controls.end();
            //Debug.LOG_LINE('after end()');
            return;
        }

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

    this.restart = function() {
        this.currentPiece.erase();
        this.nextPiece.erase();

        this.currentPiece = generateRandomPieceWithController();
        this.nextPiece = generateRandomPieceWithController();
    };

    this.pause = function () {
        this.isGamePaused = true;
    };

    this.resume = function () {
        if (this.isGamePaused) {
            this.isGamePaused = false;
            this.play();
        }
    };

    this.down = function () {
        if (this.isGamePaused) return;
        if (game.state.isGameOver) return;
        this.currentPiece.down();
    };

    this.right = function () {
        if (this.isGamePaused) return;
        if (game.state.isGameOver) return;
        this.currentPiece.right();
    };

    this.left = function () {
        if (this.isGamePaused) return;
        if (game.state.isGameOver) return;
        this.currentPiece.left();
    };

    this.rotateRight = function () {
        if (this.isGamePaused) return;
        if (game.state.isGameOver) return;

        this.currentPiece.rotateRight();
    };
};