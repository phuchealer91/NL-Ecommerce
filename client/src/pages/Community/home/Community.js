import { Spin } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../../../components/Community/Home/Posts'
import Status from '../../../components/Community/Home/Status'
import UpdateStatus from '../../../components/Community/Home/UpdateStatus'
import LeftMenu from '../../../components/navigation/LeftMenu'
import RightMenu from '../../../components/navigation/RightMenu'
import { EmptyBox } from '../../../helpers/icons'

const Community = (props) => {
  const { homePost, status } = useSelector((state) => state)
  return (
    <React.Fragment>
      <div
        className="w-full flex items-center justify-center"
        style={{ background: '#15202b' }}
      >
        <div
          className="w-full p-relative "
          style={{ backgroundColor: '#15202b' }}
        >
          <div className="flex justify-center">
            <div style={{ width: '275px' }} className="text-white py-4 h-auto">
              <div
                className="overflow-y-auto fixed pr-3"
                style={{ width: '275px', height: 'calc(100vh - 52px)' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-white ml-3"
                  fill="currentColor"
                >
                  <g>
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                  </g>
                </svg>
                <LeftMenu />
                {/* <div className="absolute" style={{ bottom: '2rem' }}>
                  <div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-4 py-3 mt-12 mr-2">
                    <a href="#" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base leading-6 font-medium text-white">
                            ℜ𝔦𝔠𝔞𝔯𝔡𝔬ℜ𝔦𝔟𝔢𝔦𝔯𝔬.dev
                          </p>
                          <p className="text-sm leading-5 font-medium  group-hover:text-gray-300 transition ease-in-out duration-150">
                            @Ricardo_oRibeir
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex" style={{ width: 'calc(100% - 275px)' }}>
              <section
                className="w-full border border-y-0 border-gray-800"
                style={{ maxWidth: '700px' }}
              >
                <aside>
                  <div className="flex">
                    <div className="flex-1 mx-2">
                      <h2 className="px-4 py-2 text-xl font-semibold text-white">
                        Bản Tin
                      </h2>
                    </div>
                    <div className="flex-1 px-4 py-2 mx-2">
                      <a
                        href
                        className=" text-2xl font-medium rounded-full text-white hover:bg-gray-800 hover:text-blue-300 float-right"
                      >
                        <svg
                          className="m-2 h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <g>
                            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <hr className="border-gray-800" />
                  <Status />
                  {status.onEdit && <UpdateStatus />}

                  <hr className="border-gray-800 border-4" />
                </aside>

                {homePost && homePost.loading ? (
                  <div className="flex justify-center items-center py-10">
                    <Spin tip="Đang tải dữ liệu..." size="large" />{' '}
                  </div>
                ) : homePost.result === 0 ? (
                  <div className="py-10 text-white">
                    {' '}
                    <EmptyBox />
                  </div>
                ) : (
                  <Posts />
                )}
              </section>
              <RightMenu />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
Community.propTypes = {}

export default Community
