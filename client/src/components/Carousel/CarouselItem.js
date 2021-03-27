import { Carousel } from 'antd'
import React from 'react'
import slider2 from '../../assets/images/Slider2.png'
import slider3 from '../../assets/images/Slider3.jpg'
import slider4 from '../../assets/images/Slider4.jpg'
import slider5 from '../../assets/images/Slider5.jpg'
import slider6 from '../../assets/images/Slider6.jpg'
import slider7 from '../../assets/images/Slider7.jpg'

function CarouselItem(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  }
  return (
    <React.Fragment>
      <div>
        <Carousel autoplay arrows={false} {...settings}>
          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage:
                  'url(https://github.com/dtrongphuc/home-e-commerce/blob/main/assests/images/home1_01_9e9ee306-65ab-4e2e-9a19-c54fa8039f8a_x1024.png?raw=true)',
              }}
            ></div>
            <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider2})`,
              }}
            ></div>
            <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider3})`,
              }}
            ></div>
            {/* <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div> */}
          </div>
          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider4})`,
              }}
            ></div>
            {/* <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div> */}
          </div>
          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider5})`,
              }}
            ></div>
            {/* <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div> */}
          </div>
          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider6})`,
              }}
            ></div>
            {/* <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div> */}
          </div>
          <div className="main__slide-item relative">
            <div
              className="slider-full"
              style={{
                backgroundImage: `url(${slider7})`,
              }}
            ></div>
            {/* <div className="slider-item__content">
              <p className="text-5xl text-blue-500 mb-3 text-center">Wobook</p>
              <p className="text-6xl text-black capitalize text-center font-semibold mb-8">
                Sách <br /> là bạn
              </p>
              <p className="text-gray-600 text-md text-center mb-6">
                Nơi bán sách online uy tín, chất lượng nhất Việt Nam
              </p>
              <button className="btn btn-primary uppercase mx-auto">
                Mua Ngay
              </button>
            </div> */}
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  )
}

export default CarouselItem
