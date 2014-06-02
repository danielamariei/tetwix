/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 5/19/14
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */


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


/* Tetriminos */
var T = function () {
    this.color = '#8B008B';
    this.rows = 4;
    this.cols = 4;
    this.state =
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 1]
        ];

    this.rotateLeft = function () {
        // to-do
    };

    this.rotateRight = function () {

    };
};


var PieceGenerator = {
    generateRandomPiece: function () {
        return new T();
    }
}


/* The Tetris game */
var game = {
    cellSize: 15,
    rows: 20,
    cols: 30,
    canvas: null,
    ctx: null,

    controls: {
        startNewGame: function () {
            Debug.LOG_LINE("startNewGame");
            game.state.board.init();
            Debug.LOG_LINE("after init");
            game.helpers.attachListeners();
            Debug.LOG_LINE("after attaching listeners");
            var piece = PieceGenerator.generateRandomPiece();
            var pieceController = new PieceController(piece);
            Debug.LOG_LINE("after piece controller");

            Player1.play();
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
            },

            isCellFree: function (r, c) {
                return game.state.board.state[r][c].isFree;
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

            createCell: function (x, y) {
                var cell = {
                    isFree: true,

                    drawOutline: function (color) {
                        game.ctx.strokeStyle = color;
                        game.ctx.strokeRect(x, y, game.cellSize, game.cellSize);
                    },

                    draw: function (color) {
                        game.ctx.fillStyle = color;
                        game.ctx.fillRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
                        cell.isFree = false;
                    },

                    erase: function () {
                        game.ctx.clearRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
                        cell.isFree = true;
                    },


                    toggle: function () {
                        if (cell.isFree) {
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
};


var PieceController = function (piece) {
        this.active = true;
        this.piece = piece;

        this.topLeft = new Point(0, 0);
        this.bottomRight = new Point(this.piece.cols, this.piece.rows);

        this.left = function () {
            Debug.LOG_LINE('left ' + this.active);
            this.erase();

            if (this.available({x: this.topLeft.x - 1, y: this.topLeft.y})) {
                Debug.LOG_LINE('left after if');
                this.topLeft.left();
                this.bottomRight.left();
            }

            Debug.LOG_LINE(this.active);
            this.draw();
        };

        this.right = function () {
            this.erase();

            if (this.available({x: this.topLeft.x + 1, y: this.topLeft.y})) {
                Debug.LOG_LINE('right');
                this.topLeft.right();
                this.bottomRight.right();
            }

            this.draw();

        };
        this.down = function () {
            this.erase();
            if (this.available({x: this.topLeft.x, y: this.topLeft.y + 1})) {
                this.topLeft.down();
                this.bottomRight.down();
            } else {
                Debug.LOG_LINE('this.active = false');
                this.active = false;
            }

            this.draw();

        };

        this.isOnBoard = function (r, c) {
            return (r >= 0 && r < game.rows) && (c >= 0 && c < game.rows);
        };

        this.available = function (topLeft, bottomRight) {

            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {

                    if (this.piece.state[y][x] == 1) {
                        if (!this.isOnBoard(topLeft.y + y, topLeft.x + x)) {
                            Debug.LOG_LINE('not on board');
                            return false;
                        }


                        if (!game.state.board.isCellFree(topLeft.y + y, topLeft.x + x)) {
                            Debug.LOG_LINE((topLeft.y + y) + ' '  + (topLeft.x + x));
                            return false;
                        }
                    }
                }
            }

            return true;
        };

        this.draw = function (color) {
            var c = color || this.piece.color;
            for (var i = 0; i < this.piece.rows; ++i) {
                for (var j = 0; j < this.piece.cols; ++j) {
                    if (this.piece.state[i][j] == 1) {
                        game.state.board.state[this.topLeft.y + i][this.topLeft.x + j].draw(c);
                    }
                }
            }
        };

        this.erase = function () {
            for (var x = 0; x < this.piece.cols; ++x) {
                for (var y = 0; y < this.piece.rows; ++y) {
                    game.state.board.eraseCell(this.topLeft.y + y, this.topLeft.x + x);
                }
            }
        };


        this.invalidateMove = function () {
            piece.draw('#c82124');
            setTimeout(function () {
                piece.draw();
            }, 1000);

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
        case Keyboard.Player2.right:
            Player1.right();
            break;
        case Keyboard.Player2.left:
            Player1.left();
            break;
        case Keyboard.Player2.down:
            Player1.down();
            break;
    }
};

var Player = function () {
    var THIS = this;
    this.piece = new PieceController(PieceGenerator.generateRandomPiece());

    this.play = function() {
//        Debug.LOG_LINE('pieceControls.down()');
        if (!this.piece.active) {
            this.piece = new PieceController(PieceGenerator.generateRandomPiece());
            setTimeout(function () {
                Debug.LOG_LINE('setTimeout 1');
                THIS.play();
            }, 300);
            return
        };

        this.piece.draw();

        this.piece.down();


        setTimeout(function () {
            Debug.LOG_LINE('setTimeout 2');
            THIS.play();
        }, 300);
    }

    this.down = function () {
        this.piece.down();

    };

    this.right = function() {
        this.piece.right();
    };
    this.left = function() {
        this.piece.left();
    };

};

var Player1 = new Player();


game.controls.startNewGame();
