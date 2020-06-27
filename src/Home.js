import React, { useState } from 'react';
import './Home.css';

const Home = (props) => {
    const [time, setTime] = useState(2)
    const [size, setSize] = useState(3)
    const [multi, setMulti] = useState(false)
    const [add, setAdd] = useState(true)
    const [sub, setSub] = useState(false)

    return (
        <div className="Home">
            <div className="title">
                <h1>Seconds Brain</h1>
            </div >
            <div className="input">
                <h2>Time :</h2>
                <input type="number" value={time} onChange={(e) => { setTime(e.target.value) }} />
            </div>
            <div className="input">
                <h2>Size :</h2>
                <input type="number" value={size} onChange={(e) => { setSize(e.target.value) }} />
            </div>
            <div className="opt">
                <div className="opp">
                    <input type="checkbox" defaultChecked={multi} onChange={() => setMulti(!multi)} />
                    <h1>x</h1>
                </div>
                <div className="opp">
                    <input type="checkbox" defaultChecked={add} onChange={() => setAdd(!add)} />
                    <h1>+</h1>
                </div>
                <div className="opp">
                    <input type="checkbox" defaultChecked={sub} onChange={() => setSub(!sub)} />
                    <h1>-</h1>
                </div>
            </div>
            <div className="btn">
                <button className="btn-start" onClick={() => {
                    props.start({time, size, multi, add, sub})
                }}>start</button>
            </div>
        </div>
    );
}

export default Home;