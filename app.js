const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeBtn = document.querySelectorAll('.time-btn')
const timeCounter = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#00ffff', '#7fffd4', '#6495ed', '#ff7f50', '#006400', '#9400d3', '#ff1494']

let time = 0
let score = 0

startBtn.addEventListener('click', e => {
    e.preventDefault()
    changeScreen(0)
})

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        changeScreen(1)
        time = parseInt(e.target.getAttribute('data-time'))
        startGame()
    }
})

const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

const timerCounter = (value) => {
    timeCounter.innerHTML = `00:${value}`
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        timerCounter(current)
    }
}

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const createRandomCircle = () => {
    const circle = document.createElement('div')

    const color = getRandomColor()
    circle.style.backgroundColor = `${color}`
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color} `

    const size = getRandomNumber(10, 70)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(5, width - size);
    const y = getRandomNumber(5, height - size);

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

const startGame = () => {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    timerCounter(time)
}

const finishGame = () => {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    timeCounter.parentNode.classList.add('hide')
}

const changeScreen = (screen) => {
    screens[screen].classList.add('up')
}
