/* 首页轮播 */
export function homeBanner() {
    const url = common.origin + 'homeBanner' // 请求地址

    const data = Object.assign({}, common.commonParams, {})// 不加第一个{},一个页面多个接口会参数合并

    return axios.get(url, {
        params: data
    })
        .then((res) => {
            return Promise.resolve(res.data)
        })
        .catch(function (error) {
            /* 错误 */
            if (error.response) {
                // 具体错误，基本用不到，如果真的出现错误提示给用户，他也看不懂，你也无法解决
                // 你把你请求的接口里面的代码全部删除，error.response.status就是404
                console.log(error.response.data, error.response.status, error.response.headers)
            } else if (error.request) {
                // 不存在的请求就是这种错误
                console.log('提出了请求，但没有收到答复');
            } else {
                // 在设置请求时发生了一些事情，触发了一个错误
                console.log('Error', error.message);
            }
            return Promise.resolve({
                code: '连接服务器失败'
            })
        })
}

/* 首页推荐 */
export function homeRecommend() {
    const url = common.origin + 'homeRecommend' // 请求地址

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
