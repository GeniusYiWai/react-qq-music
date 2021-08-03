//处理歌手
export const handleSinger = artists => {
  if (Array.isArray(artists)) {
    return artists.reduce((initVal, val, index) => {
      if (index === artists.length - 1) {
        return initVal + val.name
      } else {
        return initVal + val.name + '/'
      }
    }, '')
  }
}
//处理日期
export const handleDate = date => {
  let time = new Date(date)
  let M =
    (time.getMonth() + 1 < 10
      ? '0' + (time.getMonth() + 1)
      : time.getMonth() + 1) + '-'
  let D = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ''
  return M + D
}
//补零
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
//格式化日期
export function formatDate(time, fmt) {
  let date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }

  return fmt
}
//时分秒
export function formatMinuteSecond(time) {
  return formatDate(time, 'mm:ss')
}
//获取音乐播放地址
export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
//随机播放 获取随机数
export const getRandomIndex = (index, length) => {
  let newIndex
  let randomIndex = Math.ceil(Math.random() * (length - 1))
  if (randomIndex !== index) {
    newIndex = randomIndex
  } else {
    getRandomIndex()
  }
  return newIndex
}
// 裁剪图片
export const clipImgSize = (x, y) => {
  return `?param=${x}y${y}`
}

//处理页面滚动
export const ScrollTop = (number = 0, time) => {
  if (!time) {
    document.body.scrollTop = document.documentElement.scrollTop = number
    return number
  }
  const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
  let spacingInex = time / spacingTime // 计算循环的次数
  let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
  let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
  let scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      ScrollTop((nowTop += everTop))
    } else {
      clearInterval(scrollTimer) // 清除计时器
    }
  }, spacingTime)
}
//获取页面滚动距离
export const getScrollTop = () => {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

//防抖
export const debounce = (fn, wait) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export const highlightKeyword = (keyword, str) => {
  const reg = new RegExp(keyword, 'g')
  str = str && str.replace(reg, `<span class='highlight'>${keyword}</span>`)
  return str
}

export const dateFormat = (time, format) => {
  const t = new Date(time)
  // 日期格式
  format = format || 'Y-m-d h:i:s'
  let year = t.getFullYear()
  // 由于 getMonth 返回值会比正常月份小 1
  let month = t.getMonth() + 1
  let day = t.getDate()
  let hours = t.getHours()
  let minutes = t.getMinutes()
  let seconds = t.getSeconds()

  const hash = {
    y: year,
    m: month,
    d: day,
    h: hours,
    i: minutes,
    s: seconds
  }
  // 是否补 0
  const isAddZero = o => {
    return /M|D|H|I|S/.test(o)
  }
  return format.replace(/\w/g, o => {
    let rt = hash[o.toLocaleLowerCase()]
    return rt > 10 || !isAddZero(o) ? rt : `0${rt}`
  })
}
