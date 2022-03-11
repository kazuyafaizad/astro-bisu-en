function setcss(path) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    document.head.appendChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
    if ("documentMode" in document) {
        const section = document.createElement("aside");
        section.id = "msie";

        const header = "<h2>このサイトは Internet Explorer には対応しておりません</h2>";
        const p =
            "<p>お客様が現在ご利用されている <strong>Internet Explorer</strong> はセキュリティ問題と表示の不具合を多く抱えている古いブラウザのため、Microsoft社から移行が勧められております。</p>" +
            '<p>WEB閲覧には安全上の問題や、快適性を考慮して、現在主流となっている <a href="https://www.google.co.jp/chrome/" target="_blank">Google Chrome</a> 等の最新ブラウザをご利用ください。</p>';

        section.insertAdjacentHTML("afterbegin", header + p);
        document.body.appendChild(section);
        setcss("/css/msie.css");
    }
});
