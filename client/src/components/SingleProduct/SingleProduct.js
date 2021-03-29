import React, { useCallback, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  ConsoleSqlOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Card, Col, Divider, Form, Input, Rate, Row, Tabs, Tooltip } from 'antd'
import { format } from 'date-fns'
import _ from 'lodash'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { animated, config, useSpring, useTransition } from 'react-spring/three'
import { Canvas, useThree } from 'react-three-fiber'
import { useDrag } from 'react-use-gesture'
import { Math as ThreeMath, TextureLoader, UniformsUtils } from 'three'
import emptyComment from '../../assets/images/empty-comment.png'
import { addToCart } from '../../redux/actions/cart'
import { showDrawer } from '../../redux/actions/ui'
import ModalRating from '../ModalConfirm/ModalRating'
import ProductListItem from '../ProductListItem/index'
import ShowRatings from '../Ratings/ShowRatings'
// import HoverImageShader from '../shaders/HoverImageShader'
// import './SingleProduct.scss'
const image =
  'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
const image2 =
  'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const { TabPane } = Tabs
const { degToRad } = ThreeMath
var HoverImageShader = {
  vertexShader: `
    varying vec2 vUv; 

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float; 

    uniform sampler2D texture;
    uniform float imageAspectRatio;
    uniform float aspectRatio;
    uniform float opacity;
    uniform float hover;
    varying vec2 vUv;

    float exponentialInOut(float t) {
      return t == 0.0 || t == 1.0 
        ? t 
        : t < 0.5
          ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
          : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
    } 

    void main() {
      vec2 uv = vUv;

      // fix aspectRatio
      float u = imageAspectRatio/aspectRatio;
      if(imageAspectRatio > aspectRatio) {
        u = 1. / u;
      }

      uv.y *= u;
      uv.y -= (u)/2.-.5;

      // hover effect
      float zoomLevel = .2;
      float hoverLevel = exponentialInOut(min(1., (distance(vec2(.5), uv) * hover) + hover));
      uv *= 1. - zoomLevel * hoverLevel;
      uv += zoomLevel / 2. * hoverLevel;
      uv = clamp(uv, 0., 1.);
      vec4 color = texture2D(texture, uv);
      if(hoverLevel > 0.) {
        hoverLevel = 1.-abs(hoverLevel-.5)*2.;
        //Pixel displace
        uv.y += color.r * hoverLevel * .05;
        color = texture2D(texture, uv);
        // RGBshift
        color.r = texture2D(texture, uv+(hoverLevel)*0.01).r;
        color.g = texture2D(texture, uv-(hoverLevel)*0.01).g;
      }

      gl_FragColor = mix(vec4(1.,1.,1.,opacity), color, opacity);
    }
  `,
  uniforms: {
    texture: {
      type: 't',
      value: '',
    },
    imageAspectRatio: {
      type: 'f',
      value: 1.0,
    },
    aspectRatio: {
      type: 'f',
      value: 1.0,
    },
    opacity: {
      type: 'f',
      value: 1.0,
    },
    hover: {
      type: 'f',
      value: 0.0,
    },
  },
}
// Texture
function Texture({ texture, hoverValue, opacity, onHover, ...props }) {
  return (
    <animated.mesh
      onPointerMove={(e) => onHover(true)}
      onPointerOver={(e) => onHover(true)}
      onPointerOut={(e) => onHover(false)}
      {...props}
    >
      <planeBufferGeometry attach="geometry" args={[5, 7]} />
      <animated.shaderMaterial
        attach="material"
        transparent
        args={[
          {
            ...HoverImageShader,
            uniforms: UniformsUtils.clone(HoverImageShader.uniforms),
          },
        ]}
        uniforms-texture-value={texture}
        uniforms-hover-value={hoverValue}
        uniforms-opacity-value={opacity}
      />
    </animated.mesh>
  )
}
// Image component
function Image({ url, backUrl, rotation, ...props }) {
  const [hovered, setHover] = useState(false)
  const loader = new THREE.TextureLoader()
  const { invalidate } = useThree()
  const textures = useMemo(() => {
    return [
      { id: 'front', texture: loader.load(url, invalidate), deg: 0 },
      { id: 'back', texture: loader.load(backUrl, invalidate), deg: 180 },
    ]
  }, [url, backUrl, invalidate])

  console.log('texturestexturestexturestextures', textures)
  const { hoverValue } = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: config.molasses,
  })

  const transitions = useTransition(textures, (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  })
  console.log('texturestexturestexturestextures', transitions)

  return transitions.map(({ item, props, key }) => (
    <Texture
      key={key}
      {...props}
      texture={item?.texture}
      hoverValue={hoverValue}
      onHover={setHover}
      rotation={rotation.interpolate((x, y, z) => [
        degToRad(x),
        degToRad(y + item?.deg),
        degToRad(z),
      ])}
      opacity={props.opacity}
    />
  ))
}
function SingleProduct({ productEditing }) {
  const dispatch = useDispatch()
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dragDelta = useRef(0)

  const { title, quantity, images, description } = productEditing
    ? productEditing
    : ''
  console.log('hello images', images)
  function handleAddToCart() {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
    }
    // push new product
    cart.push({
      ...productEditing,
      count: 1,
    })
    // remove duplicates
    let unique = _.uniqBy(cart, (c) => c._id)
    // let unique = _.uniqWith(cart, _.isEqual)
    // save localstorage
    localStorage.setItem('cart', JSON.stringify(unique))
    dispatch(addToCart(unique))
    dispatch(showDrawer())
  }
  function handleAddToWishlist() {}

  const [props, set] = useSpring(() => ({
    pos: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }))

  const [{ rotation }, setRotation] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  }))

  const onHandleClick = useCallback(
    (e) => {
      // filter clicks from dragging
      if (dragDelta.current < 100) {
        const [x, y, z] = rotation.getValue()

        setRotation({
          rotation: [x, y + 180, z],
          config: config.default,
        })
      }
    },
    [rotation, setRotation]
  )
  const bind = useDrag(
    ({
      first,
      last,
      time,
      down,
      delta,
      velocity,
      direction,
      memo = rotation.getValue(),
    }) => {
      if (first) {
        dragDelta.current = time
      }

      if (last) {
        dragDelta.current = time - dragDelta.current
      }

      const x = memo[0] + (delta[1] / window.innerWidth) * 180
      const y = memo[1] + (delta[0] / window.innerHeight) * 180
      const vxyz = [
        direction[1] * (velocity / 1),
        direction[0] * (velocity / 1),
        0,
      ]

      setRotation({
        rotation: [x, y, 0],
        immediate: down,
        config: { velocity: vxyz, decay: true },
      })

      return memo
    }
  )
  return (
    <>
      <Row gutter={[2, 12]}>
        <Col xs={24} sm={24} md={24} lg={14}>
          {images && images.length && isOpen ? (
            <Lightbox
              mainSrc={images[photoIndex].url}
              nextSrc={images[(photoIndex + 1) % images.length].url}
              prevSrc={
                images[(photoIndex + images.length - 1) % images.length].url
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + images.length - 1) % images.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % images.length)
              }
            />
          ) : (
            ''
          )}
          <button type="button" onClick={() => setIsOpen(true)}>
            Xem chi tiết
          </button>
          {/* {images &&
                images.map((i) => (
                  <img src={i.url} key={i.public_id} alt={i.public_id} />
                ))}
          ) : (
            <Card
              cover={
                <img
                  src={imageDefault}
                  className="mb-3 card-image"
                  alt={imageDefault}
                />
              }
            ></Card>
          )} */}
          {
            <div
              className="main"
              {...bind()}
              onMouseMove={({ clientX, clientY }) => {
                const x = (clientX / window.innerWidth) * 2 - 1
                const y = -(clientY / window.innerHeight) * 2 + 1

                set({
                  pos: [x, 0, 0],
                  scale: [1 - y * 0.1, 1 - y * 0.1, 1],
                })
              }}
            >
              <Canvas
                pixelRatio={window.devicePixelRatio || 1}
                style={{ background: 'transparent', height: '450px' }}
                camera={{ fov: 75, position: [0, 0, 7] }}
              >
                <Image
                  url={images && images[0]?.url}
                  backUrl={images && images[1]?.url}
                  {...props}
                  onClick={onHandleClick}
                  rotation={rotation}
                />
              </Canvas>
            </div>
          }

          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description && description}
            </TabPane>
            <TabPane tab="More" key="2">
              Call use on xxxx xxx xxx to learn more about this product.
            </TabPane>
          </Tabs>
        </Col>
        <Col xs={24} sm={24} md={24} lg={10}>
          <h2 className="text-2xl font-semibold text-green-600">
            {title?.toUpperCase()}
          </h2>
          <div className="py-3 text-center">
            {productEditing &&
            productEditing.reviews &&
            productEditing.reviews.length > 0 ? (
              ShowRatings(productEditing)
            ) : (
              <div className="single__rating">No rating yet</div>
            )}
          </div>
          <Card
            actions={[
              <Tooltip placement="top" title="kk">
                <Link onClick={handleAddToCart} disabled={quantity < 1} to="# ">
                  <ShoppingCartOutlined className="text-danger" />
                  <br />
                  {quantity < 1 ? 'Out of Stock' : 'Add To Cart'}
                </Link>
              </Tooltip>,
              <Link onClick={handleAddToWishlist} to="# ">
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </Link>,

              <ModalRating productId={productEditing?._id}>
                {/* <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"
                /> */}
                <Form.Item
                  name="rating"
                  rules={[{ required: true, message: 'Please choose rating!' }]}
                >
                  <Rate size className="pb-2" />
                </Form.Item>
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: 'Please input your comment!' },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </ModalRating>,
            ]}
          >
            <ProductListItem productEditing={productEditing} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <h3 className="my-3 text-2xl font-semibold">
            Rating and reviews (
            <span className="text-red-600">
              {productEditing?.reviews.length}
            </span>
            )
          </h3>
          <Divider dashed />
          {productEditing && productEditing?.reviews.length > 0 ? (
            productEditing.reviews.map((rating, idx) => {
              return (
                <div className="pb-2" key={idx}>
                  <div className="flex items-end">
                    <div className="flex items-center content-center">
                      <div className="py-1 px-2 bg-gray-300 rounded-sm font-semibold">
                        {rating.name.slice(0, 1).toUpperCase()}
                      </div>
                      <h3 className="text-xl font-semibold mx-2">
                        {rating.name}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {format(
                        new Date(productEditing?.updatedAt),
                        'dd/MM/yyyy'
                      )}
                    </p>
                  </div>
                  <Rate value={rating.rating} disabled />
                  <p className="text-lg">{rating.comment}</p>
                  <Divider dashed />
                </div>
              )
            })
          ) : (
            <img
              src={emptyComment}
              style={{ width: '120px', color: 'gray' }}
              alt="hello"
            />
          )}
        </Col>
      </Row>
    </>
  )
}
SingleProduct.propTypes = {}

export default SingleProduct
