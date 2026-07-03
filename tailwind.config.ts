import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                destructive: "var(--destructive)",
                muted: "var(--muted)",
                accent: "var(--accent)",
            },
        },
    },
    plugins: [],
};

export default config;