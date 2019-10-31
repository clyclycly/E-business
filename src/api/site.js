axios.defaults.withCredentials = true

/* 地址 */
export function site(uid) {
    const url = common.origin + 'site'

    const data = Object.assign({}, common.commonParams, {
        uid: uid
    })

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

/* 默认地址 */
export function siteDefault(uid, siteId) {
    const url = common.origin + 'siteDefault'

    const data = Object.assign({}, common.commonParams, {
        uid: uid,
        siteId: siteId
    })

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

/* 删除地址 */
export function siteDelete(uid, siteId) {
    const url = common.origin + 'siteDelete'

    const data = Object.assign({}, common.commonParams, {
        uid: uid,
        siteId: siteId
    })

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

/* 添加地址 */
export function siteAdd(uid, name, phone, site, _default) {
    const url = common.origin + 'siteAdd'

    const data = Object.assign({}, common.commonParams, {
        uid: uid,
        name: name,
        phone: phone,
        site: site,
        _default: _default
    })

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

/* 微信api选择地址 */
export function getSite(adcode) {
    const url = 'https://wxapi.hotapp.cn/api/districts'

    const data = Object.assign({}, common.commonParams, {
        parent_adcode: adcode
    })

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

