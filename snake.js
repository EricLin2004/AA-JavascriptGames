var Board = function(size){
	this.grid = _.times(size, function() {return Array(size);});
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++){
			this.grid[i][j] = " ";
		}
	}

	this.size = size;
	this.validMove = function(move) { 
		return ((this.grid[move[0]][move[1]] != "S") && (move[0] >= 0 && move[0] <= size) && 
			(move[1] >= 0 && move[1] <= size));
	};

	this.makeMove = function(move) {
		this.grid[move[0]][move[1]] = "S";
	};

	this.makeApple = function() {
		while(true) {
			var x = Math.floor(Math.random() * size);
			var y = Math.floor(Math.random() * size);
			if (this.grid[x][y] === ' ') {
				this.grid[x][y] = "@";
				break;
			}
		}
	};

	this.checkApple = function() {
		for(var i = 0; i < this.grid.length; i++){
			for(var j = 0; j < this.grid.length; j++){
				if(this.grid[i][j] == "@"){
					return true;
				}
			}
		}
		return false;
	};
};

var Snake = function() {
	this.children = 2;

	this.direction = [0,1];

	this.currentSquare = [5,5]

	this.history = [[5,5],[5,4]];


	this.move = function() {
		var newPos = [this.direction[0] + this.currentSquare[0],
									this.direction[1] + this.currentSquare[1]];
		return newPos;
	};

	this.posUpdate = function(board, move) {
		this.history.unshift(move);
		if(board.grid[move[0]][move[1]] != "@"){
			this.history.pop();
		}
		this.currentSquare = move;
	};

};


var Game = function() {
	this.board = new Board(12);
	this.snake = new Snake();
	
	this.step = function() {
		var move = this.snake.move();
		if(this.board.validMove(move)){
			this.snake.posUpdate(this.board, move);
			this.board.makeMove(move);
		}else{
			return false;
		}
	};

	this.update = function() {
		history = this.snake.history;
		for(var i = 0; i < this.board.size; i++){
			for(var j = 0; j < this.board.size; j++){
				if(this.board.grid[i][j] != "@"){
					this.board.grid[i][j] = ' '
				}
			}
		}

		for(var i = 0; i < this.snake.history.length; i++){
			this.board.grid[history[i][0]][history[i][1]] = "S";
		}

		if(!(this.board.checkApple())){
			this.board.makeApple();
		}
	};
};
