import React from "react";
import UploadedImage from "./UploadedImage";

interface Props {
    imgUploaded: boolean,
    imgUrl: string
}

const ShowImage = ({imgUploaded, imgUrl}: Props) => {
    return <>
        {imgUploaded && (
            <div className={"cardView"}>
                <UploadedImage imgUrl={imgUrl}/>
            </div>
        )}
    </>;
}


export default ShowImage