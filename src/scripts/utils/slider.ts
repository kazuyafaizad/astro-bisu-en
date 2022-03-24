import * as TinySlider from "tiny-slider";
import { tns } from "tiny-slider/src/tiny-slider";

const indexSlider = (): TinySlider.TinySliderInstance => {
    const Slider = tns({
        container: ".slider",
        speed: 1000,
        controls: false,
        mouseDrag: true,
        autoplay:true,
        autoplayButtonOutput:false

    });
    return Slider;
};

export default { indexSlider };
