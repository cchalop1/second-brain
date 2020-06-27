import React, { useState} from 'react';

const Time = (props) => {
    const [chrono, setChrono] = useState(undefined)
    const [currentChrono, setCurrentChrono] = useState(0)


    if (!chrono) {
        setChrono(Date.now())
        setCurrentChrono(Date.now())

        let interval = setInterval(() => {
            setCurrentChrono(currentChrono => currentChrono + 1000);
        }, 1000)

        setTimeout(() => {
            clearInterval(interval)
        }, (props.option.time * props.option.size) * 1000)

    }


    const format_chrono = () => {
        let s = ((currentChrono - chrono) / 1000) % 60
        let min = (currentChrono - chrono) / 60000

        if (s < 10)
            s = `0${Math.round(s)}`
        if (min < 10)
            min = `0${Math.floor(min)}`
        return `${min}:${s}`
    }

    return (<div className="chrono"><h1>{format_chrono()}</h1></div>)
}

export default Time