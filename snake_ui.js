var render = function(board) {
	$('#board').empty();
	for(var i = 0; i < board.size; i++){
		for(var j = 0; j < board.size; j++){
			console.log(board.grid[i][j]);
			$('#board').append("  " + board.grid[i][j] + "  ");			
		}
		$('#board').append('\n \n');
	}
};

$(document).ready(function(){
		var game = new Game();

		var gameStep = function(){
			game.update();
			render(game.board);
			if(game.step() === false){
				$('p').append('You lose!');
				return true;
			};
			window.setTimeout(gameStep, 250);
		};

		STEP_TIME_MILLIS = 250;
		window.setTimeout(gameStep, 250);

	 $('html').keydown(function (event){
	 	switch(event.keyCode){
	 		case 37:
	 		game.snake.direction = [0,-1];
	 		break;
	 		case 38:
	 		game.snake.direction = [-1,0];
	 		break;
	 		case 39:
	 		game.snake.direction = [0,1];
	 		break;
	 		case 40:
	 		game.snake.direction = [1,0];
	 		break;
	 	};
	 });
});
//left = 37
//up = 38
//right = 39
//down = 40