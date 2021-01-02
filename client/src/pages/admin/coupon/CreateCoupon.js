import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Modal,
  message,
  Statistic,
  Divider,
  Input,
} from 'antd'

import { AdminSideBar } from '../../../components/navigation/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
} from '../../../redux/actions/coupon'
import { Link } from 'react-router-dom'
import LocalSearch from '../../../components/LocalSearch'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ModalConfirm } from '../../../components/ModalConfirm'
import FormCoupon from './FormCoupon'

const CreateCoupon = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [couponDelete, setCouponDelete] = useState(null)
  const [keyword, setKeyword] = useState('')

  const couponList = useSelector((state) => state.coupon.couponList)
  const totalCoupon = couponList.length
  useEffect(() => {
    dispatch(getCoupon())
  }, [])

  function onFinish(fieldsValue) {
    const values = {
      ...fieldsValue,
      expiry: fieldsValue['expiry'].format('YYYY-MM-DD HH:mm:ss'),
    }
    dispatch(createCoupon(values))
    form.resetFields()
  }
  function onHandleDelete(id) {
    setShowModal(true)
    setCouponDelete(id)
  }
  function onHandleDeleteItem() {
    dispatch(deleteCoupon(couponDelete))
    setShowModal(false)
  }
  function closeModal() {
    setShowModal(false)
  }
  // Search
  const searched = (keyword) => (coupon) =>
    coupon.name.toLowerCase().includes(keyword)
  const dataSource =
    couponList &&
    couponList.filter(searched(keyword)).map((item) => ({
      Id: item._id,
      Name: item.name,
      Discount: item.discount,
      Expiry: item.expiry,
    }))
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'Discount',
      key: 'discount',
    },
    {
      title: 'Expiry',
      dataIndex: 'Expiry',
      key: 'expiry',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: 'x',
      width: '200px',
      render: (text, record) => (
        <>
          {/* <Button type="primary" className="mr">
            <Link
              to={`/admin/coupon/${record.Slug}`}
              className="category__edit"
            >
              <span className="category__icon">
                <EditOutlined />
              </span>
              Sửa
            </Link>
          </Button> */}
          <Button
            type="primary"
            danger
            onClick={(e) => {
              onHandleDelete(record.Id, e)
            }}
            className="flex items-center"
          >
            <DeleteOutlined />
            <span> Xóa</span>
          </Button>
        </>
      ),
    },
  ]
  return (
    <React.Fragment>
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="Mã giảm giá"
        categoryToDelete={couponDelete}
      />
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="category">
            <h3 className="text-2xl mb-5"> Tạo mới mã giảm giá</h3>
            <Form form={form} onFinish={onFinish}>
              <div className="category__form">
                <FormCoupon />
              </div>
            </Form>
            <h3 className="text-2xl mb-3">Tất cả mã giảm giá({totalCoupon})</h3>
            <h5 className="text-xl">Search</h5>
            <div className="category__search">
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="Id"
              tableLayout="auto"
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

CreateCoupon.propTypes = {}

export default CreateCoupon
