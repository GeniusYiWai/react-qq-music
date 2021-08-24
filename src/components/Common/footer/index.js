import React, { memo } from 'react'
import { GithubOutlined } from '@ant-design/icons'
import './index.less'
export default memo(function Footer() {
  return (
    <div className='footer'>
      <p>create by 意外</p>
      <p>
        项目地址:
        <GithubOutlined
          onClick={() =>
            window.open('https://github.com/GeniusYiWai/react-qq-music')
          }
        />
        <a href='https://github.com/GeniusYiWai/react-qq-music'>
          GeniusYiWai/react-qq-music
        </a>
      </p>
      <p>
        感谢:
        <GithubOutlined
          onClick={() =>
            window.open('https://github.com/Binaryify/NeteaseCloudMusicApi')
          }
        />
        <a href='https://github.com/Binaryify/NeteaseCloudMusicApi'>
          Binaryify/NeteaseCloudMusicApi
        </a>
      </p>
    </div>
  )
})
