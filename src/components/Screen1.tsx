import React, {JSX} from 'react';
import '../styles/Screen1.css';
// @ts-ignore
import afterImage1 from '../assets/after3.png';
// @ts-ignore
import afterImage2 from '../assets/after4.png';
// @ts-ignore
import Donkey from '../assets/Donkey.jpeg';
import TextButton from "./genericComponents/TextButton";
import {Image, Row, Col} from "antd";
import {Screens} from "./config";

interface Props {
    setActiveScreen: (screen: Screens) => void
}

const Screen1 = ({setActiveScreen}: Props): JSX.Element => {
    const imageArray = [Donkey, afterImage1, afterImage2]; // Replace these with your image sources

    return (
        <div className="screen1">
            <h1>ASCII Art !</h1>
            <h2>What is ASCII art ?</h2>
            <p className={'text'}>
                ASCII Art is the type of art created from ASCII characters, by converting a group of pixels into ASCII
                character resembling it in brightness. The number of pixels
                converted to
                a character is a parameter of the process; the lower the number converted to a character, the more
                the resulting image will resemble the original image.
            </p>
            <h4>
                On the left: the original image.<br/>
                In the middle: part of its ASCII representation.<br/>
                On the right: a closer look at the ASCII representation.
                <br/>
                Click on the middle and right images for closer look of the ASCII representations.
            </h4>
            <Row justify="center" align="middle" gutter={[16, 16]}>
                {imageArray.map((image, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Image width={1300} src={image}/>
                        </div>
                    </Col>
                ))}
            </Row>
            <TextButton arrowIcon={true} text={"next"} onClick={() => {
                setActiveScreen(Screens.SCREEN2)
            }} position={'next'}/>
        </div>
    );
};

export default Screen1;
