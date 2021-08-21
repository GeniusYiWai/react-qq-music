import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { Input, message } from 'antd'
import {
  getHotKeywords as getHotKeywordsAPI,
  getSearchSuggest as getSearchSuggestAPI
} from '@/api/search'
import HotKeywordsList from './cpn/hotKeywordsList'
import SearchSuggestion from './cpn/searchSuggestion'
import HistorySearch from './cpn/historySearch'
import { setItem, getItem, isExist } from '@/utils/storage'
import { useHistory } from 'react-router-dom'
import './index.less'
const { Search } = Input
//搜索组件
export default memo(function SearchInput() {
  //history
  const historyHook = useHistory()
  //ref
  const searchBoxRef = useRef()
  //state
  //用户输入的搜索关键字
  const [keyword, setKeyword] = useState()
  //热搜列表数据
  const [hotKeywords, setHotKeywords] = useState([])
  //控制是否显示热搜列表
  const [showHotKey, setShowHotKey] = useState(false)
  //控制是否显示联想建议数据
  const [showsearchSuggestion, setShowSearchSuggestion] = useState(false)
  //联想建议数据
  const [searchSuggestion, setSearchSuggestion] = useState({})
  //历史搜索数据
  const [history, setHistory] = useState(getItem('historySearch') || [])

  //鼠标聚焦 显示热搜列表
  const handleFocus = value => {
    //判断用户是否已经输入搜索关键字 如果没有输入 则鼠标点击搜索框 展示热门搜索 否则 隐藏热门搜索
    if (value.trim() !== '') {
      //展示搜索联想建议
      setShowSearchSuggestion(true)
    } else {
      //展示热门搜索
      setShowHotKey(true)
      //隐藏搜索联想建议
      setShowSearchSuggestion(false)
    }
  }
  //隐藏热门搜索和搜索联想
  const hideAll = useCallback(() => {
    setShowHotKey(false)
    setShowSearchSuggestion(false)
  }, [])
  //用户输入 隐藏热搜列表 显示搜索联想建议
  const handleChange = value => {
    //判断用户输入是否为空
    if (value.trim() === '') {
      setShowHotKey(true)
      setShowSearchSuggestion(false)
    } else {
      setKeyword(value)
      //发送请求 获取联想建议
      getSuggestion(value)
    }
  }
  //获取搜索联想建议
  const getSearchSuggest = async value => {
    try {
      const {
        data: { result, code }
      } = await getSearchSuggestAPI(value)
      if (code === 200) {
        //赋值搜索联想数据
        setSearchSuggestion(result)
        //隐藏热门搜索
        setShowHotKey(false)
        //展示搜索联想
        setShowSearchSuggestion(true)
      }
    } catch (error) {
      message.error('获取搜索联想建议失败!')
    }
  }

  //用户按下enter键 将关键字存入缓存 跳转到搜索页面
  const handlePress = e => {
    const {
      charCode,
      target: { value }
    } = e
    //判断按下的是不是enter
    if (charCode === 13) {
      setHistorySearch(value)
      //隐藏全部
      hideAll()
      //跳转到搜索页面
      goToSearch(value)
    }
  }
  //获取历史搜索
  const setHistorySearch = useCallback(value => {
    //从缓存中获取搜索历史
    const historySearch = getItem('historySearch') || []
    //判断是否为空
    if (value && value.trim() !== '') {
      //判断关键字是否已经存在搜索历史
      const flag = isExist(value)
      //没有 存入缓存
      if (!flag) {
        historySearch.unshift(value)
        //历史数据大于5条 删除最后一条
        if (historySearch.length > 5) {
          historySearch.pop()
        }
        //存入缓存
        setItem('historySearch', historySearch)
        setHistory(historySearch)
      }
    }
  }, [])
  //获取搜索联想建议
  const getSuggestion = value => {
    //调用获取搜索联想建议的接口
    getSearchSuggest(value)
  }
  //获取热门搜索
  const getHotKeywords = async () => {
    try {
      const {
        data: { data, code }
      } = await getHotKeywordsAPI()
      if (code === 200) {
        setHotKeywords(data.slice(0, 5))
      }
    } catch (error) {
      message.error('获取热门搜索失败!')
    }
  }
  //跳转到搜索页面 携带点击的关键字 默认展示歌曲页面
  const goToSearch = (value, t = 'songs') => {
    historyHook.push(`/musichall/search?k=${value}&t=${t}`)
  }
  useEffect(() => {
    //获取热门搜索关键字
    getHotKeywords()
    //点击window 隐藏全部
    window.addEventListener('click', hideAll)
    return () => {
      window.removeEventListener('click', hideAll)
    }
  }, [])
  return (
    <div className='search-container' ref={searchBoxRef}>
      <Search
        placeholder='请输入关键字'
        allowClear
        onFocus={e => {
          handleFocus(e.target.value)
        }}
        //阻止事件冒泡
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={e => {
          handleChange(e.target.value)
        }}
        onKeyPress={e => {
          handlePress(e)
        }}
      />
      {showHotKey ? (
        <>
          <HotKeywordsList
            hotKeywords={hotKeywords}
            hideAll={hideAll}
            setHistorySearch={setHistorySearch}
            goToSearch={goToSearch}
          />
          <HistorySearch
            history={history}
            setHistory={setHistory}
            setHistorySearch={setHistorySearch}
            goToSearch={goToSearch}
            hideAll={hideAll}
          />
        </>
      ) : null}
      {showsearchSuggestion ? (
        <SearchSuggestion
          searchSuggestion={searchSuggestion}
          keyword={keyword}
          goToSearch={goToSearch}
          setHistorySearch={setHistorySearch}
          hideAll={hideAll}
        />
      ) : null}
    </div>
  )
})
