import React from 'react';
import Deck from './Deck';
import loopAudio from '../audios/2min_loop_battle_01.ogg';

function App() {
  return (
    <div>
      <div id="main-gradient" />
      <Deck />
      <div id="audios">
        <audio loop>
          <source src={loopAudio} />
          <track
            default
            kind="captions"
            srcLang="en"
          />
        </audio>
      </div>
    </div>
  );
}

export default App;
