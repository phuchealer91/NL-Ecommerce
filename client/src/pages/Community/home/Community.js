import React from 'react'
import Status from '../../../components/Community/Home/Status'
import SearchUser from '../../../components/Community/SearchUser'
import LeftMenu from '../../../components/navigation/LeftMenu'
import RightMenu from '../../../components/navigation/RightMenu'

function Community(props) {
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
            {/* Navbar (left side) */}
            <div style={{ width: '275px' }} className="text-white py-4 h-auto">
              <div
                className="overflow-y-auto fixed pr-3"
                style={{ width: '275px', height: 'calc(100vh - 52px)' }}
              >
                {/*Logo*/}
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-white ml-3"
                  fill="currentColor"
                >
                  <g>
                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                  </g>
                </svg>
                {/* Nav*/}
                <LeftMenu />
                {/* User Menu */}
                <div className="absolute" style={{ bottom: '2rem' }}>
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
                </div>
              </div>
            </div>
            <div className="flex" style={{ width: 'calc(100% - 275px)' }}>
              <section
                className="w-full border border-y-0 border-gray-800"
                style={{ maxWidth: '100%' }}
              >
                {/*Content (Center)*/}
                <aside>
                  <div className="flex">
                    <div className="flex-1 mx-2">
                      <h2 className="px-4 py-2 text-xl font-semibold text-white">
                        Home
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
                  {/*middle creat tweet*/}
                  <Status />

                  <hr className="border-gray-800 border-4" />
                </aside>

                <ul className="list-none">
                  <li>
                    {/*second tweet*/}
                    <article className="hover:bg-gray-800 transition duration-350 ease-in-out">
                      <div className="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" className="flex-shrink-0 group block">
                          <div className="flex items-center">
                            <div>
                              <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-base leading-6 font-medium text-white">
                                Sonali Hirave
                                <span className="text-sm leading-5 font-medium  group-hover:text-gray-300 transition ease-in-out duration-150">
                                  @ShonaDesign . 16 April
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="pl-16">
                        <p className="text-base width-auto font-medium text-white flex-shrink">
                          Day 07 of the challenge{' '}
                          <a href="#" className="text-blue-400">
                            #100DaysOfCode
                          </a>
                          I was wondering what I can do with{' '}
                          <a href="#" className="text-blue-400">
                            #tailwindcss
                          </a>
                          , so just started building Twitter UI using Tailwind
                          and so far it looks so promising. I will post my code
                          after completion. [07/100]
                          <a href="#" className="text-blue-400">
                            {' '}
                            #WomenWhoCode #CodeNewbie
                          </a>
                        </p>
                        <div className="md:flex-shrink pr-6 pt-3">
                          <div
                            className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                            style={{
                              height: '200px',
                              backgroundImage:
                                'url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80)',
                            }}
                          >
                            <img
                              className="opacity-0 w-full h-full"
                              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center py-4">
                          <div className="flex-1 flex items-center text-white text-xs hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                              </g>
                            </svg>
                            12.3 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs hover:text-green-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs hover:text-red-600 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-800" />
                    </article>
                  </li>
                  <li>
                    {/*second tweet*/}
                    <article className="hover:bg-gray-800 transition duration-350 ease-in-out">
                      <div className="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" className="flex-shrink-0 group block">
                          <div className="flex items-center">
                            <div>
                              <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-base leading-6 font-medium text-white">
                                Sonali Hirave
                                <span className="text-sm leading-5 font-medium  group-hover:text-gray-300 transition ease-in-out duration-150">
                                  @ShonaDesign . 16 April
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="pl-16">
                        <p className="text-base width-auto font-medium text-white flex-shrink">
                          Day 07 of the challenge{' '}
                          <a href="#" className="text-blue-400">
                            #100DaysOfCode
                          </a>
                          I was wondering what I can do with{' '}
                          <a href="#" className="text-blue-400">
                            #tailwindcss
                          </a>
                          , so just started building Twitter UI using Tailwind
                          and so far it looks so promising. I will post my code
                          after completion. [07/100]
                          <a href="#" className="text-blue-400">
                            {' '}
                            #WomenWhoCode #CodeNewbie
                          </a>
                        </p>
                        <div className="md:flex-shrink pr-6 pt-3">
                          <div
                            className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                            style={{
                              height: '200px',
                              backgroundImage:
                                'url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80)',
                            }}
                          >
                            <img
                              className="opacity-0 w-full h-full"
                              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center py-4">
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                              </g>
                            </svg>
                            12.3 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-800" />
                    </article>
                  </li>
                  <li>
                    {/*second tweet*/}
                    <article className="hover:bg-gray-800 transition duration-350 ease-in-out">
                      <div className="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" className="flex-shrink-0 group block">
                          <div className="flex items-center">
                            <div>
                              <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-base leading-6 font-medium text-white">
                                Sonali Hirave
                                <span className="text-sm leading-5 font-medium  group-hover:text-gray-300 transition ease-in-out duration-150">
                                  @ShonaDesign . 16 April
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="pl-16">
                        <p className="text-base width-auto font-medium text-white flex-shrink">
                          Day 07 of the challenge{' '}
                          <a href="#" className="text-blue-400">
                            #100DaysOfCode
                          </a>
                          I was wondering what I can do with{' '}
                          <a href="#" className="text-blue-400">
                            #tailwindcss
                          </a>
                          , so just started building Twitter UI using Tailwind
                          and so far it looks so promising. I will post my code
                          after completion. [07/100]
                          <a href="#" className="text-blue-400">
                            {' '}
                            #WomenWhoCode #CodeNewbie
                          </a>
                        </p>
                        <div className="md:flex-shrink pr-6 pt-3">
                          <div
                            className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                            style={{
                              height: '200px',
                              backgroundImage:
                                'url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80)',
                            }}
                          >
                            <img
                              className="opacity-0 w-full h-full"
                              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center py-4">
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                              </g>
                            </svg>
                            12.3 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-800" />
                    </article>
                  </li>
                  <li>
                    {/*second tweet*/}
                    <article className="hover:bg-gray-800 transition duration-350 ease-in-out">
                      <div className="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" className="flex-shrink-0 group block">
                          <div className="flex items-center">
                            <div>
                              <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-base leading-6 font-medium text-white">
                                Sonali Hirave
                                <span className="text-sm leading-5 font-medium  group-hover:text-gray-300 transition ease-in-out duration-150">
                                  @ShonaDesign . 16 April
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="pl-16">
                        <p className="text-base width-auto font-medium text-white flex-shrink">
                          Day 07 of the challenge{' '}
                          <a href="#" className="text-blue-400">
                            #100DaysOfCode
                          </a>
                          I was wondering what I can do with{' '}
                          <a href="#" className="text-blue-400">
                            #tailwindcss
                          </a>
                          , so just started building Twitter UI using Tailwind
                          and so far it looks so promising. I will post my code
                          after completion. [07/100]
                          <a href="#" className="text-blue-400">
                            {' '}
                            #WomenWhoCode #CodeNewbie
                          </a>
                        </p>
                        <div className="md:flex-shrink pr-6 pt-3">
                          <div
                            className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                            style={{
                              height: '200px',
                              backgroundImage:
                                'url(https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80)',
                            }}
                          >
                            <img
                              className="opacity-0 w-full h-full"
                              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="flex items-center py-4">
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                              </g>
                            </svg>
                            12.3 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-green-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-red-600 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                              </g>
                            </svg>
                            14 k
                          </div>
                          <div className="flex-1 flex items-center text-white text-xs  hover:text-blue-400 transition duration-350 ease-in-out">
                            <svg
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 mr-2"
                            >
                              <g>
                                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-800" />
                    </article>
                  </li>
                </ul>
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
