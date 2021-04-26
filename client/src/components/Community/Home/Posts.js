import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CardFooter from '../CardFooter/CardFooter'
import CardHeader from '../CardHeader/CardHeader'
import { ImagePreview } from '../ImagePreview/ImagePreview'

function Posts() {
  const { homePost, user } = useSelector((state) => state)

  return (
    <>
      <ul className="list-none">
        {homePost &&
          homePost.posts.map((item, idx) => (
            <li key={item._id}>
              <article className="transition">
                <CardHeader post={item} />
                <div className="p-4">
                  <p className="text-sm width-auto font-medium text-gray-100 flex-shrink">
                    {item.content}
                  </p>
                  <div className=" pt-3 flex items-center flex-wrap">
                    <ImagePreview data={item.images} />
                  </div>
                  <CardFooter post={item} />
                </div>
                <hr className="border-gray-800" />
              </article>
            </li>
          ))}
      </ul>
    </>
  )
}

export default Posts
