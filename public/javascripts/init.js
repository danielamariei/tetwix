/**-----------------*/
$('#game-over').hide();
$('#game-wrapper').hide();
$('#share-score').hover(function() {
    $("#share-score p").addClass("fb-hover");
}, function() {
    $("#share-score p").removeClass("fb-hover");
});

/**-----------------*/
$("#start-screen" ).delegate("#campaign", "click", function() {
    $("#game-wrapper").show();
    $("#start-screen").remove();
    game.controls.startNewGame(); });

/**-----------------*/
$("#game-wrapper" ).delegate("#share-score", "click", function() {
    game.controls.share();
});

$("#game-wrapper" ).delegate("#restart", "click", function() {
    game.controls.restart();
});

/**-----------------*/
$("#game-wrapper" ).delegate("#start", "click", function() {
    $("#game-wrapper").remove();
    $('#start-screen').show();
});

$("#game-wrapper" ).delegate("#control.play", "click", function() {
    game.controls.resume();
    $("#control").removeClass("play");
    $("#control").addClass("pause");
});

$("#game-wrapper" ).delegate("#control.pause", "click", function() {
    game.controls.pause();
    $("#control").removeClass("pause");
    $("#control").addClass("play");
});

$("#game-wrapper" ).delegate("#settings", "click", function() {
    //TODO show settings panel
});

