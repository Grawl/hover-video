document.addEventListener('DOMContentLoaded', init())
function updateTimeout(time = 100) {
    const data = window['hover-video']
    clearTimeout(data.timeout)
    return setTimeout(pauseVideo, time)
}
function init() {
    console.log('init')
    window['hover-video'] = {}
    const data = window['hover-video']
    data.counter = 0
    data.videoEl = document.querySelector('[hover-play-video]')
    data.textEl = document.querySelector('[text]')
    data.textContentStart = data.textEl.innerText
    data.letterSpeed = 5
    data.textContent = data.textEl.innerText
        .split('')
    updateText()
    data.videoEl.play()
        .then(() => {
            data.timeout = updateTimeout(1000)
        })
        .catch(error => {
            console.error({ error })
        })
}
function pauseVideo() {
    const data = window['hover-video']
    data.videoEl.pause()
}
function playVideo() {
    const data = window['hover-video']
    data.videoEl.play()
}
function updateTextData(progress) {
    const data = window['hover-video']
    console.log(data.textContent)
    const visibleWords = Math.floor(progress / data.letterSpeed)
    const visiblePart = data.textContent.slice(0, visibleWords)
    const hiddenPart = data.textContent.slice(visibleWords)
    console.log({ visibleWords, visiblePart, hiddenPart })
    return visiblePart.map(letter => `<span>${letter}</span>`)
        .concat(hiddenPart.map(letter => `<span invisible>${letter}</span>`))
}
function updateText(progress = 0) {
    const data = window['hover-video']
    data.textEl.innerHTML = updateTextData(progress).join('')
}
window['hover-video'].x = window.innerWidth
document.addEventListener('mousemove', mouseMoveEvent => {
    const data = window['hover-video']
    data.counter++
    console.log({ mouseMoveEvent }, data.counter)
    const x = mouseMoveEvent.x
    const y = mouseMoveEvent.y
    if ((x !== data.x || y !== data.y) && (data.x !== 0 && data.y !== 0)) {
        console.log('move')
        playVideo()
        data.timeout = updateTimeout()
    }
    updateText(data.counter)
    data.x = x
    data.y = y
    if (data.counter > data.textContentStart.length * data.letterSpeed) {
        const buttonEl = document.querySelector('[button]')
        buttonEl.classList.remove('hidden')
    }
})