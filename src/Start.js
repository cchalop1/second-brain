import React, { useState, useEffect, Profiler } from 'react';
import './Start.css';
import Time from './Time'
import { create_list_calc } from './utils';

const textToSpeech = (message) => {
    let available_voices = window.speechSynthesis.getVoices();

    let english_voice = '';

    for (let i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'fr-FR') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];
    let utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = message;
    utter.voice = english_voice;
    window.speechSynthesis.speak(utter);
}

const AudioRecoder = (props) => {
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                let audioChunks = []
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data)
                })
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks)
                    const audioUrl = URL.createObjectURL(audioBlob)
                    const audio = new Audio(audioUrl)
                    props.end(props.calcList, audio);
                })
                setTimeout(() => {
                    mediaRecorder.stop();
                }, (props.option.time * props.option.size + 1) * 1000);
            });
    }, []);
    return <div />
}

class DispalyCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index : 0,
            inter: undefined
        }
    }

    componentDidMount() {
        this.setState({inter: setInterval(() => {
            textToSpeech(this.props.calcList[this.state.index]);
            this.setState({index: this.state.index + 1})
        }, this.props.option.size * 1000)});

    }

    componentWillUnmount() {
        clearInterval(this.state.inter);
    }

    render() {
        return (<div className="display-calc">
            <h1>{this.props.calcList[this.state.index]}</h1>
        </div>)
    }
}

// const DispalyCalc = (props) => {
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         textToSpeech(props.calcList[index]);
//         setIndex(index + 1);
//     }, props.option.size * 1000)

//     return (<div className="display-calc">
//         <h1>{props.calcList[index]}</h1>
//     </div>);
// }

const Start = (props) => {
    const [calcList, setCalcList] = useState(undefined);

    useEffect(() => {
        setCalcList(create_list_calc(props.option));
    }, []);

    if (!calcList) {
        return <div />;
    } else {
        return (
            <div className="start">
                <Time {...props} />
                <AudioRecoder {...props} calcList={calcList} />
                <div className="chrono"><h3>{props.option.size} operations</h3></div>
                <DispalyCalc  {...props} calcList={calcList} />
            </div>
        );
    }
}

export default Start;