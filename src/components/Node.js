import React, {useState} from 'react'
import './Node.css';

const Node = ({position, player1Turn, setPlayer1Turn, setPlayer1, setPlayer2}) => {
  const [value, setValue] = useState('');
  const handleClick = () => {
    if (value === '') {
      if(player1Turn) {
        setValue('X');
        setPlayer1((prev) => {
          const newMap = {
            ...prev,
            [position]: position
          }
          return newMap;
        });
      } else {
        setValue('O');
        setPlayer2((prev) => {
          const newMap = {
            ...prev,
            [position]: position
          }
          return newMap;
        });
      }
      setPlayer1Turn(!player1Turn);
    }
  }
  return (
    <div onClick={handleClick} className={`node node-${position} ${value}`}>
      <div className={`node-text`}></div>
    </div>
  )
}

export default Node;
