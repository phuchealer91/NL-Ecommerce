import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Resizer from 'react-image-file-resizer'
import { uploadFileImages, deleteUploadImage } from '../../apis/cloudinary'
import { toast } from 'react-toastify'
import { Avatar, Badge, Input } from 'antd'
import './FileUpload.scss'
import { useSelector } from 'react-redux'

FileUpload.propTypes = {}

function FileUpload({ product, setProduct, setIsLoading }) {
  const { user, product: pro } = useSelector((state) => ({ ...state }))
  console.log(pro && pro.productEditing)
  function handleUploadAndResize(e) {
    let files = e.target.files
    let allImages = product.images
    if (files) {
      setIsLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            try {
              uploadFileImages({ image: uri }).then((res) => {
                setIsLoading(false)
                allImages.push(res.data)
                setProduct({ ...product, images: allImages })
              })
            } catch (error) {
              setIsLoading(false)
            }
          },
          'base64'
        )
      }
    }
  }
  function handleImageRemove(public_id) {
    setIsLoading(true)
    deleteUploadImage({ public_id })
      .then((res) => {
        setIsLoading(false)
        const { images } = product
        let newImages = images.filter((item) => {
          return item.public_id !== public_id
        })
        setProduct({ ...product, images: newImages })
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }
  return (
    <div className="upload">
      <div className="upload__preview">
        {product &&
          product.images.map((image) => {
            return (
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar
                  key={image.public_id}
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            )
          })}
      </div>

      <label className="label">
        Choose File
        <Input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={handleUploadAndResize}
        />
      </label>
    </div>
  )
}

export default FileUpload
