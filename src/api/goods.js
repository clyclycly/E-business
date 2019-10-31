/* 商品详细 */
export function goods(goodsId) {
    const url = common.origin + 'goods' // 请求地址

    const data = Object.assign({}, common.commonParams, {
        goodsId: goodsId
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
