import React from 'react'
import CardFooter from '../CardFooter/CardFooter'
import CardHeader from '../CardHeader/CardHeader'
import Comments from '../Comments/Comments'
import InputComment from '../Comments/InputComment'
import { ImagePreview } from '../ImagePreview/ImagePreview'

function PostCard({ post }) {
  return (
    <li key={post._id}>
      <article className="transition">
        <CardHeader post={post} />
        <div className="px-4 pt-4 border-b border-gray-600">
          <p className="text-sm width-auto font-medium text-gray-100 flex-shrink">
            {post.content}
          </p>
          <div className=" pt-3 flex items-center flex-wrap">
            <ImagePreview data={post.images} />
          </div>
          <CardFooter post={post} />
        </div>
        <div className="py-4">
          <Comments post={post} />
          <InputComment post={post} />
        </div>
        <hr className="border-gray-800" />
      </article>
    </li>
  )
}

export default PostCard
