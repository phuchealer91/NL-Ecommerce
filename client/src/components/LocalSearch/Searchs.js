import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
        <input
          type="search"
          placeholder="Search"
          onChange={handleChange}
          value={text}
          className="border-0 outline-none focus:border-0 focus:outline-none text-gray-800"
        />
        ,
        <SearchOutlined
          onClick={handleSubmit}
          className="font-semibold text-2xl"
        />
      </div>
    </React.Fragment>
  )
}
Searchs.propTypes = {}
export default Searchs
