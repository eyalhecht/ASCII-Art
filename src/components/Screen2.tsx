import React from 'react';
import '../styles/Screen2.css'
import TextButton from "./genericComponents/TextButton";
import {Screens} from "./config";

interface Props {
    setActiveScreen: (screen: Screens) => void
}

const Screen2 = ({setActiveScreen}: Props) => {
    return (
        <div className={'screen2'}>
            <h1>How image is represented on a computer ?</h1>
            <p>In general, to represent images on a computer, we hold a two-dimensional array where each cell in the
                array represents a pixel in the image and contains information about the pixel's color. Colors consist
                of three primary colors - green (G), red (R), and blue (B) - determined by the intensity of these three
                colors. Each color intensity will be on a scale of 0-255, thus, we denote each color as a tuple of three
                numbers (B, G, R), where each number represents the intensity of its respective color.</p>
            <p>For example, the tuple (0, 0, 0) represents black color, while (255, 255, 255) represents white
                color.</p>
            <TextButton text={'previous'} onClick={() => {
                setActiveScreen(Screens.SCREEN1)
            }} position={'previous'} arrowIcon={true}/>
            <TextButton text={'next'} onClick={() => {
                setActiveScreen(Screens.SCREEN3)
            }} position={'next'} arrowIcon={true}/>
        </div>
    );
}

export default Screen2;
