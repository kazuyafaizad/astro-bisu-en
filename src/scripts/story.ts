import { stickyItems } from "./utils/stickyItems";
import { sideNav } from "./utils/sideNav";

Reflect.defineProperty(window, "stickyItems", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: stickyItems,
});

Reflect.defineProperty(window, "sideNav", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: sideNav,
});
