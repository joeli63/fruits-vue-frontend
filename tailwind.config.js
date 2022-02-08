const plugin = require("tailwindcss/plugin")

module.exports = {
  content: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{vue,ts}"],
  },

  variants: {
    extend: {
      backgroundColor: ["event"],
    },
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto"],
      },
    },

    colors: {
      white: "white",
      black: "#011F4B",
      grey: "#7E8299",
      transparent: "transparent",
      primary: "#1BC5BD",
      secondary: "#005B96",
      orange: "#F6CA65",
      "secondary-light": "#F1FAFE",
      "grey-light": "#F3F6F9",
    },
  },

  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}
