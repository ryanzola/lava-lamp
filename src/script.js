import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience({
    targetElement: document.querySelector('.experience')
})


// stick this somewhere else
let keySequence = []
let konamiString = ''
const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
]
let debugActive = '';

function intervalFactory() {
    return setInterval(() => {
        console.log(keySequence)
        if(!keySequence.length) return;
    
        keySequence = []
    }, 3000)
}

let interval;

let header = document.createElement('h1')
header.innerText = debugActive;

document.body.appendChild(header)

document.addEventListener('keyup', e => {
    if(e.key === 'Escape') {
        debugActive = '';
        header.innerText = debugActive;
        return;
    }

    // push keypresses to the sequence array
    keySequence.push(e.key)

    // only accept the last 10 keypresses
    keySequence.splice(
        -konamiCode.length - 1, 
        keySequence.length - konamiCode.length
    );

    // convert the array to a string
    konamiString = konamiCode.join('');

    if(keySequence.join('').includes(konamiString)) {
        console.log('mothafucka!')
        debugActive = 'CHEAT CODE ACTIVATED!';
        header.innerText = debugActive;
        keySequence = []
        clearInterval(interval)
        interval = 0;
        return
    }

    if(interval) clearInterval(interval)

    interval = intervalFactory();
})

