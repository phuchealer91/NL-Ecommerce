import { Col, Pagination, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminSideBar } from '../../../../components/navigation/SideBar'
import { getProductsCount } from '../../../../redux/actions/product'
import TableReceipts from '../TableReceipts'
import TableInventoryWarehouse from './TableInventoryWarehouse'
import { getListProductss } from '../../../../apis/product'
InventoryWareHouseList.propTypes = {}

function InventoryWareHouseList(props) {
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { totalProducts } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProductsCount())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    loadAllProducts()
  }, [page])

  const loadAllProducts = () => {
    setIsLoading(true)
    getListProductss('sold', 'desc', page)
      .then((res) => {
        if (res.data) {
          setProducts(res.data.products)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <div>
      {' '}
      <Row>
        <Col xs={24} sm={24} md={5} lg={5}>
          <AdminSideBar />
        </Col>
        <Col xs={24} sm={24} md={19} lg={19}>
          <div className="w-full my-6 mx-3">
            <div className="flex items-center justify-between py-4 mx-4">
              <span className="text-gray-600 font-semibold text-lg">
                Quản lý nhập hàng
              </span>
            </div>
            <div className="pb-4 text-gray-600">
              Tổng số lượng sản phẩm:{' '}
              <span className="font-semibold">{totalProducts}</span>
            </div>
            <div className="bg-white shadow-md rounded mx-auto">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-xs leading-normal">
                    <th className="py-3 px-3 text-left">Mã</th>
                    <th className="py-3 px-3 text-left">Tên SP</th>
                    <th className="py-3 px-3 text-left">Danh mục</th>
                    <th className="py-3 px-3 text-left">Ảnh</th>
                    <th className="py-3 px-3 text-left">Số lượng nhập</th>
                    <th className="py-3 px-3 text-left">Số lượng còn lại</th>
                    <th className="py-3 px-3 text-left">Giá</th>
                  </tr>
                </thead>
                {products &&
                  products.map((product) => {
                    return (
                      <TableInventoryWarehouse
                        key={product._id}
                        product={product}
                      />
                    )
                  })}
              </table>
              <div className="flex items-center justify-center py-6 px-6">
                <Pagination
                  current={page}
                  total={(totalProducts / 8) * 10}
                  onChange={(value) => setPage(value)}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default InventoryWareHouseList
