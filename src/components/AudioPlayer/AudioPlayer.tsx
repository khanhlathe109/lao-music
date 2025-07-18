import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store';
import { playNext, playPrevious } from '../../redux/slices/audioPlayerSlice';
import { SkipNext, SkipPrevious } from '@mui/icons-material';

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentSong, isPlaying } = useSelector((state: IRootState) => state.audioPlayer);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {}); // avoid unhandled play() error
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

        {/* Nút chuyển bài */}
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => dispatch(playPrevious())}>
            <SkipPrevious />
          </button>
          <audio ref={audioRef} src={currentSong.src} controls />
          <button onClick={() => dispatch(playNext())}>
            <SkipNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
