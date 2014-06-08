/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 5/19/14
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */


/* Class that helps debugging */
var Debugging = function () {
    this.output = document.getElementById('debugging');
    this.LOG = function (text) {
        this.output.innerHTML += text;
    };

    this.LOG_LINE = function (text) {
        this.LOG(text + "<br />");
    };
};


var Debug = new Debugging();


var CellStates = {
    free: 1,
    active: 2,
    dead: 3
};

/* The Tetris game logic */

var game = {
        cellSize: 15,
        rows: 20,
        cols: 10,
        speed: 1000,
        canvas: null,
        ctx: null,

        controls: {
            startNewGame: function () {
                Debug.LOG_LINE("startNewGame");
                game.state.board.init();
                Debug.LOG_LINE("after init");
                game.helpers.attachListeners();
                Debug.LOG_LINE("after attaching listeners");

                Player1.play();
                Player2.play();
            },

            pause: function () {
            },

            resume: function () {
            }
        },


        state: {
            isGameOver: false,

            board: {
                state: null,

                init: function (numberOfPlayers) {
                    game.canvas = document.getElementById("gameboard");

                    game.ctx = game.canvas.getContext("2d");

                    game.width = game.cols * game.cellSize;
                    game.height = game.rows * game.cellSize;
                    game.canvas.width = game.width;
                    game.canvas.height = game.height;

                    var ctx = game.ctx;

                    game.state.board.state = [];
                    for (var i = 0; i < game.rows; ++i) {
                        game.state.board.state[i] = [];
                        for (var j = 0; j < game.cols; ++j) {
                            game.state.board.state[i][j] = game.state.board.createCell(j * game.cellSize, i * game.cellSize);
                            game.state.board.state[i][j].drawOutline("#888888");
                        }
                    }

                    for (var i = 0; i < 4; ++i) {
                        for (var j = 0; j < 4; ++j) {
                            game.state.board.state[i][j].drawOutline("#FFFFFF");
                            game.state.board.state[i][game.cols - j - 1].drawOutline("#FFFFFF");
                        }
                    }
                },

                verifyRowsThatNeedToBeCleared: function () {
//                Debug.LOG_LINE('verifyRowsThatNeedToBeCleared');
                    for (var r = game.rows - 1; r > 3; --r) {
                        while (this.isRowDead(r)) {
                            this.clearRow(r);
                            this.moveDownRowsAbove(r);
                        }
                    }
                },

                moveDownRowsAbove: function (r) {
//                Debug.LOG_LINE('moveDownRowsAbove');
                    for (var i = r - 1; i > 3; --i) {
                        this.moveDownRow(i);
                    }
                },

                moveDownRow: function (r) {
//                Debug.LOG_LINE('moveDownRow')
                    for (var c = 0; c < game.cols; ++c) {
                        this.moveDownCell(r, c);
                    }
                },

                moveDownCell: function (r, c) {
                    if (r < game.rows - 1) {
                        if (this.isCellFree(r + 1, c)) {

            //                Debug.LOG_LINE('moveDownCell')
                            var state = game.state.board.state[r][c].state;
                            var color = game.state.board.state[r][c].fillColor;

                            if (state === CellStates.dead) {
            //                    Debug.LOG_LINE(state);

                                this.eraseCell(r, c);
                                this.drawCell(r + 1, c, color, CellStates.dead);
                            }

//                            this.moveDownCell(r + 1, c);
                        }
                    } else {
                        this.verifyRowsThatNeedToBeCleared();
                    }
                },

                isRowDead: function (r) {
                    for (var c = 0; c < game.cols; ++c) {
                        if (!this.isCellDead(r, c)) {
                            return false;
                        }
                    }

                    return true;
                },

                clearRow: function (r) {
                    Debug.LOG_LINE('Clearing row');
                    for (var c = 0; c < game.cols; ++c) {
                        game.state.board.eraseCell(r, c);
                    }
                },

                isCellFree: function (r, c) {
                    return game.state.board.state[r][c].state === CellStates.free;
                },

                isCellDead: function (r, c) {
//                Debug.LOG_LINE('isCellDead' + r + ' ' + c);
                    return game.state.board.state[r][c].state === CellStates.dead;
                },

                isCellActive: function (r, c) {
                    return game.state.board.state[r][c].state === CellStates.active;
                },

                isCellFreeOrActive: function (r, c) {
                    return this.isCellFree(r, c) || this.isCellActive(r, c);
                },


                erase: function () {
                    for (var i = 0; i < game.rows; ++i) {
                        for (var j = 0; j < game.cols; ++j) {
                            eraseCell(i, j);
                        }
                    }

                },

                eraseCell: function (r, c) {
                    game.state.board.state[r][c].erase();
                },
                drawCell: function (r, c, color, state) {
                    game.state.board.state[r][c].draw(color, state);
                },

                createCell: function (x, y) {
                    var cell = {
                        state: CellStates.free,
                        fillColor: null,
                        strokeColor: null,

                        drawOutline: function (color) {
                            this.strokeColor = color;
                            game.ctx.strokeStyle = color;
                            game.ctx.strokeRect(x, y, game.cellSize, game.cellSize);
                        },

                        draw: function (color, state) {
                            var cellState = state || CellStates.active;
                            if (color) {
                                this.fillColor = color;
                            }
                            game.ctx.fillStyle = this.fillColor;
                            game.ctx.fillRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
                            cell.state = cellState;
                        },

                        erase: function () {
                            game.ctx.clearRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
                            cell.state = CellStates.free;
                        },

                        toggle: function () {
                            if (cell.state === CellStates.free) {
                                cell.draw('rgb(200,0,0)');
                            } else {
                                cell.erase();
                            }

                        }
                    };

                    return cell;
                }
            }
        },
        helpers: {
            attachListeners: function () {
                game.helpers.attachClickListener();
            },

            attachClickListener: function () {
                game.canvas.addEventListener("mousedown", game.cellListener, false);
            }
        },

        cellListener: function (event) {
            var x = event.pageX - game.canvas.offsetLeft;
            var y = event.pageY - game.canvas.offsetTop;

            var j = Math.floor(x / game.cellSize);
            var i = Math.floor(y / game.cellSize);
            game.state.board.state[i][j].toggle();

        }
    }
    ;


