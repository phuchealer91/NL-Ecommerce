import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Image } from 'antd'

MessageOther.propTypes = {}

function MessageOther({ user, msg, isShowTime, setIsShowTime }) {
  return (
    <React.Fragment>
      <div
        className="py-1 flex flex-row justify-start transition"
        onClick={() => setIsShowTime(!isShowTime)}
      >
        <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src={user.photoURL}
            alt={user.photoURL}
          />
        </div>
        <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
          {msg.text && (
            <div className="flex items-center flex-row group">
              <p className="px-4 py-2 rounded-xl rounded-bl-none bg-gray-300 max-w-xs lg:max-w-md">
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
          {/* <div className="flex items-center group">
            <p className="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md text-gray-600">
              Shall we go for Hiking this weekend?
            </p>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default MessageOther
