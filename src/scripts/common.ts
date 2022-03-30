import * as lazySizes from "lazysizes";
//import { typekitClient } from "./typekit";
import { setMenu } from "./utils/setMenu";
//import { stickyHader } from "./utils/stickyHader";
import sal from "sal.js";

lazySizes.cfg.lazyClass = "lazy";
lazySizes.init();

const startup = (): void => {
    //typekitClient("hgl3hna");
    setMenu();
    //stickyHader();
    sal({
        threshold: 0.2,
    });
};

window.addEventListener("DOMContentLoaded", startup, { passive: true });

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .catch((error) => console.error("serviceWorker error.", error));
    }
});
