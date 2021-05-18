import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Image } from 'antd'

MessageMe.propTypes = {}

function MessageMe({ user, msg, isShowTime, setIsShowTime }) {
  return (
    <React.Fragment>
      <div
        className="py-1 flex flex-row justify-end transition"
        onClick={() => setIsShowTime(!isShowTime)}
      >
        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          {msg.text && (
            <div className="flex items-center flex-row-reverse group">
              <p className="px-4 py-2 rounded-xl rounded-br-none bg-blue-500 max-w-xs lg:max-w-md">
                {msg.text}
              </p>
            </div>
          )}
          <Image.PreviewGroup>
            {msg.medias &&
              msg.medias.map((item, index) => (
                <div key={index}>
                  {item.url.match(/video/i) ? (
                    <div className="flex items-center flex-row-reverse group">
                      <div className="py-2 w-56 h-56 relative flex flex-shrink-0 max-w-xs lg:max-w-md flex-wrap">
                        <video
                          controls
                          className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                          src={item.url}
                          alt="video"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center flex-row-reverse group">
                      <div className="py-2 w-56 h-56 relative flex flex-shrink-0 max-w-xs lg:max-w-md flex-wrap">
                        <Image
                          className=" absolute w-full h-full shadow-md rounded-l-lg object-cover"
                          src={item.url}
                          alt={item.url}
                          style={{
                            width: '224px',
                            height: '224px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </Image.PreviewGroup>
          {/* <div className="flex items-center flex-row-reverse group">
            <p className="px-4 py-2 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
              {msg.text}
            </p>
          </div> */}
          {/* <div className="flex items-center flex-row-reverse group">
            <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Volutpat lacus laoreet non curabitur gravida.
            </p>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default MessageMe
