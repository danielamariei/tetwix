/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 5/19/14
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */

var game = {
    cellSize: 30,
    rows: 20,
    cols: 30,
    canvas: null,
    ctx: null,
    state: null,

    init: function (numberOfPlayers) {
        game.canvas = document.getElementById("gameboard");

        game.ctx = game.canvas.getContext("2d");

        game.width = game.cols * game.cellSize;
        game.height = game.rows * game.cellSize;
        game.canvas.width = game.width;
        game.canvas.height = game.height;

        var ctx = game.ctx;

        game.state = [];
        for (var i = 0; i < game.rows; ++i) {
            game.state[i] = [];
            for (var j = 0; j < game.cols; ++j) {
                game.state[i][j] = game.createCell(j * game.cellSize, i * game.cellSize);
                game.state[i][j].drawOutline("#000000");
            }
        }


        game.attachClickListener();
    },

    attachClickListener: function () {
        game.canvas.addEventListener("mousedown", game.clickListener, false);
    },

    clickListener: function (event) {
        var x = event.pageX - game.canvas.offsetLeft;
        var y = event.pageY - game.canvas.offsetTop;
//        alert(x + " " + y);

        var j = Math.floor(x / game.cellSize);
        var i = Math.floor(y / game.cellSize);
//        alert(i + " " + j);
        game.state[i][j].toggle();

    },

    createCell: function (x, y) {

        var cell = {
            isFree: true,

            drawOutline: function (color) {
                game.ctx.fillStyle = color;
                game.ctx.strokeRect(x, y, game.cellSize, game.cellSize);
            },

            draw: function (color) {
//                alert('color: ' + color);
                game.ctx.fillStyle = color;
//                alert(game.ctx.fillStyle);
                game.ctx.fillRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
            },

            erase: function () {
                game.ctx.clearRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
            },


            toggle: function () {
                if (cell.isFree) {
                    cell.draw('rgb(200,0,0)');
                } else {
                    cell.erase();
                }

                cell.isFree = !cell.isFree;
            }
        };

        return cell;
    },

    getNewPiece: function () {
        var piece = {
            color: 'rgb(200, 100, 0)',
            state: [
                [0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1],
                [0, 0, 1, 1, 1, 1],
                [0, 0, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0]
            ],
            rows: 6,
            cols: 6,

            moveDown: function () {
                if (!piece.active) return;

                if (piece.available(piece.x+1, piece.y)) {

//                    alert(1);
                    piece.erase();
                    piece.x++;
                    piece.draw();


                } else {
//                    alert(2);
                    piece.invalidateMove();
                    piece.active = false;
                }

                setTimeout(piece.moveDown, 200);
            },

            available: function (x, y) {
//                alert('available');
                for (var i = 0; i < piece.rows; ++i) {
                    for (var j = 0; j < piece.cols; ++j) {
                        if (x+i >= game.rows) return false;
                        if (y+j >= game.cols) return false;
                        if (piece.state[i][j] == 1) {
                            if (!game.state[x + i][y + j].isFree) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            },

            erase: function () {
                for (var i = 0; i < piece.rows; ++i) {
                    for (var j = 0; j < piece.cols; ++j) {
                        game.state[i + piece.x][j + piece.y].erase();
                    }
                }

            },

            draw: function (color) {

                var c = color || piece.color;
//                alert(c);
                for (var i = 0; i < piece.rows; ++i) {
                    for (var j = 0; j < piece.cols; ++j) {
                        if (piece.state[i][j] == 1)
                            game.state[i + piece.x][j + piece.y].draw(c);
                    }
                }

            },

            invalidateMove: function () {
                piece.draw('#c82124');
                setTimeout(function() {
                    piece.draw();
                }, 1000);

            },

            x: 0,
            y: 0,
            active: true
        };

        return piece;
    },

    start: function () {

        var piece = game.getNewPiece();

        piece.moveDown();
    }

};

game.init();
game.start();
