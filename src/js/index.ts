import slider from "./utils/slider";
import { whatsNew } from "./utils/whatsNew";
import { searchBox } from "./utils/searchBox";
import { campaignBanner } from "./utils/campaignBanner";

const startup = (): void => {
    slider.indexSlider();
    whatsNew(".tns-outer");
    searchBox();
    campaignBanner("#items > h2");
};

window.addEventListener("DOMContentLoaded", startup, { passive: true });
