var isGameInit = false;
/**-----------------*/
$('#game-over').hide();
$('#game-wrapper').hide();
$('#share-score').hover(function() {
    $("#share-score p").addClass("fb-hover");
}, function() {
    $("#share-score p").removeClass("fb-hover");
});

/**-----------------*/
function startNewGame() {
    if (!isGameInit) {
        $("#game-wrapper").show();
        $("#start-screen").hide();
        game.controls.startNewGame();
        isGameInit = true;
    } else {
        $("#game-wrapper").show();
        $("#start-screen").hide();
        game.controls.resume()
    }
}
$("#start-screen" ).delegate("#campaign", "click", startNewGame);

/**-----------------*/
$("#game-wrapper" ).delegate("#share-score", "click", function() {
    game.controls.share();
});

$("#game-wrapper" ).delegate("#restart", "click", function() {
    game.controls.restart();
});

/**-----------------*/
$("#game-wrapper" ).delegate("#start", "click", function() {

    $("#game-wrapper").hide();
    $('#start-screen').show();
    game.controls.restart()
    game.controls.pause();
});

$("#game-wrapper" ).delegate("#control.play", "click", function() {
    $("#control").removeClass("play");
    $("#control").addClass("pause");
    $("#control").attr('title', "Pause")
    game.controls.resume();
});

$("#game-wrapper" ).delegate("#control.pause", "click", function() {
    $("#control").removeClass("pause");
    $("#control").addClass("play");
    $("#control").attr('title', "Play")
    game.controls.pause();
});

$("#game-wrapper" ).delegate("#settings", "click", function() {
    //TODO show settings panel
});

