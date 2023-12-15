import React, {useState, JSX} from "react";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen3 from "./Screen3";
import ImageConverter from "./ImageConverter";
import {Screens} from "./config";

const AsciiArt = (): JSX.Element => {
    const [activeScreen, setActiveScreen] = useState<Screens>(Screens.SCREEN1)

    const screens = {
        [Screens.SCREEN1]: <Screen1 setActiveScreen={setActiveScreen}/>,
        [Screens.SCREEN2]: <Screen2 setActiveScreen={setActiveScreen}/>,
        [Screens.SCREEN3]: <Screen3 setActiveScreen={setActiveScreen}/>,
        [Screens.SCREEN4]: <ImageConverter setActiveScreen={setActiveScreen}/>
    }
    return screens[activeScreen]
}
export default AsciiArt