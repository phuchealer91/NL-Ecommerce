import { Col, Divider, Rate, Row, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { getProduct } from '../../apis/product'
import { CardItem } from '../../components/CardItem'
import LoadingCard from '../../components/LoadingCard'
import { SingleProduct } from '../../components/SingleProduct'
import SingleProductZoom from '../../components/SingleProduct/SingleProductZoom'
import { EmptyBox } from '../../helpers/icons'
import { getRelated } from '../../redux/actions/product'
import './Product.scss'
const { TabPane } = Tabs
function Product(props) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [productEditing, setProductEditing] = useState()
  const { productRelated, reviews } = useSelector((state) => state.product)
  const { slug } = useRouteMatch().params
  console.log('slug', slug)
  useEffect(() => {
    loadProduct()
  }, [])
  const loadProduct = () => {
    getProduct(slug).then((res) => {
      if (res.data) {
        setProductEditing(res.data.product)
      }
    })
  }
  useEffect(() => {
    setIsLoading(true)
    if (productEditing && productEditing._id) {
      dispatch(getRelated(productEditing._id))
      setIsLoading(false)
    }
  }, [dispatch, productEditing])
  console.log(
    'productEditingproductEditingproductEditingproductEditing',
    productEditing
  )
  return (
    <React.Fragment>
      <div className="block w-full ">
        <div className="mx-4 my-4 ">
          {productEditing && (
            <SingleProductZoom productEditing={productEditing} />
          )}
        </div>
        <div className="mx-4 my-4 rounded rounded-b-none rounded-l-none">
          <div className="px-4 py-4 bg-white">
            <div className="text-gray-600 font-semibold text-base px-4 py-3">
              SẢN PHẨM LIÊN QUAN
            </div>
            {isLoading ? (
              <LoadingCard count={4} />
            ) : (
              <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto grid-flow-row gap-12 mt-6">
                  {productRelated &&
                    productRelated.map((product) => {
                      return <CardItem product={product} key={product._id} />
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mx-4 my-4 rounded rounded-b-none rounded-l-none ">
          <div className="px-4 py-4 bg-white">
            <Tabs type="card">
              <TabPane tab="Thông tin sản phẩm" key="1">
                <div className="px-4 py-4">
                  <table className="w-full">
                    <tbody>
                      <tr className="my-3">
                        <th className="text-gray-600 w-1/4 py-2">Mã hàng</th>
                        <td className="text-gray-600 w-3/4">
                          {productEditing?._id}{' '}
                        </td>
                      </tr>
                      <tr className="my-3">
                        <th className="text-gray-600 w-1/4 py-2">
                          Tên Nhà Cung Cấp{' '}
                        </th>
                        <td className="text-gray-600 w-3/4">
                          {/* {productEditing?.supplier}{' '} */}
                        </td>
                      </tr>
                      <tr className="my-3">
                        <th className="text-gray-600 w-1/4 py-2">Tác giả </th>
                        <td className="text-gray-600 w-3/4">
                          {productEditing?.author.map((s) => (
                            <Link
                              key={s._id}
                              to={`/author/${s.slug}`}
                              className="pr-1 font-semibold list-group__right text-gray-600 no-underline"
                            >
                              {s.name},
                            </Link>
                          ))}
                        </td>
                      </tr>
                      <tr className="my-3">
                        <th className="text-gray-600 w-1/4 py-2">NXB</th>
                        <td className="text-gray-600 w-3/4">
                          {productEditing?.publisher}{' '}
                        </td>
                      </tr>
                      <tr className="my-3">
                        <th className="text-gray-600 w-1/4 py-2">Năm XB</th>
                        <td className="text-gray-600 w-3/4">
                          {new Date(
                            productEditing?.publication
                          ).toLocaleString()}{' '}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <th className="text-gray-600 w-1/4 py-2">Số Trang</th>
                        <td className="text-gray-600 w-3/4">
                          {productEditing?.pages}{' '}
                        </td>
                      </tr>
                      <tr className="py-2">
                        <th className="text-gray-600 w-1/4 py-2">Hình thức</th>
                        <td className="text-gray-600 w-3/4">
                          {productEditing?.layout}{' '}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-4 my-2">
                  <div className="text-base text-gray-600 font-semibold pb-2">
                    Thông tin ngắn về sách
                  </div>
                  <p>
                    {productEditing?.description && productEditing?.description}
                  </p>
                </div>
              </TabPane>
              <TabPane
                tab={`Khách hàng nhận xét (${productEditing?.reviews.length})`}
                key="2"
                animated
              >
                <div className="px-4 py-4">
                  <Divider dashed />
                  {productEditing && productEditing?.reviews.length > 0 ? (
                    productEditing.reviews.map((rating, idx) => {
                      return (
                        <div className="pb-2" key={idx}>
                          <div className="flex items-end">
                            <div className="flex items-center content-center">
                              <div className="w-8 h-8 flex items-center justify-center rounded-full py-1 px-2 bg-gray-300 font-semibold">
                                {rating.name.slice(0, 1).toUpperCase()}
                              </div>
                              <h3 className="text-lg font-semibold mx-2">
                                {rating.name}
                              </h3>
                              <p className="text-gray-500 text-xs">
                                {new Date(
                                  productEditing?.updatedAt
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Rate value={rating.rating} disabled />
                          <p className="text-lg">{rating.comment}</p>
                          <Divider dashed />
                        </div>
                      )
                    })
                  ) : (
                    <EmptyBox />
                  )}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="mx-4 my-4 rounded rounded-b-none rounded-l-none ">
          <div className="px-4 py-4 bg-white">
            <div className="text-gray-600 font-semibold text-base px-4 py-3">
              SẢN PHẨM LIÊN QUAN
            </div>
            {isLoading ? (
              <LoadingCard count={4} />
            ) : (
              <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto grid-flow-row gap-12 mt-6">
                  {productRelated &&
                    productRelated.map((product) => {
                      return <CardItem product={product} key={product._id} />
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
Product.propTypes = {}
export default Product
