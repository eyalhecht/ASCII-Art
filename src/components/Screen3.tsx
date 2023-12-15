import React from 'react';
import '../styles/Screen3.css'
import TextButton from "./genericComponents/TextButton";
import {Screens} from "./config";

interface Props {
    setActiveScreen: (screen: Screens) => void
}

const Screen3 = ({setActiveScreen}: Props) => {
    return (
        <div className="screen3">
            <h1 className="main-heading">How the Program Works ?</h1>
            <h2 className="sub-heading">The process of generating ASCII art includes several steps:</h2>

            <div className="step">
                <h3>1. Padding the Image</h3>
                <p>Adjust the image dimensions to a power of 2 by adding white pixels around its edges. This ensures
                    consistency and prepares the image for further processing.</p>
            </div>

            <div className="step">
                <h3>2. Dividing the Image into Sub-Images</h3>
                <p>Split the image into smaller segments or sub-images. Each sub-image will be later transformed into an
                    ASCII character, contributing to the overall ASCII representation of the image.</p>
            </div>

            <div className="step">
                <h3>3. Determining ASCII Character Brightness</h3>
                <p>Assess the brightness of ASCII characters by converting them into a binary grid. The sum of 'bright'
                    elements within this grid is normalized to a range between 0 and 1, representing the character's
                    brightness.</p>
            </div>

            <div className="step">
                <h3>4. Mapping Sub-Images to Matching Characters</h3>
                <p>Calculate the average brightness of each sub-image by converting its color pixels to grayscale. Then,
                    associate each sub-image with an ASCII character that closely matches its brightness level.</p>
            </div>

            <div className="step">
                <h3>5. Creating the ASCII Representation of the Entire Image</h3>
                <p>Utilize the character set and define the number of characters in each row/column to convert the
                    entire image into ASCII art. This final step generates a two-dimensional array of ASCII characters
                    representing the original image.</p>
            </div>

            <TextButton text={'previous'} onClick={() => {
                setActiveScreen(Screens.SCREEN2)
            }} position={'previous'} arrowIcon={true}/>
            <TextButton text={'next'} onClick={() => {
                setActiveScreen(Screens.SCREEN4)
            }} position={'next'} arrowIcon={true}/>
        </div>
    );
}

export default Screen3;
