import React, { useState, useEffect } from 'react';
import './Start.css';
import { create_list_calc } from './utils';
import Time from './Time'


const Start = (props) => {
    const calc_list = create_list_calc(props.option)

    const [index, setIndex] = useState(0)

    let inteval = setInterval(() => {
        setIndex(index + 1)
    }, props.option.time * 1000)
        
        
    return (
        <div className="start">
            <Time {...props}/>
            <div className="chrono"><h3>{props.option.size} operations</h3></div>
            <div className="opp">
                <h1>{calc_list[index]}</h1>
            </div>
        </div>
    )
}

export default Start;
