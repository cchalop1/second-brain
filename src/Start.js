import React, { useState, useEffect, useRef } from 'react';
import './Start.css';
import { create_list_calc } from './utils';
import Time from './Time'

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// if (window.speechSynthesis.getVoices().length == 0) {
//     window.speechSynthesis.addEventListener('voiceschanged', function () {
//         textToSpeech();
//     });
// }
// else {
//     // languages list available, no need to wait
//     textToSpeech()
// }

const textToSpeech = (message) => {
    // get all voices that browser offers
    let available_voices = window.speechSynthesis.getVoices();

    // this will hold an english voice
    let english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
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


const recorde_audio = (option) => {
    return new Promise((res, rej) => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream)

                mediaRecorder.start()

                const audioChunks = []

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data)
                })

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks)
                    const audioUrl = URL.createObjectURL(audioBlob)
                    const audio = new Audio(audioUrl)
                    res(audio)
                })

                setTimeout(() => {
                    mediaRecorder.stop()
                }, (option.time * option.size) * 1000)
            })
            .catch(err => rej(err))
    })
}

const Start = (props) => {
    const calc_list = create_list_calc(props.option)
    const [index, setIndex] = useState(0)

    useInterval(() => {
        setIndex(index + 1)
        textToSpeech(calc_list[index])
    }, props.option.time * 1000);


    recorde_audio(props.option)
        .then(audio => audio.play())
        .catch(console.error)

    return (
        <div className="start">
            <Time {...props} />
            <div className="chrono"><h3>{props.option.size} operations</h3></div>
            <div className="opp">
                <h1>{calc_list[index]}</h1>
            </div>
        </div>
    )
}

export default Start;
