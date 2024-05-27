import { useState } from "react"

export default function Player({name, symbol, isActive, updateName}){
  const [buttonName, setButtonName] = useState('Edit')
  const [playerName, setPlayerName] = useState(name)

  function handleClick(){
    const status = buttonName === 'Edit' ? 'Save' : 'Edit'
    setButtonName(status)
    if (status == 'Edit'){
      updateName(symbol, playerName)
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value)
  }
    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
          { buttonName === 'Save' && <input type="text" required className="player-name" onChange={handleChange} value ={playerName}/>}
          { buttonName === 'Edit' &&  <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick} >{buttonName}</button>
        </li>
    )
}