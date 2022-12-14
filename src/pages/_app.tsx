import "../../styles/globals.css";
import type { AppProps } from "next/app";
import s from "./_app.module.scss";
import { Icon } from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePartyModeStore } from "../usePartyMode";
import Link from "next/link";
import { ThemeProvider, useTheme } from "next-themes";
import { ThemeToggler } from "../components/ThemeToggler";
import cx from "classnames";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

const App = ({ Component, pageProps }: AppProps) => {
  const { isPartyModeEnabled, togglePartyMode } = usePartyModeStore();
  const { theme } = useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className={cx(s.app, "bg-gray-100 dark:bg-gray-900")}>
          <header className={cx(s.header, "text-gray-900 dark:text-gray-300")}>
            <Link href="/">
              {isPartyModeEnabled ? (
                <img src={"/cool-logo.gif"} alt="Mapa PP" />
              ) : (
                <span className={s.title}>Mapa PP</span>
              )}
            </Link>
            <ThemeToggler />
          </header>
          <main className={cx(s.main, theme === "dark" && "dark")}>
            <Component {...pageProps} />
          </main>
          <footer
            className={cx(s.footer, "text-gray-900 dark:text-gray-300 hidden sm:flex justify-center items-center")}
            onClick={togglePartyMode}
          >
            <span className={s.hidden}>Aplikacja stworzona podczas hackathonu AKAI Code 4-5.11.2022</span>
            <Icon
              className={"mx-2 hover:cursor-pointer fill-slate-700 dark:fill-slate-200"}
              onClick={() => window.open("https://github.com/Mimikkk/akai-tmr-2022", "_blank")}
              name={"GithubIcon"}
            />
          </footer>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
