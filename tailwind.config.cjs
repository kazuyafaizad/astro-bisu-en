module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      'sans': "var(--main-font-latin)",
    },
    extend: {
      dropShadow: {
        'lite': '0 1px 2px rgba(0, 0, 0, 1)',
      },
      colors: {
        "main-green": "#1F3939",
        "main-light-green": "#005656",
        "main-red": "#98847d",
        black: "#333333",
        golden: "#BCA674",
        goldeni: "#A07500",
        "main-gold-3" : "#AA823A",
        "main-gold-2" : "#9D7A00",
        "main-gray": "#F9F9F9",
        "main-orange":"#FF7924",
        "main-light-yellow":"#FBF7EC",
        "main-pink":"#F4ECEA",
        "main-brown":"#363332",
        "main-dark-brown":"#2e2a29"
      },
      fontSize: {
        base: ["16px", "32px"],
        "base-xl": ["19px", "32px"],
        md: ["18px", "50px"],
        h2: ["20px", "40px"],
        h3: ["18px", "32px"],
        "2-1/2xl": ["30px", "35px"],
        "3xl": ["24px", "48px"],
        "4xl": ["35px", "70px"],
      },
    },
  },
};
