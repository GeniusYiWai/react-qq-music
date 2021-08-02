import React, { memo, useEffect, useState, useCallback } from 'react'
import { Input } from 'antd'
import { getHotKeywords, getSearchSuggest } from '@/api/search'
import HotKeywordsList from './cpn/hotKeywordsList'
import SearchSuggestion from './cpn/search-suggestion'
import HistorySearch from './cpn/history-search'
import { debounce } from '@/utils/tools'
import './index.less'
const { Search } = Input
export default memo(function SearchInput() {
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
  //鼠标聚焦 显示热搜列表
  const handleFocus = value => {
    if (value.trim() !== '') {
      setShowSearchSuggestion(true)
    } else {
      setShowHotKey(true)
      setShowSearchSuggestion(false)
    }
  }
  const handleBlur = () => {
    setShowHotKey(false)
    setShowSearchSuggestion(false)
  }
  //用户输入 隐藏热搜列表 显示搜索联想建议
  const handleChange = value => {
    if (value.trim() === '') {
      setShowHotKey(true)
      setShowSearchSuggestion(false)
    } else {
      setKeyword(value)
      onFinish(value)
    }
  }
  //每次render 都会导致debounce第一个参数（异步请求函数）更新，进而导致debounce的闭包失效
  // 解决办法
  // 通过useCallback保证传入debounce的第一个参数都是同一个函数
  const _onFinish = useCallback(value => {
    getSearchSuggest(value).then(({ data: { result } }) => {
      setSearchSuggestion(result)
      setShowHotKey(false)
      setShowSearchSuggestion(true)
    })
  }, [])

  const onFinish = useCallback(debounce(_onFinish, 500), [_onFinish])

  useEffect(() => {
    //获取热门搜索关键字
    getHotKeywords().then(({ data: { data } }) => {
      console.log(data)
      setHotKeywords(data.slice(0, 5))
    })
  }, [])
  return (
    <div className='search-container'>
      <Search
        placeholder='搜索音乐、MV、歌单、用户'
        style={{ width: '260px' }}
        allowClear
        onFocus={e => {
          handleFocus(e.target.value)
        }}
        onBlur={() => {
          handleBlur()
        }}
        onChange={e => {
          handleChange(e.target.value)
        }}
      />
      {showHotKey ? (
        <>
          <HotKeywordsList hotKeywords={hotKeywords} />
          <HistorySearch />
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
