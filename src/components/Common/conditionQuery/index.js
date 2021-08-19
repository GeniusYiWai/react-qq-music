import React, { memo, useState } from 'react'
import './index.less'
//混合查询条件组件
export default memo(function ConditionQuery(props) {
  //props
  // const Type = [ 分类条件数据
  //   {
  //     categoryName: '全部', //categoryName 条件名称
  //     type: '-1'
  //   },
  //   {
  //     categoryName: '男歌手',
  //     type: '1'
  //   },
  //   {
  //     categoryName: '女歌手',
  //     type: '2'
  //   },
  //   {
  //     categoryName: '乐队',
  //     type: '3'
  //   }
  // ]
  //condition 查询条件代表的参数
  //switchCondition 切换查询条件
  const { condition, Category, categoryName, switchCondition } = props
  const [currentCondition, setCondition] = useState(Category[0][condition])
  return (
    <div className='singer-cate-container'>
      <div className='singer-cate-content w-1200'>
        <div className='singer-cate-initial'>
          {Category.map((item, index) => {
            return (
              <span
                className={
                  item[condition] === currentCondition
                    ? 'singer-cate-select'
                    : ''
                }
                onClick={() => {
                  setCondition(item[condition])
                  switchCondition(condition, item[condition])
                }}
                key={index}
              >
                {item[categoryName]}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
})
