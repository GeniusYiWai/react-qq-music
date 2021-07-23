//设置缓存
export const getItem = item => {
  try {
    return JSON.parse(localStorage.getItem(item))
  } catch (error) {
    return localStorage.getItem(item)
  }
}
//读取缓存
export const setItem = (name, value) => {
  try {
    value = JSON.stringify(value)
    localStorage.setItem(name, value)
  } catch (error) {
    localStorage.setItem(name, value)
  }
}
//通过音乐id查找其是否存在于缓存中的音乐列表
export const getMusicById = id => {
  const playlist = getItem('playlist')
  return playlist.find(item => item.id === id)
}
