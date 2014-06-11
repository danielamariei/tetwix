/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 5/19/14
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */


/* The Tetris game logic */
var game = {
        cellSize: 50,
        rows: 20,
        cols: 40,
        speed: 1200,
        score: 0,
        level: 1,
        scorePerLine: 100,
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
                Player1.pause();
                Player2.pause();

            },

            resume: function () {
//                Debug.LOG_LINE('resume');
                Player1.resume();
                Player2.resume();

            },

            end: function () {
//                Debug.LOG_LINE('Game over');
                /*game.ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
                 game.ctx.fillRect(0, 0, game.width, game.height);*/
                $('#game-over').show();

                // TO-DO
                // Add extra functionality when game is over
                // e.g. show menu to players, etc.
            },

            restart: function () {
                game.state.board.erase();

                game.score = 0;
                game.level = 1;

                Player1.restart();
                Player2.restart();

                document.getElementById("score").innerHTML = game.score;
            },

            share: function () {
                var msg = 'Scored ' + game.score + ' points playing TeTwix';

                FB.login(function () {
                    FB.api('/me/feed', 'post', {message: msg});
                }, {scope: 'publish_actions'});
            }
        },


        state: {
            isGameOver: false,
            completedLinesAtThisLevel: 0,

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
                            game.state.board.state[i][j] = new Cell(j * game.cellSize, i * game.cellSize);
                            game.state.board.state[i][j].drawOutline("#FFF");
                        }
                    }

                    for (var i = 0; i < 4; ++i) {
                        for (var j = 0; j < 4; ++j) {
                            game.state.board.state[i][j].drawOutline("#FFFFFF");
                            game.state.board.state[i][game.cols - j - 1].drawOutline("#FFFFFF");
                        }
                    }
                },

                isOnBoard: function (r, c) {
                    return (r >= 0 && r < game.rows) && (c >= 0 && c < game.cols);
                },


                verifyIfGameIsOver: function () {
                    var r = 4;
                    for (var c = 0; c < game.cols; ++c) {
                        if (this.isCellDead(r, c)) {
                            game.state.isGameOver = true;
                        }
                    }
                },

                verifyRowsThatNeedToBeCleared: function () {
                    for (var r = game.rows - 1; r > 3; --r) {
                        var clearedRows = 0;
                        while (this.isRowDead(r)) {
                            this.clearRow(r);
                            this.moveDownRowsAbove(r);

                            ++clearedRows;
                        }


                        game.score += (clearedRows * clearedRows * game.scorePerLine * game.level);
                        game.state.completedLinesAtThisLevel += clearedRows;

                        if (game.state.completedLinesAtThisLevel >= 5) {
                            game.state.completedLinesAtThisLevel = 0;
                            if (game.level < 10) {
                                ++game.level;
                                game.speed -= 100;
                            }
                        }

                    }
                    document.getElementById("score").innerHTML = game.score;
                },

                moveDownRowsAbove: function (r) {
                    for (var i = r - 1; i > 3; --i) {
                        this.moveDownRow(i);
                    }
                },

                moveDownRow: function (r) {
                    for (var c = 0; c < game.cols; ++c) {
                        this.moveDownCell(r, c);
                    }
                },

                moveDownCell: function (r, c) {
                    if (r < game.rows - 1) {
                        if (this.isCellFree(r + 1, c)) {

                            var state = game.state.board.state[r][c].state;
                            var color = game.state.board.state[r][c].fillColor;

                            if (state === CellStates.dead) {
                                this.eraseCell(r, c);
                                this.drawCell(r + 1, c, color, CellStates.dead);
                            }
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
                    for (var c = 0; c < game.cols; ++c) {
                        game.state.board.eraseCell(r, c);
                    }
                },

                isCellFree: function (r, c) {
                    return game.state.board.state[r][c].state === CellStates.free;
                },

                isCellDead: function (r, c) {
                    return game.state.board.state[r][c].state === CellStates.dead;
                },

                isCellActive: function (r, c) {
                    return game.state.board.state[r][c].state === CellStates.active;
                },

                isCellFreeOrActive: function (r, c) {
                    return this.isCellFree(r, c) || this.isCellActive(r, c);
                },


                erase: function () {
                    Debug.LOG_LINE('erase');
                    for (var i = 0; i < game.rows; ++i) {
                        for (var j = 0; j < game.cols; ++j) {
                            this.eraseCell(i, j);
                        }
                    }

                },

                clearArea: function (topLeft, bottomRight) {
                    for (var r = topLeft.y; r <= bottomRight.y; ++r) {
                        for (var c = topLeft.x; c <= bottomRight.x; ++c) {
                            if (this.isOnBoard(r, c)) {
                                this.eraseCell(r, c);
                            }
                        }
                    }
                },

                eraseCell: function (r, c) {
                    game.state.board.state[r][c].erase();
                },
                drawCell: function (r, c, color, state) {
                    game.state.board.state[r][c].draw(color, state);
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


var Player1 = new Player('Player1');
var Player2 = new Player('Player2');


window.navigator.vibrate(200);
window.navigator.vibrate([200]);


//game.controls.startNewGame();
