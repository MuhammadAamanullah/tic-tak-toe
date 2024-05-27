import React from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const InitialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
];

function derivedPlayer(player){
  let currentPlayer = 'X'
  if(player.length > 0 &&  player[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

function derivedWinner(gameBoard, players){
  let winner;

   for(const combination of WINNING_COMBINATIONS){
    let firstSquare = gameBoard[combination[0].row][combination[0].column]
    let secondSquare = gameBoard[combination[1].row][combination[1].column]
    let thirdSquare = gameBoard[combination[2].row][combination[2].column]
    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare ){
      winner = players[firstSquare] 
    }
  } 
  return winner
}

function derivedGameBoard(gameTurns){
  const gameBoard = [...InitialGameBoard.map(array => [...array])]
  for (const turn of gameTurns){
      const {square, player} = turn
      const {row, col} = square
      gameBoard[row][col] = player
  }
  return gameBoard
}
function App() {
  const [gameTurns, setGameTurns]= useState([])
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player2',
  })

  function handlePlayerName(symbol, playerName){
    setPlayers(prevName => {
      return{
      ...prevName,
      [symbol] : playerName
      }

    })
  }
  const actvePlayer = derivedPlayer(gameTurns)
  const gameBoard = derivedGameBoard(gameTurns)
  const winner = derivedWinner(gameBoard, players)

  let hasDraw = gameTurns.length === 9 && !winner
  function handleSelectPlayer(rowIndex, colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = derivedPlayer(prevTurns)
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer, isDisabled: true}, ...prevTurns];
      return updatedTurns;
    })
  }

  function rematch(){
    setGameTurns([])
  }
  return (
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={actvePlayer === 'X'} updateName={handlePlayerName}/>
        <Player name="Player 2" symbol="O" isActive={actvePlayer === 'O'} updateName={handlePlayerName}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner = {winner} restart={rematch}/>}
      <GameBoard onSelectSquare={handleSelectPlayer} turns = {gameBoard} />
      <Log turns={gameTurns} />
    </div>
    </main>
  )
}

export default App
