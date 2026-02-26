/* eslint-disable no-unused-vars */

const Gameboard = (function () {
  const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  return {
    getBoard: () => {
      return board;
    },
    display: () => {
      console.log(`
 ${board[0]} | ${board[1]} | ${board[2]}
-----------
 ${board[3]} | ${board[4]} | ${board[5]}
-----------
 ${board[6]} | ${board[7]} | ${board[8]}
  `);
    },

    placeMarker: (index, marker) => {
      board[index] = marker;
    },
    resetBoard: () => {
      board.fill(" ");
    },
  };
})();

const gameController = (function () {
  //Hold the two players

  let player1 = createPlayer("Bob", "x");
  let player2 = createPlayer("Alice", "o");
  let moveCounter = 0;

  let currentPlayer = player1;

  return {
    //Track whose turn it is

    switchPlayers: function () {
      currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
      console.log(currentPlayer);
    },
    //Handle a turn (call placeMarker, then switch players)

    handleTurn: function (index) {
      Gameboard.placeMarker(index, currentPlayer.marker);
      moveCounter += 1;

      let winner = this.checkWin();
      if (moveCounter === 9 && winner === false) {
        console.log("It's a tie!");
      } else if (winner === 1) {
        console.log(`X won!`);
        player1.score += 1;
        console.log(`${player1.name}:${player1.score}`);
        console.log(`${player2.name}:${player2.score}`);
      } else if (winner === 2) {
        console.log(`O won!`);
        player2 += 1;
        console.log(player2.score);
      } else {
        this.switchPlayers();
      }
    },

    checkWin: function () {
      let winningArrCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      let currentBoard = Gameboard.getBoard();

      let results = Object.groupBy(currentBoard.keys(), (i) => currentBoard[i]);

      let xArr = results["x"];

      const existsX = winningArrCombinations.some((combo) =>
        combo.every((index) => {
          if (xArr === undefined) {
            return false;
          } else {
            return xArr.includes(index);
          }
        }),
      );

      let oArr = results["o"];

      const existsO = winningArrCombinations.some((combo) =>
        combo.every((index) => {
          if (oArr === undefined) {
            return false;
          } else {
            return oArr.includes(index);
          }
        }),
      );

      if (existsX) {
        return 1;
      } else if (existsO) {
        return 2;
      } else {
        return false;
      }
      // console.log(xArr);
      // console.log(oArr);
    },

    //Check for a win condition
    //Track/update score
  };
})();

function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
    score: 0,
  };
}
gameController.handleTurn(0); // X
gameController.handleTurn(1); // O
gameController.handleTurn(2); // X
gameController.handleTurn(4); // O
gameController.handleTurn(3); // X
gameController.handleTurn(5); // O
gameController.handleTurn(7); // X
gameController.handleTurn(6); // O
gameController.handleTurn(8); // X - 9th move, no winner
Gameboard.display();
gameController.checkWin();
