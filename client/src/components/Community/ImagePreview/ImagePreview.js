import React from 'react'

import { Carousel, Image } from 'antd'

export const ImagePreview = ({ data }) => {
  return (
    <div>
      <Image.PreviewGroup>
        {data &&
          data.map((cover, idx) => (
            <Image
              src={cover.url}
              alt={cover.url}
              preview={true}
              className="px-3"
              placeholder="Xem chi tiết"
              width={
                data.length === 1
                  ? '80%'
                  : data.length === 2
                  ? '50%'
                  : data.length === 3
                  ? '33.33%'
                  : '25%'
              }
              key={idx}
            />
          ))}
      </Image.PreviewGroup>
    </div>
  )
}
export const ImagePreviewList = ({ data }) => {
  return (
    <div>
      <Image.PreviewGroup>
        {data &&
          data.map((cover, idx) => (
            <div className="flex flex-col items-center">
              <Image
                src={cover.url}
                alt={cover.url}
                preview={true}
                className="px-3 py-3"
                placeholder="Xem chi tiết"
                width="100%"
                key={idx}
              />
            </div>
          ))}
      </Image.PreviewGroup>
    </div>
  )
}
