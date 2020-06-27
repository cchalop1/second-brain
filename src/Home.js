import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <div className="title">
                <h1>Seconds Brain</h1>
            </div >
            <div className="input">
                <h2>Time :</h2>
                <input type="text" />
            </div>
            <div className="input">
                <h2>Size :</h2>
                <input type="text" />
            </div>
            <div className="opt">
                <div className="opp">
                    <input type="checkbox" /*defaultChecked={} onChange={}*/ />
                    <h1>X</h1>
                </div>
                <div className="opp">
                    <input type="checkbox" /*defaultChecked={} onChange={}*/ />
                    <h1>+</h1>
                </div>
                <div className="opp">
                    <input type="checkbox" /*defaultChecked={} onChange={}*/ />
                    <h1>-</h1>
                </div>
            </div>
            <div className="btn">
                <button className="btn-start">start</button>
            </div>
        </div>
    );
}

export default Home;