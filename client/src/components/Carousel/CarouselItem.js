import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel } from 'antd'
import React from 'react'
import banner1 from '../../assets/images/banner1.png'
import banner2 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png'
import banner4 from '../../assets/images/banner4.jpg'
import banner5 from '../../assets/images/banner5.png'
import banner6 from '../../assets/images/banner6.png'
import banner7 from '../../assets/images/banner7.png'

function CarouselItem(props) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <RightOutlined
        className={className}
        style={{
          ...style,
          fontWeight: 'bold',
          color: 'white',
          zIndex: '10',
          right: '20px',
        }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <LeftOutlined
        className={className}
        style={{
          ...style,
          fontWeight: 'bold',
          color: 'white',
          zIndex: '10',
          left: '20px',
        }}
        onClick={onClick}
      />
    )
  }
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
        <Carousel
          autoplay
          {...settings}
          prevArrow={<SamplePrevArrow />}
          nextArrow={<SampleNextArrow />}
        >
          <div className="">
            <img
              src={banner1}
              alt={banner1}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner2}
              alt={banner2}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner3}
              alt={banner3}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner4}
              alt={banner4}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner5}
              alt={banner5}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner6}
              alt={banner6}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
          <div className="">
            <img
              src={banner7}
              alt={banner7}
              style={{ width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  )
}

export default CarouselItem
