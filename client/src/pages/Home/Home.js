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
      <div className="products">
        <section className=" mt-14">
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
        <section className=" mt-14">
          <h3 className="uppercase font-medium text-center text-blue-600 text-2xl">
            Các sản phẩm
          </h3>
          {/* <p className="uppercase font-medium text-center text-gray-800">
          top  of this week
        </p> */}
          <div className="container px-11 md:px-2 mx-auto mt-10">
            <ListProduct />
          </div>
        </section>
        <section className="my-5 bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
          <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_flashsale.png"
                style={{ width: '25px', height: '25px' }}
                alt="flash sale"
                className="mx-3"
              />
              <span className=" text-base text-gray-600 font-semibold">
                FLASH SALE
              </span>
            </div>
            <span className="mx-2 h-5 border-l-2 border-solid border-gray-600"></span>
            <div className="flex items-center">
              Kết thúc trong:
              <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
                04
              </div>
              <span className="font-semibold text-sm">:</span>
              <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
                04
              </div>
              <span className="font-semibold text-sm">:</span>
              <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
                04
              </div>
            </div>
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
          assumenda?
        </section>
        <section className=" mt-10">
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
      </div>
    </React.Fragment>
  )
}

export default Home