var PieceController = function (piece, player) {
        this.active = true;
        this.piece = piece;
        this.rotation = true;

        if (player === 'Player1') {
            this.topLeft = new Point(0, 0);
        } else if (player === 'Player2') {
            this.topLeft = new Point(game.cols - 4, 0);
        }

        this.bottomRight = new Point(this.piece.cols, this.piece.rows);

        this.left = function () {
            if (!this.active) return;

            this.erase();

            if (this.available({x: this.topLeft.x - 1, y: this.topLeft.y})) {
                this.topLeft.left();
                this.bottomRight.left();
            }

            this.draw();
        };

        this.right = function () {
            if (!this.active) return;

            this.erase();

            if (this.available({x: this.topLeft.x + 1, y: this.topLeft.y})) {
                this.topLeft.right();
                this.bottomRight.right();
            } else {
                Debug.LOG_LINE('right not available');
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
        }

        this.down = function () {
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
//                Debug.LOG_LINE('inactive');
                this.active = false;
                this.draw(CellStates.dead);
                game.state.board.verifyRowsThatNeedToBeCleared();
                return;
            }

            if (!this.available({x: this.topLeft.x, y: this.topLeft.y + 1})) {
                this.rotation = false;
            }

            this.draw(CellStates.active);
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


var Point = function (x, y) {
    this.x = x;
    this.y = y;

    this.left = function () {
        this.x--;
    };

    this.right = function () {
        this.x++;
    };

    this.down = function () {
        this.y++;
    };
};


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


var Player1 = new Player('Player1');
var Player2 = new Player('Player2');


game.controls.startNewGame();
