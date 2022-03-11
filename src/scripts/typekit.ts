interface Config {
    kitId: string;
    scriptTimeout: number;
    async: boolean;
}

declare let Typekit: { load(config: Config): void };

interface TypekitClient {
    (kitId: string): void;
}

export const typekitClient: TypekitClient = (kitId) => {
    const config = {
        kitId,
        scriptTimeout: 3000,
        async: true,
    };

    const h = document.documentElement;
    h.className += " wf-loading";
    const t = setTimeout(() => {
        h.className = `${h.className.replace(/\bwf-loading\b/g, "")} wf-inactive`;
    }, config.scriptTimeout);

    const script = document.createElement("script");
    //let f = false, a;
    script.src = `https://use.typekit.net/${config.kitId}.js`;
    script.async = true;
    let f = false;
    script.onload = function () {
        //a = this.readyState;
        //if (f || (a && a !== "complete" && a !== "loaded")) return;
        if (f) return;
        f = true;
        clearTimeout(t);
        try {
            Typekit.load(config);
        } catch (e) {
            console.error(e);
        }
    };

    const s = document.getElementsByTagName("script")[0];
    if (s.parentNode) s.parentNode.insertBefore(script, s);
};
export default typekitClient;
