# 项目简介

高仿QQ音乐pc端官网，实现了大部分功能，由于没有找到合适的qq音乐API，所以后台数据使用的是用[Binaryify](https://github.com/Binaryify)/**[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)**搭建的网易云音乐API。

如果觉得本项目还不错，请给个star吧～(￣▽￣～)(～￣▽￣)～,感谢Binaryify大佬提供的接口。

# 安装

第一步：下载运行后台接口NeteaseCloudMusicApi

```
 git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git 

 npm install

 node app.js
```

NeteaseCloudMusicApi默认运行在3000端口,若不想使用 3000 端口,可自行修改，但同时要修改本项目的后台接口地址

第二步: 下载本项目

```
 git clone https://github.com/GeniusYiWai/react-qq-music.git
 npm install
 npm run start
```

默认运行在8888端口

# 预览地址

http://81.68.126.252/#/musichall/home

学生机，加载会比较慢，之后有缓存会快一点。

# 功能介绍

## 登录

##### 扫码登录

##### 手机号登录

##### 邮箱登录

##### 退出登录

## 个人信息

##### 获取用户收藏歌单、mv、歌曲、专辑、视频

##### 获取用户创建歌单

##### 获取用户关注列表

##### 获取用户粉丝列表

##### 获取用户听歌排行

##### 获取用户收藏歌手

## 搜索

##### 热门搜索

##### 搜索建议

##### 搜索详情 mv 歌手 视频 专辑 用户 歌单

##### 历史搜索

## 评论

##### 歌单评论

##### 歌曲评论

##### mv评论

##### 视频评论

##### 专辑评论

##### 发表评论

##### 回复评论

##### 点赞评论

##### 删除评论

## 播放

##### 歌曲播放 

##### 歌单播放

##### 视频播放

##### 专辑播放

##### mv播放

##### 单曲循环

##### 随机播放

##### 顺序播放

## 歌手

##### 热门歌手

##### 推荐歌手

##### 歌手详情

##### 歌手专辑

##### 歌手单曲

##### 歌手mv

## 详情

##### 歌曲详情

##### 歌单详情

##### mv详情

##### 专辑详情

##### 视频详情

## 收藏

##### 收藏单曲到歌单

##### 收藏歌单

##### 收藏专辑

##### 收藏mv

##### 取消收藏

## 用户

##### 查看用户关注列表

##### 查看用户粉丝列表

##### 查看用户收藏歌单

##### 查看用户创建歌单

##### 查看用户听歌排行

## 排行榜

##### 排行榜详情

##### 排行榜分类

## 歌单

##### 创建新歌单

##### 歌单分类查询

## 新碟

##### 新碟分类查询

## 电台

##### 电台分类查询

## mv

##### mv推荐

##### mv分类查询

# 注意事项

1 由于是真实的网易云数据，所以请谨慎进行删除操作。

2 邮箱登录，由于我没有邮箱账号所以没有测试过。

3 请不要频繁进行登录，退出登录，发布评论等操作，容易被网易云检测为风险账号，影响使用。

##### 





