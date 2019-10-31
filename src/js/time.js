let d = new Date()

export function timeA(arg) {
    if (arg === null) {
        return null
    }
    d.setTime(arg)
    return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日"
}
