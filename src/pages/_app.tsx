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

  return (
    <div className={s.app} onClick={() => toggleConfetti(true)}>
      {showConfetti && <Confetti width={width} height={height} />}
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
