import React, {JSX} from 'react';
import {Button} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import '../../styles/TextButton.css';

interface Props {
    text: string;
    onClick: () => void;
    position: 'previous' | 'next';
    arrowIcon?: boolean;
}

const TextButton = ({text, onClick, position, arrowIcon = false}: Props): JSX.Element => {
    const isPrevious = position === 'previous';

    return (
        <Button
            className={isPrevious ? 'previous' : 'next'}
            onClick={onClick}
            icon={arrowIcon ? (isPrevious ? <LeftOutlined/> : <RightOutlined/>) : undefined}
        >
            {text}
        </Button>
    );
};

export default TextButton;
