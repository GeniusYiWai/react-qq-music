export const getItem = item => {
  try {
    return JSON.parse(localStorage.getItem(item))
  } catch (error) {
    return localStorage.getItem(item)
  }
}
export const setItem = (name, value) => {
  try {
    value = JSON.stringify(value)
    localStorage.setItem(name, value)
  } catch (error) {
    localStorage.setItem(name, value)
  }
}

export const getMusicById = id => {
  const playlist = getItem('playlist')
  return playlist.find(item => item.id === id)
}
