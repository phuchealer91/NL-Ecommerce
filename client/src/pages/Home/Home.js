import React from 'react'
import CategoryList from '../../components/Category/CategoryList'
import { ListProduct, ListProductSeller } from '../../components/Home'
import Searchs from '../../components/LocalSearch/Searchs'
import SubCategoryList from '../../components/SubCategory/SubCategoryList'
import './Home.scss'
import Slider from './Slider'
Home.propTypes = {}

function Home(props) {
  return (
    <React.Fragment>
      <div>
        <Slider />
      </div>
      <div className="category">
        <h3 className="category__heading text-green-600">
          Thương hiệu nổi tiếng
        </h3>
        <div className="flex  justify-center">
          <CategoryList />
        </div>
      </div>
      <div className="sub-category">
        <h3 className="sub-category__heading text-green-600">Danh mục con</h3>
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
