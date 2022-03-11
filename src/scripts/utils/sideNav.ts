interface ISidenav {
    title: string;
    target: string;
    anchor: string[];
}

const current = 1;

const sideNav = (config: ISidenav): void => {
    //Target to section parent div
    const container = document.querySelector(config.target);
    if (!container) return;

    const total = config.anchor.length;

    const sidenavParent = document.createElement("div");
    sidenavParent.classList.add("sideNav");

    const sidenavContent = document.createElement("div");
    sidenavContent.classList.add("sideNav_inner", "sideNav_inner--height");

    const contentTitle = document.createElement("p");
    contentTitle.classList.add("sideNav_title", "sideNav_title--rotate");
    contentTitle.textContent = config.title;
    sidenavContent.append(contentTitle);
    sidenavParent.append(sidenavContent);

    const sidenavPrev = document.createElement("p");
    sidenavPrev.classList.add("sideNav_paging");

    const sidenavPaging = document.createElement("span");
    sidenavPaging.classList.add("sideNav_paging_current");

    const sidenavCurrent = document.createElement("span");
    sidenavCurrent.classList.add("js-current");
    sidenavCurrent.textContent = current.toString();
    sidenavPaging.append(sidenavCurrent);
    sidenavPrev.append(sidenavPaging);

    const sidenavSlash = document.createElement("span");
    sidenavSlash.textContent = "/";
    sidenavPrev.append(sidenavSlash);

    const sidenavTotal = document.createElement("span");
    sidenavTotal.classList.add("js-total");
    sidenavTotal.textContent = total.toString();
    sidenavPrev.append(sidenavTotal);

    sidenavContent.append(sidenavPrev);

    const sidenavPrevBtn = document.createElement("div");
    sidenavPrevBtn.classList.add("sideNav_btnPrev");
    sidenavPrevBtn.style.display = "none";

    const prevAnchor = document.createElement("a");
    prevAnchor.href = "#section1";
    prevAnchor.textContent = "↑";
    sidenavPrevBtn.append(prevAnchor);
    sidenavParent.append(sidenavPrevBtn);

    const sidenavNextBtn = document.createElement("div");
    sidenavNextBtn.classList.add("sideNav_btnNext");
    sidenavNextBtn.style.display = "none";

    const nextAnchor = document.createElement("a");
    nextAnchor.href = "#section2";
    nextAnchor.textContent = "↓";
    sidenavNextBtn.append(nextAnchor);
    sidenavParent.append(sidenavNextBtn);

    const sidenavArea = document.createElement("div");
    sidenavArea.classList.add("sidenavArea");
    sidenavArea.append(sidenavParent);

    const position = container.querySelector("#contents") as HTMLElement;
    if (!position) return;

    position.after(sidenavArea);

    const observer = new IntersectionObserver(
        function (entries) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const j = <HTMLElement>document.querySelector(".js-current");
                    if (j) {
                        const ind = config.anchor.indexOf(`#${entry.target.id}`);
                        j.style.transition = "opacity 0.5s";
                        j.style.opacity = "0";
                        setTimeout(() => {
                            j.innerText = (ind + 1).toString();
                            j.style.opacity = "1";
                        }, 300);

                        prevAnchor.href = config.anchor[ind - 1];
                        nextAnchor.href = config.anchor[ind + 1];

                        //add smooth scroll
                        prevAnchor.addEventListener("click", (e: MouseEvent): void => {
                            e.preventDefault();
                            const href = prevAnchor.getAttribute("href");
                            if (!href) return;
                            const dhref = document.querySelector(href);
                            if (!dhref) return;
                            dhref.scrollIntoView({
                                behavior: "smooth",
                            });
                        });

                        nextAnchor.addEventListener("click", (e: MouseEvent): void => {
                            e.preventDefault();
                            const href = nextAnchor.getAttribute("href");
                            if (!href) return;
                            const dhref = document.querySelector(href);
                            if (!dhref) return;
                            dhref.scrollIntoView({
                                behavior: "smooth",
                            });
                        });

                        if (ind === 0) {
                            sidenavPrevBtn.style.display = "none";
                            sidenavPrevBtn.style.animation = "fadeIn 1s";
                        } else {
                            sidenavPrevBtn.style.display = "block";
                            sidenavPrevBtn.style.animation = "fadeIn 1s";
                        }
                        if (ind + 1 >= config.anchor.length) {
                            sidenavNextBtn.style.display = "none";
                            sidenavNextBtn.style.animation = "fadeIn 1s";
                        } else {
                            sidenavNextBtn.style.display = "block";
                            sidenavNextBtn.style.animation = "fadeIn 1s";
                        }
                    }
                }
                // if (entry.intersectionRatio > 0) {
                //     // Stop watching
                //     observer.unobserve(entry.target);
                // }
            }
        },
        {
            threshold: 0.2,
        }
    );
    for (let i = 0; i < config.anchor.length; i++) {
        const qs = document.querySelector(config.anchor[i]);
        if (!qs) return;
        observer.observe(qs);
    }
};

export { sideNav };
