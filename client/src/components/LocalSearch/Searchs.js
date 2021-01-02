import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { searchQuery } from '../../redux/actions/search'
function Searchs(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { text } = useSelector((state) => state.search)
  function handleChange(e) {
    dispatch(searchQuery({ text: e.target.value }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    history.push(`/shop?${text}`)
  }
  return (
    <React.Fragment>
      <div className="flex items-center content-center">
        <Input
          type="search"
          placeholder="Search"
          onChange={handleChange}
          value={text}
        />
        ,
        <SearchOutlined
          onClick={handleSubmit}
          className="font-semibold text-xl"
        />
      </div>
    </React.Fragment>
  )
}
Searchs.propTypes = {}
export default Searchs
