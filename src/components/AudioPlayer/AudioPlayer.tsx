import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentSong, isPlaying } = useSelector((state: RootState) => state.audioPlayer);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4 z-50">
      <div className="flex items-center gap-4">
        <img src={currentSong.image} alt="song" className="w-12 h-12 rounded" />
        <div>
          <div className="font-bold">{currentSong.title}</div>
          <div className="text-sm">{currentSong.artist}</div>
        </div>
        <audio ref={audioRef} src={currentSong.src} controls className="ml-auto" />
      </div>
    </div>
  );
};

export default AudioPlayer;
