export const handleSinger = artists => {
  return artists.reduce((initVal, val, index) => {
    if (index === artists.length - 1) {
      return initVal + val.name
    } else {
      return initVal + val.name + '/'
    }
  }, '')
}
export const handleSongDuration = time => {
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))

  let seconds = Math.round((time % (1000 * 60)) / 1000)
  seconds = seconds.toString().length === 2 ? seconds : seconds + '0'

  return '0' + minutes + ':' + seconds
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
