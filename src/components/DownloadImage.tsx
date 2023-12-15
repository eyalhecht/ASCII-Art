import {Button} from "antd";
import React from "react";

interface Props {
    imgUploaded: boolean,
    charSet: string[],
    handleDownload: () => Promise<void>
}

const DownloadImage = ({imgUploaded, charSet, handleDownload}: Props) => {
    return (
        <div className="download-buttons">
            {imgUploaded ? (
                <div>
                    <Button disabled={charSet.length === 0} onClick={handleDownload}>
                        Download ASCII Image!
                    </Button>
                    <p>*Zoom out the downloaded image for better clarity.</p>
                </div>
            ) : null}
        </div>
    )
}
export default DownloadImage
