/* The tetriminos */

/* The colors of the tetriminos */
var colors = {
    cyan: '#00FFFF',
    blue: '#0000FF',
    black: '#000000',
    orange: '#FFA500',
    yellow: '#FFFF00',
    lime: '#00FF00',
    red: '#FF0000',
    magenta: '#8B008B'
};


/* Base class for the tetriminos */
var Piece = function () {
    this.toString = function () {
        var result = '';

        for (var i = 0; i < this.rows; ++i) {
            for (var j = 0; j < this.cols; ++j) {
                result += this.state[i][j] + ' ';
            }
            result += '<br />';
        }

        return result;
    }
    ;
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
        var newState = this.createMatrix(this.cols, this.rows);
        for (var i = 0; i < this.rows; ++i) {
            for (var j = 0; j < this.cols; ++j) {
                newState[this.cols - j - 1][i] = this.state[i][j];
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


/* The B(omb) tetrimino */
var B = function () {
    this.type = 'B';
    this.color = colors.black;
    this.rows = 3;
    this.cols = 3;
    this.state =
        [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
};

/* Inherit from the base Piece */
B.prototype = new Piece();


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
    length: 8,
    pieces: [
        function () {
            return new B();
        },
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
