import React, {
    useState
} from 'react';
import './App.css';
import Home from './Home'
import Start from './Start'
import End from './End'


// TODO : end dashboard

class Option {
    constructor(time, size, multi, add, sub, end) {
        this.time = time
        this.size = size
        this.end = end
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
    const [list, setList] = useState(undefined)
    const [audio, setAudio] = useState(undefined)

    
    const start = (option_current) => {
        setOption(new Option(option_current.time, option_current.size, option_current.multi, option_current.add, option_current.sub, false))
    }

    const end = (list, audio) => {
        setOption(new Option(option.time, option.size, option.multi, option.add, option.sub, true))
        setList(list);
        setAudio(audio);
    }
    
    if (!option)
        return <Home option={option} start={start} />;
    else if (option.end)
        return <End list={list} audio={audio}/>;
    else
        return <Start option={option} end={end} />;
}

export default App;
