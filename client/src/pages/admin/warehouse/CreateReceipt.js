import { Col, InputNumber, Modal, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ModalImage from 'react-modal-image'
import { getSupplier, getSuppliers } from '../../../apis/supplier'
import { ModalConfirm } from '../../../components/ModalConfirm'
import { AdminSideBar } from '../../../components/navigation/SideBar'
import imageDefault from '../../../assets/images/mac-default.png'
import { PlusCircleOutlined } from '@ant-design/icons'
import ViewProductCard from '../../../components/CardItem/ViewProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCart } from '../../../components/Empty'
import { formatPrice } from '../../../helpers/formatPrice'
import * as types from '../../../redux/constants/receipt'
import { userReceipts } from '../../../apis/cart'
const { Option } = Select
const CreateReceipt = () => {
  const [suppliers, setSuppliers] = useState([])
  const [products, setProducts] = useState([])
  const [receipts, setReceipts] = useState([])
  const [inQuatity, setQuatity] = useState('')
  const [inPrice, setInPrice] = useState('')
  const [idSupplier, setIdSupplier] = useState('')
  const [pricePayment, setPricePayment] = useState('')
  const { receipt } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    loadSuppliers()
  }, [])
  useEffect(() => {
    setReceipts(receipt.receiptLists)
  }, [receipt.receiptLists])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const loadSuppliers = () => {
    getSuppliers()
      .then((res) => {
        if (res.data) {
          setSuppliers(res.data.suppliers)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function onHandleChange(value) {
    setIdSupplier(value)
    getSupplier({ _id: value })
      .then((res) => {
        if (res.data) {
          setProducts(res.data.products)
          setReceipts([])
          dispatch({
            type: types.ADD_TO_RECEIPT,
            payload: { unique: [] },
          })
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function onHandleTotal() {
    let msgTotal = receipts.reduce(function (prev, cur) {
      return prev + cur.inQuatity * cur.inPrice
    }, 0)
    return msgTotal
  }

  function onHandleCreateReceipt() {
    let newReceipt = {
      receipts,
      receiptTotal: onHandleTotal(),
      supplier: idSupplier,
      receiptPayment: pricePayment,
      statusReceipt: false,
    }
    userReceipts({ newReceipt })
      .then((res) => {
        if (res.data.newReceipts) {
          history.push('/admin/list-warehouse')
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="w-full px-4 py-4">
            <div className="text-base font-semibold">
              Thêm mới đơn nhập hàng
            </div>
            <div className="py-4">
              <form>
                <div>
                  <div>Nhà cung cấp *</div>
                  <Select
                    defaultValue="lucy"
                    style={{ width: '300px' }}
                    onChange={onHandleChange}
                  >
                    {suppliers &&
                      suppliers.map((supplier) => (
                        <Option value={supplier._id}>{supplier.name}</Option>
                      ))}
                  </Select>
                  <div>Chọn sản phẩm cần nhập hàng: </div>
                  <div
                    onClick={showModal}
                    className="px-3 py-1 bg-blue-600 inline-block"
                  >
                    <PlusCircleOutlined size={48} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <Modal
                      title="Các sản phẩm từ nhà cung cấp"
                      visible={isModalVisible}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <div className="w-full pt-8 bg-white rounded">
                        {products &&
                          products.map((item) => (
                            <ViewProductCard product={item} />
                          ))}
                      </div>
                    </Modal>
                  </div>
                </div>
              </form>
            </div>
            <div className="py-4">
              <div className="w-full pt-8 bg-white rounded">
                {!receipts.length ? (
                  <div className="shopping__wrap">
                    <EmptyCart />
                  </div>
                ) : (
                  receipts &&
                  receipts.map((item) => (
                    <>
                      <div className="hidden md:block">
                        <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
                          <div className="w-1/2 lg:w-3/5 xl:w-3/5 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
                            <div className="w-20 mx-0 relative pr-0 mr-3 ">
                              <div className="h-20 rounded flex items-center justify-center">
                                <div className="aspect-w-1 aspect-h-1 w-full">
                                  <ModalImage
                                    small={
                                      item ? item.images[0]?.url : imageDefault
                                    }
                                    large={
                                      item ? item.images[0]?.url : imageDefault
                                    }
                                    alt={`${
                                      item ? item.images[0]?.url : imageDefault
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                              <Link
                                to={`/product/${item.slug}`}
                                className="font-hk text-secondary text-base"
                              >
                                {item.title}
                              </Link>
                              <span className="pt-1 text-gray-700 font-semibold ">
                                {formatPrice(item.price)}đ
                              </span>
                              <span
                                className="pt-1 text-blue-600 cursor-pointer hover:underline"
                                // onClick={() => onHandleDelete(item?._id)}
                              >
                                Xóa
                              </span>
                            </div>
                          </div>

                          <div className=" text-right pr-10 xl:pr-10 pb-4 flex items-center justify-center">
                            <div className="custom-number-input h-10 w-32">
                              <span>Số lượng nhập *</span>
                              <InputNumber
                                size="middle"
                                min={1}
                                defaultValue={1}
                                className="opacity-100"
                                onChange={(count) => {
                                  let warehouse = []
                                  if (
                                    receipt &&
                                    receipt.receiptLists.length > 0
                                  ) {
                                    warehouse = [
                                      ...warehouse,
                                      ...receipt.receiptLists,
                                    ]
                                  }
                                  warehouse.map((pro, i) => {
                                    if (pro._id === item._id) {
                                      return (warehouse[i].inQuatity = count)
                                    }
                                  })
                                  dispatch({
                                    type: types.ADD_TO_RECEIPT,
                                    payload: { unique: warehouse },
                                  })
                                  setQuatity(count)
                                }}
                              />
                            </div>
                            <div className="custom-number-input h-10 w-32">
                              <span>Giá nhập *</span>
                              <InputNumber
                                size="middle"
                                min={0}
                                defaultValue={0}
                                className="opacity-100"
                                onChange={(price) => {
                                  let warehouse = []
                                  if (
                                    receipt &&
                                    receipt.receiptLists.length > 0
                                  ) {
                                    warehouse = [
                                      ...warehouse,
                                      ...receipt.receiptLists,
                                    ]
                                  }
                                  warehouse.map((pro, i) => {
                                    if (pro._id === item._id) {
                                      return (warehouse[i].inPrice = price)
                                    }
                                  })
                                  dispatch({
                                    type: types.ADD_TO_RECEIPT,
                                    payload: { unique: warehouse },
                                  })
                                  setInPrice(price)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )}
                <div className="py-4 px-3">
                  <div className=" text-blue-700 text-base font-semibold">
                    <span className="text-xs text-gray-500">Thành tiền:</span>{' '}
                    <input
                      type="text"
                      className="px-4 py-2"
                      disabled
                      value={formatPrice(onHandleTotal()) + 'đ'}
                    />
                  </div>
                  <div className=" text-blue-700 text-base font-semibold flex items-center">
                    <span className="text-xs text-gray-500">
                      Số tiền đã thanh toán:{' '}
                    </span>{' '}
                    <div className="custom-number-input h-10 w-32">
                      <InputNumber
                        size="middle"
                        min={1}
                        defaultValue={1}
                        className="opacity-100"
                        onChange={(price) => {
                          setPricePayment(price)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-4 px-4">
                  <button
                    type="button"
                    onClick={onHandleCreateReceipt}
                    className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5 mt-2"
                  >
                    Tạo phiếu nhập hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateReceipt.propTypes = {}

export default CreateReceipt
