import React from 'react';
import './End.css';

const End = (props) => {
    if (props.list && props.audio) {
        return (
            <div className="main">
                <button onClick={() => { props.audio.play() }}>play</button>
                {props.list.map((el, idx) => {
                    return (<div className="elem" key={idx}>
                        <div className="calc">
                            <p>{el}</p>
                            <p>=</p>
                            <p>{eval(el)}</p>
                        </div>
                        <input type="checkbox"></input>
                    </div>);
                })}
            </div>
        );
    } else {
        return <div />
    }
}

export default End