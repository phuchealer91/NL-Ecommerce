import React from 'react'
import PropTypes from 'prop-types'
import LeftSideApp from './LeftSideApp'

ChatApp.propTypes = {}

function ChatApp(props) {
  return (
    <React.Fragment>
      {/* <div className="w-full">
        <div
          className="grid grid-cols-3 min-w-full border rounded"
          style={{ minHeight: '80vh' }}
        >
          <div className="col-span-1 bg-white border-r border-gray-300">
            <div className="my-3 mx-3 ">
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  aria-placeholder="Busca tus amigos o contacta nuevos"
                  placeholder="Busca tus amigos"
                  className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
                  type="search"
                  name="search"
                  required
                  autoComplete="search"
                />
              </div>
            </div>
            <ul className="overflow-auto" style={{ height: '500px' }}>
              <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
              <li>
                <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-base text-gray-600 ">
                        Jhon C
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                        5 minutes
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">
                      Hello world!!
                    </span>
                  </div>
                </a>
                <a className="bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-base text-gray-600 ">
                        Eduard
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                        15 minutes
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">
                      I am fine
                    </span>
                  </div>
                </a>
                <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/6238133/pexels-photo-6238133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-base text-gray-600 ">
                        Celia
                      </span>
                      <span className="block ml-2 text-sm text-gray-600">
                        1 hour
                      </span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">
                      Last message
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 bg-white">
            <div className="w-full">
              <div className="flex items-center border-b border-gray-300 pl-3 py-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-base text-gray-600">
                  Eduard
                </span>
                <span className="connected text-green-500 ml-2">
                  <svg width={6} height={6}>
                    <circle cx={3} cy={3} r={3} fill="currentColor" />
                  </svg>
                </span>
              </div>
              <div
                id="chat"
                className="w-full overflow-y-auto p-10 relative"
                style={{ height: '700px' }}
              >
                <ul>
                  <li className="clearfix2">
                    <div className="w-full flex justify-start">
                      <div
                        className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                        style={{ maxWidth: '300px' }}
                      >
                        <span className="block">Hello bro</span>
                        <span className="block text-xs text-right">
                          10:30pm
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div
                        className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                        style={{ maxWidth: '300px' }}
                      >
                        <span className="block">Hello</span>
                        <span className="block text-xs text-left">10:32pm</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div
                        className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                        style={{ maxWidth: '300px' }}
                      >
                        <span className="block">how are you?</span>
                        <span className="block text-xs text-left">10:32pm</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-start">
                      <div
                        className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                        style={{ maxWidth: '300px' }}
                      >
                        <span className="block">I am fine</span>
                        <span className="block text-xs text-right">
                          10:42pm
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                <button className="outline-none focus:outline-none">
                  <svg
                    className="text-gray-400 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button className="outline-none focus:outline-none ml-1">
                  <svg
                    className="text-gray-400 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  aria-placeholder="Escribe un mensaje aquí"
                  placeholder="Escribe un mensaje aquí"
                  className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
                  type="text"
                  name="message"
                  required
                />
                <button
                  className="outline-none focus:outline-none"
                  type="submit"
                >
                  <svg
                    className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className=" w-full flex antialiased text-gray-600 bg-white overflow-hidden"
        style={{ height: 'calc(100vh - 110px)' }}
      >
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <LeftSideApp />
            <section className="flex flex-col flex-auto border-l border-gray-300">
              <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <div className="flex">
                  <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/women/33.jpg"
                      alt=""
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Scarlett Johansson</p>
                    <p>Active 1h ago</p>
                  </div>
                </div>
                <div className="flex">
                  <a
                    href="#"
                    className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-4 h-4 fill-current text-blue-500"
                    >
                      <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2 ml-4"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-4 h-4 fill-current text-blue-500"
                    >
                      <path d="M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2 ml-4"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-4 h-4 fill-current text-blue-500"
                    >
                      <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="chat-body p-4 flex-1 overflow-y-scroll">
                <div className="flex flex-row justify-start">
                  <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                    <img
                      className="shadow-md rounded-full w-full h-full object-cover"
                      src="https://randomuser.me/api/portraits/women/33.jpg"
                      alt=""
                    />
                  </div>
                  <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md text-gray-600">
                        Hey! How are you?
                      </p>
                    </div>
                    <div className="flex items-center group">
                      <p className="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md text-gray-600">
                        Shall we go for Hiking this weekend?
                      </p>
                    </div>
                  </div>
                </div>
                <p className="p-4 text-center text-sm text-gray-500">
                  FRI 3:04 PM
                </p>
                <div className="flex flex-row justify-end">
                  <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                        Hey! How are you?
                      </p>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                        Shall we go for Hiking this weekend?
                      </p>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Volutpat lacus laoreet non curabitur
                        gravida.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="p-4 text-center text-sm text-gray-500">
                  SAT 2:10 PM
                </p>

                <div className="flex flex-row justify-end">
                  <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                        Hey! How are you?
                      </p>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                        Shall we go for Hiking this weekend?
                      </p>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <a
                        className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                        href="#"
                      >
                        <img
                          className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                          src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
                          alt="hiking"
                        />
                      </a>
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                      <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Volutpat lacus laoreet non curabitur
                        gravida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M10,1.6c-4.639,0-8.4,3.761-8.4,8.4s3.761,8.4,8.4,8.4s8.4-3.761,8.4-8.4S14.639,1.6,10,1.6z M15,11h-4v4H9  v-4H5V9h4V5h2v4h4V11z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
                    </svg>
                  </button>
                  <div className="relative flex-grow">
                    <label>
                      <input
                        className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-100 focus:border-gray-200 bg-gray-100 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
                        type="text"
                        defaultValue
                        placeholder="Aa"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="w-full h-full fill-current"
                        >
                          <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                        </svg>
                      </button>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-full h-full fill-current"
                    >
                      <path d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChatApp
