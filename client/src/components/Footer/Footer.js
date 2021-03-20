import React from 'react'
function Footer() {
  return (
    <React.Fragment>
      {/* hidden */}
      <footer className="mt-16">
        <div className="w-full bg-blue-500 h-14 flex items-center  md:flex">
          <div className="container px-4 mx-auto sm:px-6 lg:px-11">
            <div className="flex items-center justify-between">
              <p className="uppercase text-base font-medium text-white">
                Liên hệ với chúng tôi
              </p>
              <form action className="w-2/4">
                <input
                  type="text"
                  name
                  placeholder="Enter your e-mail"
                  className="w-4/5 h-9 rounded-l px-3 py-1 contact-input"
                />
                <button className="btn-secondary text-white text-center -m-1 uppercase rounded-r">
                  Gửi
                </button>
              </form>
              <ul className="flex items-center">
                <li className="mr-5">
                  <a href className="text-white">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="mr-5">
                  <a href className="text-white">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="mr-5">
                  <a href className="text-white">
                    <i className="fab fa-google" />
                  </a>
                </li>
                <li className="mr-5">
                  <a href className="text-white">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className>
                  <a href className="text-white">
                    <i className="fab fa-pinterest" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* hidden */}
        <div className="w-full bg-gray-50 py-16  md:block">
          <div className="container px-11 mx-auto">
            <div className="grid grid-cols-4 gap-2">
              <ul>
                <p className="uppercase text-base text-gray-900 mb-3 font-medium">
                  Danh mục
                </p>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Văn học
                  </a>
                </li>
              </ul>
              <ul>
                <p className="uppercase text-base text-gray-900 mb-3 font-medium">
                  Thông tin
                </p>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    Dịch vụ
                  </a>
                </li>
              </ul>
              <ul>
                <p className="uppercase text-base text-gray-900 mb-3 font-medium">
                  Giới thiệu
                </p>
                <li className="mt-2">
                  <p className="text-sm capitalize text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Facilis aperiam libero obcaecati ab odio assumenda nesciunt
                    excepturi dolore nihil commodi.
                  </p>
                </li>
              </ul>
              <ul>
                <p className="uppercase text-base text-gray-900 mb-3 font-medium">
                  contact us
                </p>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">Địa chỉ: </span>
                  <span className="text-sm text-gray-500">
                    Số 44, Hẻm 4, Mậu Thân, Cần Thơ
                  </span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">Số điện thoại: </span>
                  <span className="text-sm text-gray-500">0966197305</span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">
                    Thời gian làm việc:{' '}
                  </span>
                  <span className="text-sm text-gray-500">Từ 8AM đến 6PM</span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">E-MAIL: </span>
                  <a
                    href="mailto:info@mydomain.com"
                    className="text-sm text-blue-600 hover:text-gray-500"
                  >
                    info@bookP.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile__footer w-full bg-gray-50 py-6 block md:hidden">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="mobile__footer-item">
              <div className="mobile__footer-collapse select-none flex items-center justify-between pt-6 pb-4 px-1 border-b border-gray-300 group cursor-pointer">
                <p className="uppercase text-gray-800 font-medium group-hover:text-blue-600">
                  categories
                </p>
                <i className="fal fa-plus text-gray-800" />
              </div>
              <ul className="mobile__footer-collapse-content hidden px-1">
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    women
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    men
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    accessories
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    shoes
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    new arrivals
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    clearence
                  </a>
                </li>
              </ul>
            </div>
            <div className="mobile__footer-item">
              <div className="mobile__footer-collapse select-none flex items-center justify-between pt-6 pb-4 px-1 border-b border-gray-300 group cursor-pointer">
                <p className="uppercase text-gray-800 font-medium group-hover:text-blue-600">
                  buy with us
                </p>
                <i className="fal fa-plus text-gray-800" />
              </div>
              <ul className="mobile__footer-collapse-content hidden px-1">
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    about us
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    services
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    contact us
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    faqs
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    privacy policy
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    cookie policy
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href
                    className="text-sm capitalize text-gray-500 hover:text-blue-600"
                  >
                    terms and conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="mobile__footer-item">
              <div className="mobile__footer-collapse select-none flex items-center justify-between pt-6 pb-4 px-1 border-b border-gray-300 group cursor-pointer">
                <p className="uppercase text-gray-800 font-medium group-hover:text-blue-600">
                  about
                </p>
                <i className="fal fa-plus text-gray-800" />
              </div>
              <ul className="mobile__footer-collapse-content hidden px-1">
                <li className="mt-4">
                  <p className="text-sm capitalize text-gray-500">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tempor incididunt.
                  </p>
                </li>
              </ul>
            </div>
            <div className="mobile__footer-item">
              <div className="mobile__footer-collapse select-none flex items-center justify-between pt-6 pb-4 px-1 border-b border-gray-300 group cursor-pointer">
                <p className="uppercase text-gray-800 font-medium group-hover:text-blue-600">
                  contact us
                </p>
                <i className="fal fa-plus text-gray-800" />
              </div>
              <ul className="mobile__footer-collapse-content hidden px-1">
                <li className="mt-4">
                  <span className="text-sm text-gray-700">ADDRESS: </span>
                  <span className="text-sm text-gray-500">
                    7895 Piermont Dr NE Albuquerque, NM 198866, United States of
                    America
                  </span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">PHONE: </span>
                  <span className="text-sm text-gray-500">
                    +566 4774 9930; +566 4774 9940
                  </span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">HOURS: </span>
                  <span className="text-sm text-gray-500">
                    all week from 9 am to 9 pm
                  </span>
                </li>
                <li className="mt-2">
                  <span className="text-sm text-gray-700">E-MAIL: </span>
                  <a
                    href="mailto:info@mydomain.com"
                    className="text-sm text-blue-600 hover:text-gray-500"
                  >
                    info@mydomain.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="mobile__footer-item">
              <div className="mobile__footer-collapse select-none flex items-center justify-between pt-6 pb-4 px-1 border-b border-gray-300 group cursor-pointer">
                <p className="uppercase text-gray-800 font-medium group-hover:text-blue-600">
                  be in touch with us
                </p>
                <i className="fal fa-plus text-gray-800" />
              </div>
              <div className="mobile__footer-collapse-content hidden px-1">
                <form action="#" className="pt-6 pb-4">
                  <input
                    type="email"
                    name
                    placeholder="Enter your e-mail"
                    className="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-black outline-none active:border-blue-600 focus:border-blue-600 transition-all"
                  />
                  <button className="btn btn-primary uppercase mt-4 w-full">
                    join us
                  </button>
                </form>
              </div>
            </div>
            <ul className="flex items-center mt-6">
              <li className="mr-5">
                <a href className="text-gray-500">
                  <i className="text-sm fab fa-facebook-f" />
                </a>
              </li>
              <li className="mr-5">
                <a href className="text-gray-500">
                  <i className="text-sm fab fa-twitter" />
                </a>
              </li>
              <li className="mr-5">
                <a href className="text-gray-500">
                  <i className="text-sm fab fa-google" />
                </a>
              </li>
              <li className="mr-5">
                <a href className="text-gray-500">
                  <i className="text-sm fab fa-instagram" />
                </a>
              </li>
              <li className>
                <a href className="text-gray-500">
                  <i className="text-sm fab fa-pinterest" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer
