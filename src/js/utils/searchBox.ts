const setLists = (items: string[]): HTMLDataListElement => {
    const datalist = document.createElement("datalist");
    datalist.id = "searchWords";
    items.forEach((item: string) => {
        const option = document.createElement("option");
        option.value = item;
        datalist.append(option);
        console.log(option);
    });
    return datalist;
};

const setContainer = (): HTMLElement => {
    const container = document.createElement("aside");
    container.id = "search";

    container.insertAdjacentHTML(
        "afterbegin",
        `<form method="get" action="https://cart.bi-su.jp/products/c/all/">
        <input type="search" name="name" value="" autocomplete="off" list="searchWords" placeholder="商品名、商品番号、キーワードを入力" />
        <button>検索</button>
        </form>`
    );

    return container;
};

export const searchBox = async (): Promise<void> => {
    const lang = document.documentElement.lang;
    if (lang !== "ja") return;

    const target = document.body.querySelector(".tns-outer");
    if (!target) return;

    const response = await fetch(`/search_words.json?${Date.now()}`).catch(() => null);
    if (!response) return;

    const mql = window.matchMedia("screen and (max-width: 440px)");
    const items = await response.json();
    let container: HTMLElement;
    const CheckMedia = (mql: MediaQueryList): void => {
        if (mql.matches) {
            container = setContainer();
            container.append(setLists(items));
            target.after(container);
        } else if (container) container.remove();
    };
    mql.addEventListener("change", () => CheckMedia(mql), false);

    CheckMedia(mql);
};
