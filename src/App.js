import React, { useState } from 'react';
import './App.css';
import Home from './Home'
import Start from './Start'


class Option {
  constructor(time, size, multi, add, sub) {
    this.time = time
    this.size = size
    this.parse_operator(multi, add, sub)
  }

  setTime = (time) => {
    this.time = Number(time)
  }

  setSize = (size) => {
    this.size = Number(size)
  }
  
  parse_operator = (multi, add, sub) => {
    let str = ''
    if (multi)
      str += '*'
    if (add)
      str += '+'
    if (sub)
      str += '-'
    this.operator = str
  }
}

const App = () => {
  const [option, setOption] = useState(undefined)

  const start = (option) => {
    setOption(new Option(option.time, option.size, option.multi, option.add, option.sub))
  }

  if (!option)
    return <Home option={option} start={start}/>
  else
    return <Start option={option}/>
}

export default App;