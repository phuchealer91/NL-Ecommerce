import React from 'react'
import CategoryList from '../../components/Category/CategoryList'
import { ListProduct, ListProductSeller } from '../../components/Home'
import SubCategoryList from '../../components/SubCategory/SubCategoryList'
import './Home.scss'
Home.propTypes = {}

function Home(props) {
  return (
    <React.Fragment>
      <div className="intro">
        <h3 className="intro__heading">Welcome to F8 Shop</h3>
      </div>
      <div className="category">
        <h3 className="category__heading">Danh mục</h3>
        <CategoryList />
      </div>
      <div className="sub-category">
        <h3 className="sub-category__heading">Danh mục con</h3>
        <SubCategoryList />
      </div>
      <div className="products">
        <ListProduct />
        <ListProductSeller />
      </div>
    </React.Fragment>
  )
}

export default Home
