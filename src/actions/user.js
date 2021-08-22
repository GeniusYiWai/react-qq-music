import { message } from 'antd'
import { getCollectPlaylist as getUserCreatePlaylistAPI } from '@/api/profile'
import {
  getUserFollow as getUserFollowsAPI,
  getUserListenSongs as getUserListenSongsAPI
} from '@/api/profile'
import { collectSongToPlaylist as collectSongToPlaylistAPI } from '@/api/collect'
//获取用户创建或者收藏的歌单
export const getUserPlaylist = async (
  createPlcombineCondition,
  uid,
  setLoading = null,
  setData,
  type
) => {
  setLoading && setLoading(true)
  try {
    const {
      data: { playlist, code }
    } = await getUserCreatePlaylistAPI({ ...createPlcombineCondition })
    if (code === 200) {
      let data
      if (type === 'create') {
        //如果userId等于用户id 那就是用户创建的歌单
        data = playlist.filter(e => {
          return e.userId == uid
        })
      } else {
        //如果userId不等于用户id 那就是用户收藏的歌单
        data = playlist.filter(e => {
          return e.userId != uid
        })
      }
      setData(data)
      setLoading && setLoading(false)
    }
  } catch (error) {
    setLoading && setLoading(false)
    message.error(
      type === 'create' ? '获取用户创建歌单失败!' : '获取用户收藏歌单失败!'
    )
  }
}
//获取用户关注
export const getUserFollows = async (id, setData) => {
  try {
    const {
      data: { follow, code }
    } = await getUserFollowsAPI(id)
    if (code === 200) {
      setData(follow)
    }
  } catch (error) {
    message.error('获取用户关注列表失败!')
  }
}

//获取用户最近常听
export const getUserListenSongs = async (id, setData) => {
  try {
    const {
      data: { weekData, code }
    } = await getUserListenSongsAPI(id)
    if (code === 200) {
      setData(weekData)
    }
  } catch (error) {
    message.warning('无权限访问用户听歌排行!')
  }
}
//添加歌曲到歌单
export const collectSongToPlaylist = async (
  playlist,
  id,
  setIsModalVisible
) => {
  setIsModalVisible(false)
  try {
    const {
      data: {
        body: { code }
      }
    } = await collectSongToPlaylistAPI(playlist.id, id)
    if (code === 200) {
      message.success('添加成功。')
    } else if (code === 502) {
      message.warning('歌单内歌曲重复!')
    }
  } catch (error) {
    message.error('添加失败!')
  }
}
