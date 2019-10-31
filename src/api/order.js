import Qs from 'qs'
axios.defaults.withCredentials = true // 接收cookie

/* 订单添加 */
export function orderAdd(uid, goodsId, color, size, number) {
  const url = common.origin + 'orderAdd' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    goodsId: goodsId,
    color: color,
    size: size,
    number: number,
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

/* 订单地址修改 */
export function orderSiteChange(uid, orderId, user, phone, site) {
  const url = common.origin + 'orderSiteChange' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    orderId: orderId,
    user: user,
    phone: phone,
    site: site
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

/* 订单删除 */
export function orderDelete(uid, orderId) {
  const url = common.origin + 'orderDelete' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    orderId: orderId
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

/* 订单退款 */
export function orderRefund(uid, orderId, refundContent, refundPrice, images) {
  const url = common.origin + 'orderRefund'
  const data = Qs.stringify(Object.assign({}, common.commonParams, {
    uid: uid,
    orderId: orderId,
    refundContent: refundContent,
    refundPrice: refundPrice,
    images: images
  }))
  return axios.post(url, data,
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

/* 订单支付 */
export function orderPayment(uid, orderId) {
  const url = common.origin + 'orderPayment' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    orderId: orderId
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

/* 订单详情 */
export function orderDetail(uid, orderId) {
  const url = common.origin + 'orderDetail' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    orderId: orderId
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

/* 已支付 */
export function orderYizhifu(uid, page) {
  const url = common.origin + 'orderYizhifu' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    page: page,
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

/* 未支付 */
export function orderWeizhifu(uid, page) {
  const url = common.origin + 'orderWeizhifu' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    page: page
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

/* 退款 */
export function orderTuikuan(uid, page) {
  const url = common.origin + 'orderTuikuan' // 请求地址

  const data = Object.assign({}, common.commonParams, {
    uid: uid,
    page: page
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
