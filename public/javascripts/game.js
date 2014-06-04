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


/* The tetriminos */

/* The colors of the tetriminos */
var colors = {
    cyan: '#00FFFF',
    blue: '#0000FF',
    orange: '#FFA500',
    yellow: '#FFFF00',
    lime: '#00FF00',
    red: '#FF0000',
    magenta: '#8B008B'
};


/* Base class for the tetriminos */
var Piece = function () {
    this.createArrayCopy = function (a) {
        var b = [];
        for (var i = 0; i < a.length; ++i) {
            b[i] = [];
            for (var j = 0; j < a[i].length; ++j) {
                b[i][j] = a[i][j];
            }
        }

        return b;
    }

    this.rotateLeft = function () {
        var newState = this.createMatrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; ++i) {
            for (var j = 0; j < this.cols; ++j) {
                newState[this.rows - j - 1][i] = this.state[i][j];
            }
        }

        this.state = newState;
        this.swapRowsWithCols();
    };

    this.rotateRight = function () {
        var newState = this.createMatrix(this.cols, this.rows);
        for (var i = 0; i < this.rows; ++i) {
            for (var j = 0; j < this.cols; ++j) {
                newState[j][this.rows - i - 1] = this.state[i][j];
            }
        }

        this.state = newState;
        this.swapRowsWithCols();
    };

    this.createMatrix = function (rows, cols) {
        var a = [];
        for (var i = 0; i < rows; ++i) {
            a[i] = [];
            for (var j = 0; j < cols; ++j) {
                a[i][j] = 0;
            }
        }

        return a;
    };

    this.swapRowsWithCols = function () {
        var aux = this.rows;
        this.rows = this.cols;
        this.cols = aux;
    }
};


/* The I tetrimino */
var I = function () {
    this.color = colors.cyan;
    this.rows = 3;
    this.cols = 4;
    this.state =
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ];
};

/* Inherit from the base Piece */
I.prototype = new Piece();


/* The J tetrimino */
var J = function () {
    this.color = colors.blue;
    this.rows = 2;
    this.cols = 3;
    this.state =
        [
            [1, 1, 1],
            [0, 0, 1]
        ];
};

/* Inherit from the base Piece */
J.prototype = new Piece();


/* The L tetrimino */
var L = function () {
    this.color = colors.orange;
    this.rows = 2;
    this.cols = 3;
    this.state =
        [
            [1, 1, 1],
            [1, 0, 0]
        ];
};

/* Inherit from the base Piece */
L.prototype = new Piece();


/* The O tetrimino */
var O = function () {
    this.color = colors.yellow;
    this.rows = 2;
    this.cols = 2;
    this.state =
        [
            [1, 1],
            [1, 1]
        ];

    this.rotateRight = function () {
    };

    this.rotateRight = function () {
    };
};

/* No need to inherit the base class */


/* The S tetrimino */
var S = function () {
    this.color = colors.lime;
    this.rows = 2;
    this.cols = 3;
    this.state =
        [
            [0, 1, 1],
            [1, 1, 0]
        ];
};

/* Inherit from the base Piece */
S.prototype = new Piece();


/* The T tetrimino */
var T = function () {
    this.color = colors.magenta;
    this.rows = 3;
    this.cols = 3;
    this.state =
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
};

/* Inherit from the base Piece */
T.prototype = new Piece();


/* The Z tetrimino */
var Z = function () {
    this.color = colors.red;
    this.rows = 2;
    this.cols = 3;
    this.state =
        [
            [1, 1, 0],
            [0, 1, 1]
        ];
};

/* Inherit from the base Piece */
Z.prototype = new Piece();


/* Offers functionality for generating random pieces */
var PieceGenerator = {
    length: 7,
    pieces: [
        function () {
            return new I();
        },

        function () {
            return new J();
        },

        function () {
            return new L();
        },

        function () {
            return new O();
        },

        function () {
            return new S();
        },

        function () {
            return new T();
        },

        function () {
            return new Z();
        }
    ],

    generateRandomPiece: function () {
        var random = Math.random() * PieceGenerator.length;
        var i = Math.floor(random);
        var piece = PieceGenerator.pieces[i]();

        return piece;
    }
};

/* The Tetris game logic */


var game = {
    cellSize: 15,
    rows: 20,
    cols: 40,
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
                    dead: false,

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


var PieceController = function (piece, player) {
        this.active = true;
        this.piece = piece;

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
            if (!this.active) return;

            this.erase();
            this.piece.rotateRight();

            if (!this.available(this.topLeft)) {

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
            } else {
                this.active = false;
            }

            if (!this.available({x: this.topLeft.x, y: this.topLeft.y + 1})) {
                this.active = false;
            }

            this.draw();
        };

        this.isOnBoard = function (r, c) {
            return (r >= 0 && r < game.rows) && (c >= 0 && c < game.cols);
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

    this.piece = new PieceController(PieceGenerator.generateRandomPiece(), this.player);

    this.play = function () {
        if (!this.piece.active) {
            this.piece = new PieceController(PieceGenerator.generateRandomPiece(), this.player);
            setTimeout(function () {
                THIS.play();
            }, game.speed);
            return
        }
        ;

        this.piece.draw();
        this.piece.down();

        setTimeout(function () {
            THIS.play();
        }, game.speed);
    }

    this.down = function () {
        this.piece.down();

    };

    this.right = function () {
        this.piece.right();
    };

    this.left = function () {
        this.piece.left();
    };

    this.rotateRight = function () {
//        alert(1);
        this.piece.rotateRight();
    };

};

var Player1 = new Player('Player1');
var Player2 = new Player('Player2');


game.controls.startNewGame();
