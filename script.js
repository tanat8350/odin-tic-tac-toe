const ticTacToe = (function gameboard() {
  const board = [];
  let player1;
  let player2;
  let turn = 0;
  let gameEnd = false;

  // DOM
  const paraPlayerInfo = document.querySelector(".player-info");
  const spanPlayerTurn = document.querySelector(".player-turn");

  const newGameBtn = document.querySelector(".new-game-btn");
  const setPlayerNameBtn = document.querySelector(".set-player-name-btn");

  const boardBox = document.querySelector(".board");
  const boxes = document.querySelectorAll(".board>div");

  const modal = document.querySelector("dialog");
  const inputPlayer1 = document.querySelector("#input-player1");
  const inputPlayer2 = document.querySelector("#input-player2");

  const paraResult = document.querySelector(".result");

  // Event listeners
  modal.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("modal-set-btn")) {
      player1 = inputPlayer1.value;
      player2 = inputPlayer2.value;
      updatePlayerNames();
    }
    if (target.classList.contains("modal-close-btn")) modal.close();
  });

  newGameBtn.addEventListener("click", () => {
    newGame();
  });

  setPlayerNameBtn.addEventListener("click", () => {
    modal.showModal();
  });

  boardBox.addEventListener("click", (e) => {
    if (!gameEnd) {
      const target = e.target;
      if (target.textContent !== "") {
        paraResult.textContent = "Already selected, choose another one";
      } else {
        if (target.classList.contains("box")) {
          let currentPlayer = "";
          turn++;
          paraResult.textContent = "";
          if (turn % 2 === 1) {
            currentPlayer = player1;
            spanPlayerTurn.textContent = player2;
          } else {
            currentPlayer = player2;
            spanPlayerTurn.textContent = player1;
          }
          target.textContent = currentPlayer;
          playerMove(currentPlayer, target.dataset.box);
        }
      }
    }
  });

  const init = (() => {
    player1 = inputPlayer1.value;
    player2 = inputPlayer2.value;
  })();

  const updatePlayerNames = () => {
    paraPlayerInfo.innerText = `Player 1: ${player1}
    Player 2: ${player2}`;
    spanPlayerTurn.textContent = player1;
  };

  const newGame = () => {
    gameEnd = false;
    turn = 0;
    updatePlayerNames();
    paraResult.textContent = "";
    board.length = 0;
    for (let i = 1; i <= 9; i++) {
      board.push(null);
    }
    for (const box of boxes) {
      box.textContent = "";
    }
  };

  newGame();

  const playerMove = (player, move) => {
    board.splice(move - 1, 1, player);
    findWinner(player);
  };

  const findWinner = (currentPlayer) => {
    if (
      // 012
      (board[0] === currentPlayer &&
        board[1] === currentPlayer &&
        board[2] === currentPlayer) ||
      // 345
      (board[3] === currentPlayer &&
        board[4] === currentPlayer &&
        board[5] === currentPlayer) ||
      // 678
      (board[6] === currentPlayer &&
        board[7] === currentPlayer &&
        board[8] === currentPlayer) ||
      // 036
      (board[0] === currentPlayer &&
        board[3] === currentPlayer &&
        board[6] === currentPlayer) ||
      // 147
      (board[1] === currentPlayer &&
        board[4] === currentPlayer &&
        board[7] === currentPlayer) ||
      // 258
      (board[2] === currentPlayer &&
        board[5] === currentPlayer &&
        board[8] === currentPlayer) ||
      // 048
      (board[0] === currentPlayer &&
        board[4] === currentPlayer &&
        board[8] === currentPlayer) ||
      // 246
      (board[2] === currentPlayer &&
        board[4] === currentPlayer &&
        board[6] === currentPlayer)
    ) {
      gameEnd = true;
      paraResult.textContent = `${currentPlayer} wins`;
    }
    if (turn === 9) {
      gameEnd = true;
      paraResult.textContent = "Draws";
    }
  };
})();
