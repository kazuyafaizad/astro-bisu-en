interface Config {
    main: string;
    position?: string;
    contents: string;
}
const stickyItems = async (config: Config): Promise<void> => {
    const main = document.querySelector(config.main) as HTMLElement;
    if (!main) return;

    if (main.dataset.src && config.position) {
        const position = main.querySelector(config.position) as HTMLElement;
        if (!position) return;

        const stickyArea = document.createElement("div");
        stickyArea.id = "sticky";
        const image = document.createElement("img");
        image.src = main.dataset.src;
        stickyArea.append(image);
        position.after(stickyArea);
    }

    const contents = main.querySelectorAll(config.contents);
    const contentArea = document.createElement("div");
    contentArea.id = "contents";
    contents.forEach((content) => contentArea.append(content));
    main.append(contentArea);
};

export { stickyItems };
