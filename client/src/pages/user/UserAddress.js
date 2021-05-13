import { DeleteOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addAddresss, getAddresss, removeAddress } from '../../apis/cart'
import {
  getDistrictWards,
  getProvinceDistrict,
  getProvinces,
} from '../../apis/province'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { EmptyBox } from '../../helpers/icons'

function UserAddress(props) {
  const history = useHistory()
  const [province, setProvince] = useState('')
  // const [district, setDistrict] = useState('')
  const [provinceDistrict, setProvinceDistrict] = useState('')
  const [districtWard, setDistrictWard] = useState('')
  const [valuesx, setValuesx] = useState([])
  const [valuess, setValuess] = useState([])
  const [valuesss, setValuesss] = useState([])
  const [listAddress, setListAddress] = useState([])
  const [addressId, setAddressId] = useState('')
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    getProvincess()
    loadUserAddress()
  }, [])

  function getProvincess() {
    getProvinces({})
      .then((res) => {
        setValuesx(res.data.provinces)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function getProvinceDistrictss(idProvince) {
    getProvinceDistrict(idProvince)
      .then((res) => {
        setValuess(res.data.districts)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function getDistrictWardss(idDistrict) {
    getDistrictWards(idDistrict)
      .then((res) => {
        setValuesss(res.data.wards)
      })
      .catch((err) => console.log('Error anh em', err))
  }
  function handleChanges(e) {
    setDistrictWard('')
    setProvinceDistrict('')
    const idProvince = e.target.value
    setProvince(idProvince)
    getProvinceDistrictss(idProvince)
  }
  function handleChangeProvinceDistrict(e) {
    const idDistrict = e.target.value
    setProvinceDistrict(idDistrict)
    if (province) {
      setDistrictWard('')
    }
    getDistrictWardss(idDistrict)
  }
  function handleChangeDistrictWard(e) {
    setDistrictWard(e.target.value)
  }
  function loadUserAddress() {
    getAddresss()
      .then((res) => {
        setListAddress(res.data.listUserAddress.address)
      })
      .catch((error) => {
        toast.error('Lỗi lấy địa chỉ', error)
      })
  }
  function onHandleDelete(addressId) {
    setAddressId(addressId)
    setVisible(true)
  }
  function onHandleDeleted() {
    removeAddress(addressId)
      .then((res) => {
        toast.success('Xóa địa chỉ thành công')
        setVisible(false)
        loadUserAddress()
      })
      .catch((error) => {
        setVisible(false)
        toast.error('Xóa địa chỉ thất bại')
      })
  }
  return (
    <React.Fragment>
      <Modal
        title="Xóa địa chỉ giao hàng"
        visible={visible}
        onOk={onHandleDeleted}
        onCancel={() => setVisible(false)}
        okText="Chấp nhận"
        cancelText="Hủy"
      >
        <p>
          Khi bạn xóa địa chỉ giao hàng hiện tại, bạn sẽ{' '}
          <span className="text-red-600">không thể</span> khôi phục nó.
        </p>
      </Modal>
      <UserLayouts>
        <div className="w-full mx-auto bg-white rounded">
          <div className="px-3 pt-3 pb-8">
            <SectionTitle>
              Danh sách địa chỉ giao hàng ({listAddress.length})
            </SectionTitle>
            {listAddress.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto grid-flow-row gap-2 mt-6 mb-4">
                {listAddress.map((addr, idx) => {
                  return (
                    <>
                      <div key={addr._id} className=" bg-gray-50 border ">
                        <div className="px-3 py-3">
                          <div className="text-base text-gray-600 font-semibold flex items-center justify-between">
                            <span>{addr.name}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-xs text-gray-600 font-semibold">
                              Địa chỉ:{' '}
                            </span>
                            {addr.fullAddress} - {addr.mainAddress}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-xs text-gray-600 font-semibold">
                              Điện thoại:{' '}
                            </span>
                            {addr.phone}
                          </div>
                        </div>

                        <div className="flex items-center justify-start mb-4 pl-3">
                          <button
                            onClick={() => onHandleDelete(addr._id)}
                            className=" px-8 py-2 bg-red-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded"
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            ) : (
              <div className="py-3 mt-3 mx-auto ">
                <div className="flex justify-center">
                  <EmptyBox />
                </div>
              </div>
            )}

            <SectionTitle>Thêm địa chỉ giao hàng</SectionTitle>
            <div>
              <Formik
                initialValues={{
                  name: '',
                  phone: '',
                  fullAddress: '',
                }}
                //  validate={values => {
                //    const errors = {};
                //    if (!values.email) {
                //      errors.email = 'Required';
                //    } else if (
                //      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                //    ) {
                //      errors.email = 'Invalid email address';
                //    }
                //    return errors;
                //  }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  const valuesss = { ...values, mainAddress: districtWard }
                  addAddresss(valuesss).then((res) => {
                    loadUserAddress()
                    resetForm({})
                    setProvince('')
                    setProvinceDistrict('')
                    setDistrictWard('')
                  })
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="my-5 px-4">
                      <div className="my-2 flex items-center justify-between">
                        <span> Họ và tên người nhận </span>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          placeholder="Nhập họ và tên người nhận"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                        />
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Số điện thoại </span>
                        <input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          placeholder="Nhập số điện thoại"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                        />
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Tỉnh/Thành Phố </span>
                        <select
                          type="select"
                          placeholder="Chọn tỉnh/thành phố"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={province}
                          defaultValue="Chọn tỉnh/thành phố"
                          onChange={handleChanges}
                          required
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          {valuesx &&
                            valuesx.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.code}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Quận/Huyện</span>
                        <select
                          type="select"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={provinceDistrict}
                          onChange={handleChangeProvinceDistrict}
                          disabled={province ? false : true}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Chọn quận/huyện
                          </option>
                          {valuess &&
                            valuess.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.code}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Phường/Xã</span>
                        <select
                          type="select"
                          // name="mainAddress"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded"
                          value={districtWard}
                          onChange={handleChangeDistrictWard}
                          disabled={provinceDistrict ? false : true}
                          required
                        >
                          <option value="" disabled selected hidden>
                            Chọn phường/xã
                          </option>
                          {valuesss &&
                            valuesss.map((arr) => {
                              return (
                                <option key={arr._id} value={arr.full_name}>
                                  {arr.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                      <div className="my-2 flex items-center justify-between">
                        <span> Địa chỉ nhận hàng</span>
                        <input
                          type="text"
                          name="fullAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fullAddress}
                          placeholder="Nhập địa chỉ nhận hàng"
                          className="ml-2 py-2 w-align border px-3 text-grey-darkest rounded calc"
                        />
                      </div>
                    </div>

                    <div className="px-4 py-3 text-center sm:px-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/4"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </UserLayouts>
    </React.Fragment>
  )
}

export default UserAddress
