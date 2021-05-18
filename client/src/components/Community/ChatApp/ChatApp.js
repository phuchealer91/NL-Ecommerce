import React from 'react'
import PropTypes from 'prop-types'
import LeftSideApp from './LeftSideApp'
import RightSideApp from './RightSideApp'
import { EmptyBox } from '../../../helpers/icons'

ChatApp.propTypes = {}

function ChatApp(props) {
  return (
    <React.Fragment>
      <div
        className=" w-full flex antialiased text-gray-600 bg-white overflow-hidden"
        style={{ height: 'calc(100vh - 110px)' }}
      >
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <LeftSideApp />
            <section className="flex flex-col flex-auto border-l border-gray-300">
              <RightSideApp />
            </section>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChatApp
