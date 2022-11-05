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
        <Icon name="ArrowRight" />
        <span className={s.title}>Supabase głupie</span>
      </header>
      <main className={s.main}>
        <Component {...pageProps} />
      </main>
      <footer className={s.footer}>
        <span>Aplikacja stworzona podczas hakatonu AKAI 2022 listopad 4-5</span>
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
