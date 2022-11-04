import "../../styles/globals.css";
import type { AppProps } from "next/app";
import s from "./_app.module.scss";
import { Icon } from "../components";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function MyApp({ Component, pageProps }: AppProps) {
  const [showConfetti, toggleConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [clickCount, setClickCount] = useState(0);

  return (
    <div
      className={s.app}
      onClick={() => {
        if (clickCount === 10) toggleConfetti(!showConfetti);
        setClickCount(clickCount + 1);
      }}
    >
      <header className={s.header}>
        <Icon name="ArrowRight" />
        <span className={s.title}>Jest zajebiście</span>
      </header>
      <Component {...pageProps} />
      <footer className={s.footer}>
        <span>Aplikacja stworzona podczas hakatonu AKAI 2022 listopad 4-5</span>
        <Icon onClick={() => window.open("https://github.com/Mimikkk/akai-tmr-2022", "_blank")} name={"GithubIcon"} />
      </footer>
    </div>
  );
}

export default MyApp;
