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
