export const handleSinger = artists => {
  return artists.reduce((initVal, val, index) => {
    if (index === artists.length - 1) {
      return initVal + val.name
    } else {
      return initVal + val.name + '/'
    }
  }, '')
}

export const handleDate = date => {
  let time = new Date(date)
  let M =
    (time.getMonth() + 1 < 10
      ? '0' + (time.getMonth() + 1)
      : time.getMonth() + 1) + '-'
  let D = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ''
  return M + D
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

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
export function formatMinuteSecond(time) {
  return formatDate(time, 'mm:ss')
}

export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

//随机播放获取随机数
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
