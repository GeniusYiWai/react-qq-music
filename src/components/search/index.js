import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { Input } from 'antd'
import { getHotKeywords, getSearchSuggest } from '@/api/search'
import HotKeywordsList from './cpn/hotKeywordsList'
import SearchSuggestion from './cpn/searchSuggestion'
import HistorySearch from './cpn/historySearch'
import { setItem, getItem, isExist } from '@/utils/storage'
import { debounce } from '@/utils/tools'
import { useHistory } from 'react-router-dom'
import './index.less'
const { Search } = Input
export default memo(function SearchInput() {
  const historyHook = useHistory()
  const searchBoxRef = useRef()
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
  const handleFocus = useCallback(value => {
    //判断用户是否已经输入搜索关键字 如果没有输入 则鼠标点击搜索框 展示热门搜索 否则 隐藏热门搜索
    if (value.trim() !== '') {
      //展示热门搜索
      setShowSearchSuggestion(true)
    } else {
      //记录搜索关键字
      setShowHotKey(true)
      //隐藏热门搜索
      setShowSearchSuggestion(false)
    }
  }, [])
  //隐藏热门搜索和搜索联想
  const hideAll = useCallback(() => {
    setTimeout(() => {
      setShowHotKey(false)
      setShowSearchSuggestion(false)
    }, 600)
  }, [])
  //用户输入 隐藏热搜列表 显示搜索联想建议
  const handleChange = useCallback(value => {
    //判断用户输入是否为空
    if (value.trim() === '') {
      //这里用一个定时器进行隐藏热门搜索
      //因为有1个bug 当用户快速删除输入的关键字时，请求搜索联想建议的接口做了防抖处理，会延时展示联想建议
      //而隐藏联想建议是同步的 所以会导致先展示热门搜索 又重新展示联想建议
      //所以使用定时器进行清除 当联想建议展示后，过500ms后进行隐藏
      setTimeout(() => {
        setShowHotKey(true)
        setShowSearchSuggestion(false)
      }, 500)
    } else {
      setKeyword(value)
      //发送请求 获取联想建议
      onFinish(value)
    }
  }, [])
  //每次render 都会导致debounce第一个参数（异步请求函数）更新，进而导致debounce的闭包失效
  // 解决办法
  // 通过useCallback保证传入debounce的第一个参数都是同一个函数
  const _onFinish = useCallback(value => {
    //调用获取搜索联想建议的接口
    getSearchSuggest(value).then(({ data: { result } }) => {
      //赋值搜索联想数据
      setSearchSuggestion(result)
      //隐藏热门搜索
      setShowHotKey(false)
      //展示搜索联想
      setShowSearchSuggestion(true)
    })
  }, [])

  const onFinish = useCallback(debounce(_onFinish, 200), [_onFinish])

  //用户按下enter键 将关键字存入缓存 跳转到搜索页面
  const handlePress = useCallback(e => {
    const {
      charCode,
      target: { value }
    } = e
    if (charCode === 13) {
      const historySearch = getItem('historySearch') || []
      if (value && value.trim() !== '') {
        const flag = isExist(value)
        if (!flag) {
          historySearch.unshift(value)
          if (historySearch.length > 5) {
            historySearch.pop()
          }
          setItem('historySearch', historySearch)
          setHistory(historySearch)
        }
        hideAll()
        historyHook.push(`/musichall/search?k=${value}&t=songs`)
      }
    }
  }, [])
  useEffect(() => {
    //获取热门搜索关键字
    getHotKeywords().then(({ data: { data } }) => {
      setHotKeywords(data.slice(0, 5))
    })
  }, [])
  return (
    <div className='search-container' ref={searchBoxRef}>
      <Search
        placeholder='请输入关键字'
        allowClear
        onFocus={e => {
          handleFocus(e.target.value)
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
          <HotKeywordsList hotKeywords={hotKeywords} />
          <HistorySearch history={history} setHistory={setHistory} />
        </>
      ) : null}
      {showsearchSuggestion ? (
        <SearchSuggestion
          searchSuggestion={searchSuggestion}
          keyword={keyword}
        />
      ) : null}
    </div>
  )
})
