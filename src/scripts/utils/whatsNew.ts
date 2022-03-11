import dayjs from "dayjs";

interface ListItem {
    title: string;
    date: string;
    end?: string;
    tag: string;
    url: string;
}

const chkDate = (date: string, end?: string): boolean => {
    const format = "YYYY-MM-DD HH:mm";

    const now = dayjs();
    const start = now.diff(dayjs(date, format), "m");

    if (end) {
        const stop = now.diff(dayjs(end, format, true), "m");
        if (stop >= 0) return false;
    }

    if (start >= 0) return true;

    return false;
};

const setLists = (item: ListItem, lists: HTMLUListElement): void => {
    if (!chkDate(item.date, item.end)) return;

    const list = document.createElement("li");
    list.classList.add(item.tag);
    list.title = item.tag;

    const time = document.createElement("time");
    time.dateTime = item.date;
    time.textContent = item.date.replace(/(\d{4})-(\d{2})-(\d{2}).*/g, "$1/$2/$3");
    list.append(time);

    const par = document.createElement("p");
    if (item.url) {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.title;
        par.append(link);
    } else {
        par.textContent = item.title;
    }
    list.append(par);

    lists.append(list);
};

const whatsNew = async (selector: string): Promise<void> => {
    const lang = document.documentElement.lang;
    const target = document.body.querySelector(selector);
    if (!target) return;

    const container = document.createElement("aside");
    container.id = "whats_new";
    target.after(container);

    const lists = document.createElement("ul");

    const response = await fetch(`/whats_new.${lang}.json?${Date.now()}`).catch(() => null);
    if (!response) return;
    const items = await response.json();

    items.forEach((item: ListItem) => setLists(item, lists));
    container.append(lists);
};

export { whatsNew };
