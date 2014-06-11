/**
 * Created with IntelliJ IDEA.
 * User: workstation
 * Date: 6/10/14
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

var Cell = function (x, y) {
    this.state = CellStates.free;
    this.fillColor = null;
    this.strokeColor = null;

    this.drawOutline = function (color) {
        this.strokeColor = color;
        game.ctx.strokeStyle = color;
        game.ctx.strokeRect(x, y, game.cellSize, game.cellSize);
    };

    this.draw = function (color, state) {
        var cellState = state || CellStates.active;
        if (color) {
            this.fillColor = color;
        }
        game.ctx.fillStyle = this.fillColor;
        game.ctx.fillRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
        this.state = cellState;
    };

    this.erase = function () {
//        Debug.LOG_LINE('cell erase');
        game.ctx.clearRect(x + 1, y + 1, game.cellSize - 2, game.cellSize - 2);
        this.state = CellStates.free;
    };

    this.toggle = function () {
        if (this.state === CellStates.free) {
            this.draw('rgb(200,0,0)');
        } else {
            this.erase();
        }
    }
};