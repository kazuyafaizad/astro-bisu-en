// https://dev.to/bhupendra1011/how-to-know-when-css-position-sticky-get-s-applied-4gk2
export function stickyHader(): void {
    const cardinalPoint = document.createElement("div");
    document.body.prepend(cardinalPoint);

    const sh = document.querySelector("body > header");
    if (!sh) return;

    const image = sh.querySelector("h1 img") as HTMLImageElement;
    if (!image) return;
    image.dataset.orig = image.src;
    image.dataset.size = String(image.width);

    const observer = new IntersectionObserver(
        function (entries) {
            const mql = window.matchMedia("screen and (max-width: 1000px)");
            if (mql.matches) return;

            if (entries[0].intersectionRatio === 0) {
                sh.classList.add("sticky");
                image.src = image.dataset.src as string;
                image.width = Number(image.dataset.width);
            } else if (entries[0].intersectionRatio === 1) {
                sh.classList.remove("sticky");
                image.src = image.dataset.orig as string;
                image.width = Number(image.dataset.size);
            }
        },
        { threshold: [0, 1] }
    );

    observer.observe(cardinalPoint);
}
