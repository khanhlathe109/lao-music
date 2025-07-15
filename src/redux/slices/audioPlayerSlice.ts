import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  id: string;
  title: string;
  artist?: string;
  image: string;
  src: string; // Đường dẫn file mp3
}

interface AudioPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
}

const initialState: AudioPlayerState = {
  currentSong: null,
  isPlaying: false,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setCurrentSong(state, action: PayloadAction<Song>) {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    play(state) {
      state.isPlaying = true;
    },
  },
});

export const { setCurrentSong, pause, play } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
