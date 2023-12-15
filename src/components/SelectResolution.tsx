import {Radio, RadioChangeEvent} from "antd";
import React from "react";

interface Props {
    imgUploaded: boolean,
    setCurrentResolution: (resolution: number) => void,
    resolutionList: number[]
}

const SelectResolution = ({imgUploaded, setCurrentResolution, resolutionList}: Props) => {
    return (<div className="resolution">
        <h3>Please specify the desired resolution of your ASCII image:</h3>
        <Radio.Group
            defaultValue={64}
            disabled={!imgUploaded}
            onChange={(e: RadioChangeEvent) => {
                setCurrentResolution(e.target.value);
            }}
        >
            {resolutionList.map((res,index) => (
                <Radio key={index} value={res}>
                    {res}
                </Radio>
            ))}
        </Radio.Group>
    </div>)
}

export default SelectResolution