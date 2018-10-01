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
    data.loaderEl = document.querySelector('[loader]')
    data.videoEl.play()
        .then(() => {
            data.timeout = updateTimeout(1000)
            data.loaderEl.hidden = true
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
window['hover-video'].x = window.innerWidth
document.addEventListener('mousemove', mouseMoveEvent => {
    // console.log({ mouseMoveEvent })
    const data = window['hover-video']
    data.counter++
    const x = mouseMoveEvent.x
    if (x > data.x && data.x !== 0) {
        console.log('right')
        playVideo()
        data.timeout = updateTimeout()
    }
    data.x = x
    if (data.counter > 300) {
        const buttonEl = document.querySelector('[button]')
        buttonEl.classList.remove('hidden')
    }
})