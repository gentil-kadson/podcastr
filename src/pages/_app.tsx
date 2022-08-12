import { Player } from "../components/Player/index";
import { Header } from "../components/Header/index";
import { PlayerContext } from "../contexts/PlayerContext";

import { useState } from "react";

import "../styles/global.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);

  return (
    <PlayerContext.Provider value={{ episodeList: [], currentEpisodeIndex: 0 }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
