import React from 'react'
import CarouselItem from '../../components/Carousel/CarouselItem'
import CategoryList from '../../components/Category/CategoryList'
import Footer from '../../components/Footer/Footer'
import { ListProduct, ListProductSeller } from '../../components/Home'
import './Home.scss'
Home.propTypes = {}

function Home(props) {
  return (
    <React.Fragment>
      <div>
        <CarouselItem />
      </div>
      {/* <div>
        <Slider />
      </div> */}

      <section className="products mt-14">
        <h3 className="uppercase font-medium text-center text-blue-600 text-2xl">
          Các danh mục nổi bật
        </h3>
        <div className="mt-10">
          <CategoryList />
        </div>
      </section>
      {/* <div className="sub-category">
        <h3 className="sub-category__heading text-green-600">Danh mục con</h3>
        <SubCategoryList />
      </div> */}
      <section className="products mt-14">
        <h3 className="uppercase font-medium text-center text-blue-600 text-2xl">
          Các sản phẩm
        </h3>
        {/* <p className="uppercase font-medium text-center text-gray-800">
          top products of this week
        </p> */}
        <div className="container px-11 md:px-2 mx-auto mt-10">
          <ListProduct />
        </div>
      </section>
      <section className="products mt-10">
        <h3 className="uppercase font-medium text-center text-blue-600 text-2xl">
          Sản phẩm bán chạy
        </h3>
        <p className="uppercase font-medium text-center text-gray-800">
          Mua ngay nào
        </p>
        <div className="container px-11 md:px-2 mx-auto mt-10">
          <ListProductSeller />
        </div>
      </section>
      <div className="">
        <Footer />
        {/* <div className="bg-green-700">
          <p className="text-center py-4 text-white font-semibold">
            © 1997 - 2020 Công Ty Cổ Phần Thương Mại - Dịch Vụ MT
          </p>
        </div> */}
      </div>
    </React.Fragment>
  )
}

export default Home
