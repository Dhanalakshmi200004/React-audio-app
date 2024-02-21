import React, { useState, useEffect, useRef } from "react";

const AudioPlayer = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const lastTrackIndex = localStorage.getItem("lastTrackIndex");
    if (lastTrackIndex !== null) {
      setCurrentTrackIndex(parseInt(lastTrackIndex));
    }

    const lastTrackPosition = localStorage.getItem("lastTrackPosition");
    if (lastTrackPosition !== null) {
      audioRef.current.currentTime = parseFloat(lastTrackPosition);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastTrackIndex", currentTrackIndex);
  }, [currentTrackIndex]);

  const audioRef = useRef(null);

  const handleAudioEnd = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            const newAudioFiles = Array.from(files).map((file) =>
              URL.createObjectURL(file)
            );
            setAudioFiles((prevFiles) => [...prevFiles, ...newAudioFiles]);
          }
        }}
      />
      <ul>
        {audioFiles.map((audioSrc, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setCurrentTrackIndex(index);
              }}
            >
              {`Track ${index + 1}`}
            </button>
          </li>
        ))}
      </ul>
      <audio
        ref={audioRef}
        src={audioFiles[currentTrackIndex]}
        controls
        onEnded={handleAudioEnd}
        onTimeUpdate={() => {
          if (audioRef.current.currentTime % 5 === 0) {
            localStorage.setItem(
              "lastTrackPosition",
              audioRef.current.currentTime
            );
          }
        }}
      />
    </div>
  );
};

export default AudioPlayer;
