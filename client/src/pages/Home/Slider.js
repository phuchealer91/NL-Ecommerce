import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import slider5 from '../../assets/images/slider5.webp'
Slider.propTypes = {}

function Slider(props) {
  return (
    <React.Fragment>
      <Carousel autoplay style={{ margin: '0' }}>
        <div>
          <img src={slider1} alt="slider1" />
        </div>
        <div>
          <img src={slider2} alt="slider2" />
        </div>
        <div>
          <img src={slider3} alt="slider3" />
        </div>
        <div>
          <img src={slider4} alt="slider4" />
        </div>
        <div>
          <img src={slider5} alt="slider5" />
        </div>
      </Carousel>
    </React.Fragment>
  )
}

export default Slider
