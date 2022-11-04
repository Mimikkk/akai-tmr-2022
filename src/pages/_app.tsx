import "../../styles/globals.css";
import type { AppProps } from "next/app";
import s from "./_app.module.scss";
import { Icon } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={s.app}>
      <span className={s.header}>
        <Icon name="ArrowRight" />
        <span className={s.title}>Jest zajebiście</span>
      </span>
      <Component {...pageProps} />
      <footer>
        <span className={s.footer}>Aplikacja stworzona podczas hakatonu AKAI 2022 listopad 4-5</span>
      </footer>
    </div>
  );
}

export default MyApp;
