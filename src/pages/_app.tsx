import "../../styles/globals.css";
import type { AppProps } from "next/app";
import s from "./_app.module.scss";
import { Icon } from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <div className={s.app}>
      <header className={s.header}>
        <div>
          <Icon className={s.icon} name="Home" href="/" />
        </div>
        <span className={s.title}>Mapa PP</span>
      </header>
      <main className={s.main}>
        <Component {...pageProps} />
      </main>
      <footer className={s.footer}>
        <span className={s.hidden}>Aplikacja stworzona podczas hackathonu AKAI Code 4-5.11.2022</span>
        <Icon
          className={"mx-2 hover:cursor-pointer fill-slate-200"}
          onClick={() => window.open("https://github.com/Mimikkk/akai-tmr-2022", "_blank")}
          name={"GithubIcon"}
        />
      </footer>
    </div>
  </QueryClientProvider>
);

export default App;
