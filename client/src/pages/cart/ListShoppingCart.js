import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Select, Table } from 'antd'
import React, { useState } from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import imageDefault from '../../assets/images/default-image.jpg'
import { ModalConfirm } from '../../components/ModalConfirm'
import { addToCart } from '../../redux/actions/cart'
const { Option } = Select
const ListShoppingCart = () => {
  const [form] = Form.useForm()
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const { cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart
  const [ItemX, setItemX] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [idDelete, setIdDelete] = useState('')
  const dispatch = useDispatch()
  function onChangeColor(color) {
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === ItemX.Id) {
          cart[i].color = color
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    }
  }
  function onChangeCount(e) {
    let count = e.target.value
    let countX = count < 1 ? 1 : count
    if (count > ItemX.Quantity) {
      toast.warning(`Sản phẩm chỉ còn: ${ItemX.Quantity} `)
      return
    }
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === ItemX.Id) {
          cart[i].count = countX
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    }
  }
  function onHandleClick(item) {
    setItemX(item)
  }
  function onHandleDeleteItem() {
    setShowModal(false)
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === idDelete) {
          cart.splice(i, 1)
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    }
  }
  function onFocus() {}
  function onBlur() {}
  function onSearch() {}
  function onHandleDelete(id) {
    setShowModal(true)
    setIdDelete(id)
  }

  function closeModal() {
    setShowModal(false)
  }
  const dataSource =
    cartLists &&
    cartLists.map((item) => ({
      Id: item._id,
      Title: item.title,
      Image: item.images[0] ? item.images[0].url : imageDefault,
      Brand: item.brand,
      Color: item.color,
      Price: item.price,
      Count: item.count,
      Quantity: item.quantity,
      Shipping: item.shipping,
    }))
  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'image',
      render: (image) => (
        <ModalImage small={image} large={image} alt={`${image}`} />
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      key: 'brand',
    },
    {
      title: 'Color',
      dataIndex: 'Color',
      key: 'color',
      render: (colorx, record) => (
        <Select
          style={{ width: 105 }}
          placeholder="Select a color"
          onChange={onChangeColor}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={colorx}
          onClick={(e) => onHandleClick(record, e)}
        >
          {colors.map((c, i) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'price',
    },
    {
      title: 'Count',
      dataIndex: 'Count',
      key: 'count',
      render: (count, record) => (
        <Input
          style={{ width: 80 }}
          type="number"
          onChange={onChangeCount}
          onClick={(e) => onHandleClick(record, e)}
          min="1"
          defaultValue={count}
        />
      ),
    },
    {
      title: 'Shipping',
      dataIndex: 'Shipping',
      key: 'shipping',
      render: (shipping) =>
        shipping === 'Yes' ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        ),
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',

      render: (text, record) => (
        <>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              onHandleDelete(record.Id, e)
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ]
  return (
    <div className="shopping__list-item">
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="sản phẩm"
        // categoryToDelete={categoryToDelete}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="Title"
        tableLayout="fixed"
      />
    </div>
  )
}

ListShoppingCart.propTypes = {}

export default ListShoppingCart
