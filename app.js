/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie

/*------------------------ Cached Element References ------------------------*/
const squareE1s = document.querySelectorAll('.sqr')
const messageE1 = document.getElementById('message')
const resetButton = document.getElementById('reset')

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

const updateBoard = () => {
  board.forEach((value, index) => {
    const square = squareE1s[index]
    square.textContent = value
    if (value === 'X') {
      square.style.color = 'blue'
    } else if (value === 'O') {
      square.style.color = 'red'
    } else {
      square.style.color = 'black'
    }
  })
}

function updateMessage(winner, tie, currentPlayer) {
  if (winner === false && tie === false) {
    messageE1.textContent = `It's ${currentPlayer}'s turn.`
  } else if (winner === false && tie === true) {
    messageE1.textContent = "It's a tie!"
  } else {
    messageE1.textContent = `Congratulations, ${currentPlayer} wins!`
  }
}

const winningCs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const render = () => {
  updateBoard()
  updateMessage(winner, tie, turn)
}

/*----------------------------- Event Listeners -----------------------------*/
const handleClick = (event) => {
  const squareIndex = event.target.id
  if (board[squareIndex] || winner) return
  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

const placePiece = (index) => {
  board[index] = turn
}

const checkForWinner = () => {
  winningCs.forEach((combo) => {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true
    }
  })
}

const checkForTie = () => {
  if (!winner && !board.includes('')) {
    tie = true
  }
}

const switchPlayerTurn = () => {
  if (!winner) {
    turn = turn === 'X' ? 'O' : 'X'
  }
}

resetButton.addEventListener('click', init)

squareE1s.forEach((square) => {
  square.addEventListener('click', handleClick)
})

init()
