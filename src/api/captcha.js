axios.defaults.withCredentials = true // 接收cookie

export function captchaNote(phone, captchaImage) {
    const url = common.origin + 'captchaNote' // 请求地址

    const data = Object.assign({}, common.commonParams, {
        phone: phone,
        captchaImage: captchaImage
    })

    return axios.get(url, {
        params: data
    })
        .then((res) => {
            return Promise.resolve(res.data)
        })
}

/* 图片验证码 */
export function captchaImage() {
    const url = common.origin + 'captchaImage' // 请求地址

    const data = Object.assign({}, common.commonParams, {})

    return axios.get(url, {
        params: data
    })
        .then((res) => {
            return Promise.resolve(res.data)
        })
        .catch(() => {
            return Promise.resolve({
                code: '连接服务器失败'
            })
        })
}
