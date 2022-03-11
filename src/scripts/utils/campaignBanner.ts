import dayjs from "dayjs";

type Banner = BannerItem | List;

interface BannerItem extends Item {
    start: string;
    list: undefined;
}

interface List {
    start: string;
    list: Item[];
    anchor: undefined;
    pc: undefined;
    sp: undefined;
}

interface Item {
    anchor: string;
    pc: string;
    sp: string;
}

const chkDate = (date: string): boolean => {
    const format = "YYYY-MM-DD HH:mm";

    const now = dayjs();
    const start = now.diff(dayjs(date, format), "m");

    if (start >= 0) return true;

    return false;
};

const pickup = (bannerList: Banner[]): Banner | void => {
    for (const key in bannerList) {
        if (chkDate(bannerList[key].start)) return bannerList[key];
    }
    return;
};

const setBanner = (banner: Item, container: HTMLParagraphElement): void => {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", banner.anchor);
    container.append(anchor);

    const picture = document.createElement("picture");
    anchor.append(picture);

    const source = document.createElement("source");
    source.setAttribute("srcset", banner.sp);
    source.setAttribute("media", "(max-width: 480px)");
    picture.append(source);

    const img = document.createElement("img");
    img.setAttribute("src", banner.pc);
    picture.append(img);
};

const campaignBanner = async (selector: string): Promise<void> => {
    const lang = document.documentElement.lang;
    const target = document.body.querySelector(selector);
    if (!target) return;

    const response = await fetch(`/campaign.${lang}.json?${Date.now()}`).catch(() => null);
    if (!response) return;
    const bannerList = await response.json();

    const banner = pickup(bannerList);

    const attach = (banner: Item) => {
        const container = document.createElement("p");
        container.classList.add("campaign");
        setBanner(banner, container);
        target.after(container);
    };

    if (banner) {
        if (banner.list) banner.list.forEach((item) => attach(item));
        else attach(banner);
    }
};

export { campaignBanner };
