import md5 from 'js-md5'

/* 密码加密 */
export function passwordMd5(arg) {
  return md5(arg + 'xxasd我擦adahhja1276612871288172712gfadahahggfhg啊啊啊12，，,,')
}

/* svg */
export function svgMd5(arg) {
  return md5(arg + 'qwqwqwwqkj我擦adjalkkd')
}

/* 短信 */
export function noteMd5(arg) {
  return md5(arg + 'qwqwqwwaajslkdaslkjdlaww世纪浩劫就伸开佳都科技福建省的lkkd')
}

/* 图片验证码无法防止Python脚本  */
