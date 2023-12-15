import React from "react";
interface Props{
    imgUrl: string
}
const UploadedImage = ({imgUrl}: Props) => {
  return(
      <view>
          <img style={{borderRadius: 20}} className={'image'} src={imgUrl} alt="Uploaded" width="200"/>
      </view>


  )
}
export default UploadedImage