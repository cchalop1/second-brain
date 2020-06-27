export const create_list_calc = (option) => {
    let arr = []
    for (let i = 0; i < option.size; i += 1) {
        let str = ''
        str += Math.floor((Math.random() * 10) + 1)
        str += option.operator[Math.floor((Math.random() * option.operator.length))]
        str += Math.floor((Math.random() * 10) + 1)
        arr.push(str)
    }
    return arr
}

// const recorde_audio = () => {
//     return new Promise((res, rej) => {
//         navigator.mediaDevices.getUserMedia({ audio: true })
//             .then(stream => {
//                 const mediaRecorder = new MediaRecorder(stream)

//                 mediaRecorder.start()

//                 const audioChunks = []

//                 mediaRecorder.addEventListener("dataavailable", event => {
//                     audioChunks.push(event.data)
//                 })

//                 mediaRecorder.addEventListener("stop", () => {
//                     const audioBlob = new Blob(audioChunks)
//                     const audioUrl = URL.createObjectURL(audioBlob)
//                     const audio = new Audio(audioUrl)
//                     res(audio)
//                 })

//                 // setTimeout(() => {
//                 //     mediaRecorder.stop()
//                 // }, (option.time * 1000) * option.size)
//             })
//     })
// }


// const iter_calc = () => {
//     let index = 0
//     // calc.innerText = list[index]
//     let refreshIntervalId = setInterval((option) => {
//         index += 1;
//         // calc.innerText = list[index]
//     }, option.time * 1000);
//     setTimeout((option) => {
//         clearInterval(refreshIntervalId)
//         // calc.innerText = ''
//         console.log('end')
//     }, (option.time * 1000) * option.size)
// }


// var audio = new Audio();
// audio.src = 'http://translate.google.com/translate_tts?ie=utf-8&tl=en&q=Hello%20World.';
// audio.play();