import {Checkbox} from "antd";
import React from "react";
import {CheckboxValueType} from "antd/es/checkbox/Group";

interface Props {
    imgUploaded: boolean,
    options: ({ label: string; value: string })[],
    onChange: (checkedValues: string[]) => void,
    defaultCharset: string[]
}

const SelectCharSet = ({imgUploaded, options, onChange, defaultCharset}: Props) => {
    return <div className="checkbox">
        <h3>Please select a set of characters to create the ASCII image from:</h3>
        <Checkbox.Group
            defaultValue={defaultCharset}
            disabled={!imgUploaded}
            options={options}
            onChange={(checkedValues: CheckboxValueType[]) => onChange(checkedValues as string[])}
        />
    </div>;
}

export default SelectCharSet