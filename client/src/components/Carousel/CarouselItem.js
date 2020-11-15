import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
Carousel.propTypes = {}

const contentStyle = {
  height: 'calc(100vh - 48px)',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}
function CarouselItem(props) {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselItem
