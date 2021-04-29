import { Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTotalOrdersStatuss, userOrders } from '../../apis/cart'
import { UserSideBar } from '../../components/navigation/SideBar'
import TableOrder from '../../components/ViewOrder/TableOrder'
import ViewOrder from '../../components/ViewOrder/ViewOrder'
import './Styles.scss'
const { Step } = Steps

function History(props) {
  // const [isReady, setIsReady] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [isChangeStatus, setIsChangeStatus] = useState(false)
  const [userOrder, setuserOrder] = useState([])
  const [isCancel, setIsCancel] = useState(false)
  const [totalWConfirm, setTotalWConfirm] = useState(0)
  const [totalProcess, setTotalTotalProcess] = useState(0)
  const [totalCompleted, setTotalTotalCompleted] = useState(0)
  const [totalCancel, setTotalCancel] = useState(0)
  const [skips, setSkips] = useState(0)
  const [limits, setLimits] = useState(10)
  useEffect(() => {
    loadTotalWConfirm()
    loadTotalProcess()
    loadTotalCompleted()
    loadTotalCancel()
    loaduserOrder()
  }, [userOrder])
  useEffect(() => {
    loaduserOrder()
  }, [])
  // useEffect(() => {
  //   const variables = {
  //     skip: skips,
  //     limit: limits,
  //   }
  //   loaduserOrder(variables)
  // }, [isChange])
  console.log('userOrderuserOrderuserOrderuserOrderuserOrder', userOrder)
  const arrStatus = ['Đang chờ xác nhận', 'Đang xử lý', 'Đã bàn giao', 'Hủy']
  const loadTotalWConfirm = () => {
    getTotalOrdersStatuss({ status: arrStatus[0] })
      .then((res) => {
        if (res.data) {
          setTotalWConfirm(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalProcess = () => {
    getTotalOrdersStatuss({ status: arrStatus[1] })
      .then((res) => {
        if (res.data) {
          setTotalTotalProcess(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCompleted = () => {
    getTotalOrdersStatuss({ status: arrStatus[2] })
      .then((res) => {
        if (res.data) {
          setTotalTotalCompleted(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCancel = () => {
    getTotalOrdersStatuss({ status: arrStatus[3] })
      .then((res) => {
        if (res.data) {
          setTotalCancel(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loaduserOrder = (variables) =>
    userOrders(variables)
      .then((res) => {
        if (res.data) {
          setuserOrder(res.data.userOrders)
        }
      })
      .catch((error) => {})

  // const showPDFDownloadLink = (userOrder) => {
  //   return (
  //     <PDFDownloadLink
  //       document={<Invoice userOrders={userOrder} />}
  //       fileName="invoice.pdf"
  //       className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  //     >
  //       Download PDF
  //     </PDFDownloadLink>
  //   )
  // }

  // function onHandleLoadMore() {
  //   let Skip = skips + limits
  //   const variables = {
  //     skip: skips,
  //     limit: limits,
  //   }
  //   loaduserOrder(variables)
  //   setSkips(Skip)
  // }
  return (
    <React.Fragment>
      <div className="w-full mx-auto flex ">
        <div className="w-1/4">
          <UserSideBar />
        </div>
        <div className="w-3/4 mx-auto rounded mt-8">
          <div className="uppercase pb-4 text-gray-700 font-semibold  border-solid">
            TỔNG QUAN TRẠNG THÁI CÁC ĐƠN HÀNG
          </div>
          <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
            <div className="shadow-lg bg-white border-l-8 border-gray-400  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalWConfirm}
                </div>
                <div className="text-gray-700 text-base">ĐANG CHỜ XÁC NHẬN</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-yellow-500  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalProcess}
                </div>
                <div className="text-gray-700 text-base">ĐANG CHỜ XỬ LÝ</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-green-600  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalCompleted}
                </div>
                <div className="text-gray-700 text-base">ĐÃ BÀN GIAO</div>
              </div>
            </div>
            <div className="shadow-lg bg-white border-l-8 border-red-600  mb-2 p-2 md:w-1/4 mr-2">
              <div className="p-4 flex flex-col text-center">
                <div className="text-gray-600 text-2xl font-semibold">
                  {totalCancel}
                </div>
                <div className="text-gray-700 text-base">HỦY</div>
              </div>
            </div>
          </div>
          {userOrder && userOrder.length > 0 ? (
            <div className=" mt-4 px-4 border">
              <div className="uppercase border-b py-4 border-gray-100 pb-1 text-gray-700 font-semibold  border-solid px-4">
                CÁC ĐƠN HÀNG CỦA BẠN{' '}
                <span className="text-gray-500 text-xs">
                  ({userOrder?.length})
                </span>
              </div>
              <div>
                <div className="w-full">
                  <div className="bg-white shadow-md rounded my-6">
                    <table className=" w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Mã đơn hàng</th>
                          <th className="py-3 px-6 text-left">
                            Tên khách hàng
                          </th>
                          <th className="py-3 px-6 text-center">Tổng tiền</th>
                          <th className="py-3 px-6 text-center">Thời gian</th>
                          <th className="py-3 px-6 text-center">Trạng thái</th>
                          <th className="py-3 px-6 text-center">Thao tác</th>
                        </tr>
                      </thead>
                      {userOrder &&
                        userOrder.map((order, idx) => {
                          return <TableOrder order={order} idx={idx} />
                        })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ' '
          )}
          {/* {userOrder && userOrder.length > 3 ? (
            <div className="my-10 text-center">
              <button
                onClick={onHandleLoadMore}
                className="bg-gray-500 hover:bg-white text-white font-semibold hover:text-gray-500 py-2 px-4 hover:border border-solid border-gray-500 rounded"
              >
                Load more
              </button>
            </div>
          ) : (
            ''
          )} */}
        </div>
      </div>
    </React.Fragment>
  )
}
History.propTypes = {}

export default History
