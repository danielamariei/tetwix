/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/8/14
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

/* Controls a piece on the game board */
var PieceController = function (piece, player) {
        this.piece = piece;
        this.active = true;
        this.rotation = true;

        if (player === 'Player1') {
            this.topLeft = new Point(0, 0);
        } else if (player === 'Player2') {
            this.topLeft = new Point(game.cols - 4, 0);
        }

        this.bottomRight = new Point(this.piece.cols, this.piece.rows);

        this.left = function () {
            if (!this.active) return;

            if (this.topLeft.y < 4) {
                if (this.crossesBoxWidth({x: this.topLeft.x - 1, y: this.topLeft.y})) {
                    return;
                }
            }

            this.erase();

            if (this.available({x: this.topLeft.x - 1, y: this.topLeft.y})) {
                this.topLeft.left();
                this.bottomRight.left();
            }

            this.draw();
        };

        this.right = function () {
            if (!this.active) return;

            if (this.topLeft.y < 4) {
                if (this.crossesBoxWidth({x: this.topLeft.x + 1, y: this.topLeft.y})) {
                    return;
                }
            }

            this.erase();

            if (this.available({x: this.topLeft.x + 1, y: this.topLeft.y})) {
                this.topLeft.right();
                this.bottomRight.right();
            } else {
//            Debug.LOG_LINE('right not available');
            }

            this.draw();
        };


        this.rotateRight = function () {
            if (!this.rotation) return;
            if (!this.active) return;

            this.erase();
            this.piece.rotateRight();

            if (!this.available(this.topLeft)) {
                Debug.LOG_LINE('rotateRight');
                this.piece.rotateLeft();
            }

            this.draw();
        };

        this.down = function () {
            if (game.state.isGameOver) {
                return;
            }

            if (!this.active) return;

            this.erase();

            if (this.available({x: this.topLeft.x, y: this.topLeft.y + 1})) {
                this.topLeft.down();
                this.bottomRight.down();
            } else if (this.obstructed({x: this.topLeft.x, y: this.topLeft.y + 1})) {
                Debug.LOG_LINE('obstructed');
                this.draw(CellStates.active);
                return;
            } else {
                this.active = false;
                this.draw(CellStates.dead);
                this.detonateIfPieceIsBomb();
                game.state.board.verifyRowsThatNeedToBeCleared();
                game.state.board.verifyIfGameIsOver();
                return;
            }

            this.draw(CellStates.active);
        };

        this.detonateIfPieceIsBomb = function () {
            if (this.piece.hasOwnProperty('type')) {
                if (this.piece.type === 'B') {
                    this.detonate();
                }
            }
        };

        this.detonate = function () {
//        Debug.LOG_LINE('detonate');
            game.state.board.clearArea(this.topLeft, {x: this.topLeft.x + this.piece.cols - 1, y: this.topLeft.y + this.piece.rows - 1});
        };

        this.isOnBoard = function (r, c) {
            return (r >= 0 && r < game.rows) && (c >= 0 && c < game.cols);
        };

        this.available = function (topLeft, bottomRight) {
            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {

                    if (this.piece.state[y][x] == 1) {
                        if (!this.isOnBoard(topLeft.y + y, topLeft.x + x)) {
//                            Debug.LOG_LINE('not on board');
                            return false;
                        }

                        if (!game.state.board.isCellFree(topLeft.y + y, topLeft.x + x)) {
                            return false;
                        }
                    }
                }
            }

            return true;
        };

        this.obstructed = function (topLeft, bottomRight) {
            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {
                    if (this.piece.state[y][x] == 1) {
                        if (!this.isOnBoard(topLeft.y + y, topLeft.x + x)) {
//                            Debug.LOG_LINE('not on board');
                            return false;
                        }

                        if (!game.state.board.isCellFreeOrActive(topLeft.y + y, topLeft.x + x)) {
                            return false;
                        }
                    }
                }
            }

            return true;
        };

        this.crossesBoxWidth = function (topLeft, bottomRight) {
            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {
                    if (this.piece.state[y][x] == 1) {
                        if ((topLeft.x + x) >= 0 && (topLeft.x + x) < 4) {
                            continue;
                        } else if ((topLeft.x + x) >= (game.cols - 4) && (topLeft.x + x) < game.cols) {
                            continue;
                        } else {
                           return true;
                        }
                    }
                }
            }

            return false;
        };

        this.draw = function (state) {
            for (var i = 0; i < this.piece.rows; ++i) {
                for (var j = 0; j < this.piece.cols; ++j) {
                    if (this.piece.state[i][j] == 1) {
                        game.state.board.state[this.topLeft.y + i][this.topLeft.x + j].draw(this.piece.color, state);
                    }
                }
            }
        };

        this.erase = function () {
            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {
                    if (this.piece.state[y][x] == 1) {
                        game.state.board.eraseCell(this.topLeft.y + y, this.topLeft.x + x);
                    }
                }
            }
        };

        this.invalidateMove = function () {
            piece.draw('#c82124');
            setTimeout(function () {
                piece.draw();
            }, game.speed);

        };
    }
    ;
