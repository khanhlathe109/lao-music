import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  id: string;
  image: string;
  title: string;
  artist?: string;
  src: string;
}

interface AudioPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  playlist: Song[];
}

const initialState: AudioPlayerState = {
  currentSong: null,
  isPlaying: false,
  playlist: [],
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    setPlaylist: (state, action: PayloadAction<Song[]>) => {
      state.playlist = action.payload;
    },
    playNext: (state) => {
      const currentIndex = state.playlist.findIndex(s => s.id === state.currentSong?.id);
      if (currentIndex !== -1 && currentIndex < state.playlist.length - 1) {
        state.currentSong = state.playlist[currentIndex + 1];
        state.isPlaying = true;
      }
    },
    playPrevious: (state) => {
      const currentIndex = state.playlist.findIndex(s => s.id === state.currentSong?.id);
      if (currentIndex > 0) {
        state.currentSong = state.playlist[currentIndex - 1];
        state.isPlaying = true;
      }
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  setCurrentSong,
  setPlaylist,
  playNext,
  playPrevious,
  togglePlayPause,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
