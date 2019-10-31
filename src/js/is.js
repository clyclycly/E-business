export function isNumber(val) {
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    return regPos.test(val) || regNeg.test(val)
}

export function isScrollBottom() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    return scrollTop + clientHeight === scrollHeight
}

export function isRollingDirection() {
    let initialPositionX = 0
    let initialPositionY = 0
    window.addEventListener('touchstart', (e) => {
        initialPositionX = e.changedTouches[0].clientX
        initialPositionY = e.changedTouches[0].clientY
    })
    window.addEventListener('touchend', (e) => {
        if (initialPositionY - e.changedTouches[0].clientY > 50 || initialPositionY - e.changedTouches[0].clientY < -50) {
        }
        else if (e.changedTouches[0].clientX - initialPositionX > 100) {
            console.log('右')
        }
        else if (initialPositionX - e.changedTouches[0].clientX > 100) {
            console.log('左')
        }
    })
}