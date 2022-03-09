// safari polyfill
// https://gfx.hatenablog.com/entry/2019/01/30/170352
if (typeof matchMedia !== "undefined" && !matchMedia("all").addEventListener) {
    console.log("installing polyfill: MediaQueryList.prototype.addEventListener");

    const originalMatchMedia = matchMedia;
    self.matchMedia = function matchMedia(mediaQuery: string): MediaQueryList {
        const mql = originalMatchMedia(mediaQuery);
        mql.addEventListener = function (type: string, listener: EventListenerOrEventListenerObject): void {
            this.addListener(listener as EventListener);
        };
        return mql;
    };
}

function menu(parents: string, trigger: string, menu: string): void {
    const target = document.querySelectorAll(parents);

    target.forEach((elm): void => {
        const item = elm.querySelector(`${trigger} + ${menu}`) as HTMLElement;

        if (item) {
            item.style.height = "auto";
            const rect = item.getBoundingClientRect();

            item.style.height = "0";
            item.style.visibility = "visible";
            elm.addEventListener(
                "mouseover",
                (): void => {
                    elm.classList.add("active");
                    item.style.height = `${rect.height}px`;
                },
                {
                    passive: true,
                    capture: true,
                }
            );

            elm.addEventListener(
                "mouseout",
                (): void => {
                    elm.classList.remove("active");
                    item.style.height = "0";
                },
                {
                    passive: true,
                    capture: true,
                }
            );
        }
    });
}

function spMenu(target: Element | null): void {
    if (target === null) return;

    const buttons = target.querySelector(":scope > ul#button");
    if (buttons === null) return;

    const li = document.createElement("li");
    li.textContent = "menu";
    li.id = "menubtn";
    buttons.append(li);

    const parent = target.querySelector(":scope > ul#menu") as HTMLElement;
    const parentRect = parent.getBoundingClientRect();
    parent.style.height = "0";

    li.addEventListener(
        "click",
        (): void => {
            target.classList.toggle("open");
            if (target.classList.contains("open")) {
                parent.style.height = `${parentRect.height}px`;
                li.textContent = "close";
                li.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
            } else {
                li.textContent = "menu";
                parent.style.height = "0";
                li.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
            }
        },
        {
            passive: true,
            capture: true,
        }
    );
}

function innerTitle(): void {
    const innerLists = document.querySelectorAll("body > header > nav#global > ul#menu > li");

    innerLists.forEach((list) => {
        const title = list.querySelector("h2");
        const inner = list.querySelector(".innerList");
        if (!title || !inner) return;

        const paragraph = document.createElement("p");
        paragraph.textContent = title.textContent;
        inner.append(paragraph);
    });
}

export function setMenu(): void {
    const mql = window.matchMedia("screen and (max-width: 1000px)");
    const nav = document.querySelector("body > header > nav#global");

    const state: { [key: string]: boolean } = {};
    const CheckMedia = (mql: MediaQueryList): void => {
        // sp
        if (mql.matches && !state.sp) {
            spMenu(nav);
            state.sp = true;
        }
        // pc
        else {
            if (nav === null) return;
            innerTitle();
            nav.addEventListener("mouseover", (): void => menu("body > header > nav > ul > li", "h2", ".innerList"), {
                once: true,
                passive: true,
                capture: true,
            });
        }
    };

    //mql.addEventListener("change", () => CheckMedia(mql), false);
    mql.addEventListener(
        "change",
        () => {
            const url = location.href;
            location.href = url;
        },
        false
    );
    CheckMedia(mql);
}
