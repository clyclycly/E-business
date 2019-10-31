import Qs from 'qs' // Qs.stringify（data），没有这个post多个括号（也可以服务器端去取）
axios.defaults.withCredentials = true

/* 注册 */
export function userNew(phone, password, captchaNode) {
  const url = common.origin + 'userNew'
  const data = Qs.stringify(Object.assign({}, common.commonParams, {
    phone: phone,
    password: password,
    captchaNode: captchaNode
  }))
  return axios.post(url, data, {
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

/* 密码登录 */
export function userPasswordLogin(phone, password) {
  const url = common.origin + 'userPasswordLogin'
  const data = Qs.stringify(Object.assign({}, common.commonParams, {
    phone: phone,
    password: password
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

/* 短信登录 */
export function userNoteLogin(phone, captchaNode) {
  const url = common.origin + 'userNoteLogin'
  const data = Qs.stringify(Object.assign({}, common.commonParams, {
    phone: phone,
    captchaNode: captchaNode
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

/* 修改头像 */
export function userChangeAvatar(uid, photoBase64) {
  const url = common.origin + 'userChangeAvatar'
  const data = Qs.stringify(Object.assign({}, common.commonParams, {
    uid: uid,
    photoBase64: photoBase64
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

/* 退出登录 */
export function userQuitLogin() {
  const url = common.origin + 'userQuitLogin' // 请求地址

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

