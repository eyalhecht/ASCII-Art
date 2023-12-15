import React, {useState, useRef, JSX, useEffect} from "react";
import axios from "axios";
import {Button, Spin} from 'antd';
import TextButton from "./genericComponents/TextButton";
import ShowImage from "./ShowImage";
import SelectCharSet from "./SelectCharSet";
import SelectResolution from "./SelectResolution";
import DownloadImage from "./DownloadImage";
import {Screens} from "./config";
import "../styles/App.css"


const DEFAULT_RESOLUTION = 64;
const DEFAULT_CHARSET = ["0-9"];
const EMPTY_STRING = '';

interface Props {
    setActiveScreen: (screen: Screens) => void
}


const ImageConverter = ({setActiveScreen}: Props): JSX.Element => {
    const [imgUrl, setImgUrl] = useState<string>(EMPTY_STRING);
    const [imgUploaded, setImgUploaded] = useState<boolean>(false);
    const [currentResolution, setCurrentResolution] = useState<number>(DEFAULT_RESOLUTION);
    const [maxResolution, setMaxResolution] = useState<number>(DEFAULT_RESOLUTION);
    const [charSet, setCharSet] = useState<string[]>(DEFAULT_CHARSET);
    const [resolutionList, setResolutionList] = useState<number[]>([DEFAULT_RESOLUTION]);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const charsOptions = [
        {label: "A-Z", value: "A-Z"},
        {label: "0-9", value: "0-9"},
        {label: "a-z", value: "a-z"},
        {label: "Symbols", value: "!-."}
    ];


    const handleImageUpload = (): void => {
        const uploadedFile = inputRef.current?.files?.[0];
        if (uploadedFile?.size && uploadedFile.size < 1024 * 1024) {
            setImgUrl(URL.createObjectURL(uploadedFile));
        } else {
            if (!uploadedFile) {
                alert('Please select an image file to upload.');
            } else {
                alert('Please upload an image file smaller than 1MB.');
            }
        }
    };
    const handleDownload = async (): Promise<void> => {
        try {
            if (!charSet || !currentResolution) {
                alert('charSet or currentResolution is not properly initialized.');
                return;
            }

            setLoading(true);

            const response = await axios.get(`http://localhost:8080/download/${charSet}/${currentResolution}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'asciiImage.html');
            link.click();
            window.URL.revokeObjectURL(url);
            setLoading(false);
        } catch (error) {
            console.error('Error downloading file:', error);
            setLoading(false);
        }
    };


    const getMaxResolution = (): void => {
        setLoading(true)

        const file = inputRef.current?.files?.[0];

        if (file) {
            const formData = new FormData()
            formData.append('image', file)

            axios.post<number>("http://localhost:8080/upload", formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    setMaxResolution(response.data)
                    setImgUploaded(true)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error in uploading:', error);
                    setLoading(false)
                })
        }
    }

    const setResolutionsList = (): void => {
        const newArr = []
        for (let i = DEFAULT_RESOLUTION; i <= maxResolution; i *= 2) {
            newArr.push(i)
        }
        setResolutionList(newArr)
    }

    useEffect(setResolutionsList, [maxResolution])

    useEffect(() => {
        if (imgUrl) {
            getMaxResolution()
        }
    }, [imgUrl])


    return (
        <div className="screen2">
            <ShowImage imgUploaded={imgUploaded} imgUrl={imgUrl}/>
            <div className="settings">
                {!imgUploaded && (
                    <div className="upload-section" style={{textAlign: 'center'}}>
                        <h3>Please upload an image for conversion into an ASCII image:</h3>
                        <p>Max size: 1MB</p>
                    </div>
                )}
                <div className="upload-buttons">
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleImageUpload}
                        style={{display: "none"}}
                    />
                    <div className="container">
                        <Button onClick={() => inputRef.current?.click()}>
                            Upload Image
                        </Button>
                    </div>
                </div>
                {imgUploaded && (
                    <div className="container">
                        <SelectResolution imgUploaded={imgUploaded} setCurrentResolution={setCurrentResolution}
                                          resolutionList={resolutionList}/>
                        <SelectCharSet imgUploaded={imgUploaded} options={charsOptions} onChange={setCharSet}
                                       defaultCharset={DEFAULT_CHARSET}/>
                        <Spin spinning={loading} size="large"/>
                        <DownloadImage imgUploaded={imgUploaded} charSet={charSet} handleDownload={handleDownload}/>
                    </div>
                )}
            </div>
            <TextButton arrowIcon={true} text={"previous"} onClick={() => {
                setActiveScreen(Screens.SCREEN3)
            }} position={'previous'}/>
        </div>
    );

};

export default ImageConverter;