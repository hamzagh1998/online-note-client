/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {
      borderColor: ["focus", "focus-visible"],
    },
  },
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          accent: withOpacity("--color-button-accent"),
          error: withOpacity("--color-text-error"),
        },
      },
      backgroundColor: {
        skin: {
          "fill-primary": withOpacity("--color-fill-primary"),
          "fill-secondary": withOpacity("--color-fill-secondary"),

          "button-base": withOpacity("--color-button-base"),
          "button-muted": withOpacity("--color-button-muted"),
          "button-accent": withOpacity("--color-button-accent"),
        },
      },
      borderColor: {
        skin: {
          accent: withOpacity("--color-border-accent"),
          error: withOpacity("--color-border-error"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
    },
  },
  plugins: [],
};
