import { Input } from 'antd'
import React from 'react'

const SearchItem = ({ keyword, setKeyword }) => {
  // Search
  function onHandleChangeSearch(e) {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return (
    <div className="form-input">
      <Input
        type="search"
        placeholder="Tìm kiếm"
        name="key"
        value={keyword}
        onChange={onHandleChangeSearch}
      />
    </div>
  )
}

SearchItem.propTypes = {}

export default SearchItem
