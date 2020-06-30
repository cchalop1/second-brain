import React, { useState, useEffect, Profiler } from 'react';
import './Start.css';
import Time from './Time'
import { create_list_calc } from './utils';


const loadSpeechLangage = () => {
    let available_voices = window.speechSynthesis.getVoices();
    
    let voice = '';
    
    for (let i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'fr-FR') {
            voice = available_voices[i];
            break;
        }
    }
    if (voice === '')
        voice = available_voices[0];
    return voice
}

const textToSpeech = (message, voice) => {
    let utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = message;
    utter.voice = voice;
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
            inter: undefined,
            voice: loadSpeechLangage()
        }
    }

    componentDidMount() {
        this.setState({inter: setInterval(() => {
            textToSpeech(this.props.calcList[this.state.index], this.state.voice);
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