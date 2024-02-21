import React from "react";
import "./App.css";
import AudioPlayer from "./AudioPlayer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Audio Player</h1>
      </header>
      <main>
        <AudioPlayer />
      </main>
    </div>
  );
}

export default App;
